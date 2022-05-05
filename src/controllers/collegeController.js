const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")

//Using Validation=======================
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number') return false
    return true;}

//validating request body ===========

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0}

//=======================================Create College #PostApi========================================================>>

const createCollege = async function (req, res) {
    try {// validation  >------
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, msg: "Invalid request"})
            return}

        if (!isValid(requestBody.name)) {
            res.status(400).send({ status: false, msg: "The Name of the college is Required"})
            return}

        if (!isValid(requestBody.fullName)) {
            res.status(400).send({ status: false,msg:"FullName of the college is required"})
            return}

        if (!isValid(requestBody.logoLink)) {
            res.status(400).send({ status: false, message:"logo link is required"})
            return}

        // unique validation  >---------

        let uniqueNameCheck = await collegeModel.findOne({name:requestBody.name})
        if(uniqueNameCheck){
        return res.status(400).send({status:false,msg:"this name already exist"})}

        let uniqueFullNameCheck = await collegeModel.findOne({fullName:requestBody.fullName})
        if(uniqueFullNameCheck){
        return res.status(400).send({status:false,msg:"this full  name already exist"})}

        let collegeCreate = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, data: collegeCreate })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}
//==========================================For Get Api===============================================================

const collegeDetailsWithIntern = async function(req, res){
    try{    
        const queryParams = req.query
        const collegeName = queryParams.collegeName

        if(!isValidRequestBody(queryParams)){
            return res.status(400).send({status : false, message: "please provide inputs for getting college details"})}

        if(!isValid(collegeName)){
            return res.status(400).send({status : false, message: "please provide collegeName"})}

        const collegeByCollegeName = await collegeModel.findOne({name : collegeName})

        if(!collegeByCollegeName) {
            return res.status(404).send({status: false, message: "invalid collegeName"})}

        const collegeID = collegeByCollegeName._id

        const getInternsByCollegeID = await internModel.find({collegeId : collegeID }).select({_id: 1, email: 1, name: 1, mobile: 1})
       

      const {name, fullName, logoLink} = collegeByCollegeName

      const data = {name: name,fullName : fullName,logoLink : logoLink,interns : getInternsByCollegeID}

        res.status(200).send({status: true, data: data})

    } catch (error){
        res.status(500).send({error : error.message})
    }
}

module.exports.collegeDetailsWithIntern = collegeDetailsWithIntern
module.exports.createCollege = createCollege;