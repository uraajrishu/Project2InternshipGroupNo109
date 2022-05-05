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

const getAllIntern = async function(req,res){
    try{
        const collegeName = req.query.name.toLowerCase();
        if(!collegeName){
        return res.status(404).send({status:false, msg:"college name not found"})}

        let collegeDetail1 = await collegeModel.findOne({name:collegeName,isDeleted:false}).select({name:1,fullName:1,logoLink:1,_id:0})
        let internDetail = await internModel.find({collegeId:collegeDetail1._id, isDeleted:false,}).select({_id: 1, name:1, email: 1, mobile:1})

        
        if(internDetail.length === 0 ){
            return res.status(200).send({status:true, msg:{...collegeDetail1.toObject(),intrests:"intern Details not present"}})
        }
        let result = {...collegeDetail1.toObject(),intrests:internDetail}
        res.status(200).send({status:true,data:result})


    }catch(error){
        console.log(error)
        res.status(500).send({status:false,msg:error.message})
    }
}
module.exports.createCollege = createCollege;
module.exports.getAllIntern = getAllIntern;