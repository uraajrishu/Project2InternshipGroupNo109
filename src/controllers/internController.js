const internModel = require("../model/internModel")
const collegeModel = require("../model/collegeModel")
const validator = require('validator');

//============================================================================>>
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number'  ) return false
    return true;}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0}
//=======================>>

const createIntern = async function(req, res){
    try{
        const requestBody = req.body

        if(!isValidRequestBody(requestBody)){
            res.status(400).send({status:false, msg:"Invalid intern request"})
        return}

        if(!isValid(requestBody.name)){
            res.status(400).send({status:false, msg:"Intern Name is required"})
        return}

        if(!isValid(requestBody.email)){
            res.status(400).send({status:false, msg:"Email is required"})
        return}

        if(!isValid(requestBody.mobile)){
            res.status(400).send({status:false, msg:"Mobile Number is required"})
        return}
         
        let college = await collegeModel.findById(requestBody.collegeId)
        
        if(!college){
            res.status(400).send({status:false, msg:"collegeId is required"})
        return}

        const createIntern = await internModel.create(requestBody)
        res.status(201).send({status:true, data: createIntern})

    }catch(error){
        res.status(500).send({status:false, msg:error.message})
    }
}


module.exports.createIntern = createIntern;