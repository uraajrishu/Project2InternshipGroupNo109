const internModel = require("../model/internModel")
const collegeModel = require("../model/collegeModel")
const validator = require('validator');

//============================================================================>>
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    // if (typeof value === 'number'  ) return false
    return true;}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0}
//=======================>>


const createIntern = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, msg:"Invalid intern request"})
            return}

        if (!isValid(requestBody.name)) {
            res.status(400).send({ status: false,msg:"Intern Name is required"})
            return}

        if (!isValid(requestBody.email)) {
            res.status(400).send({ status: false, msg:"Email is required"})
            return}
            if (!(validator.isEmail(requestBody.email))) {                              // email validation By Validator--!!
                return res.status(400).send({ status: false, msg: 'enter valid email' })}
        
        if (!isValid(requestBody.mobile)) {
            res.status(400).send({ status: false, msg:"Mobile Number is required"})
            return}
            let check1 = requestBody.mobile                                            // number validation Regex---------!!
            let check2 = (/^[0-9]{10}/.test(requestBody.mobile))
    
            if (!(check1.length === 10 && check2)){
                return res.status(400).send({ status: false, msg: 'enter valid number' })}

        if (!isValid(requestBody.collegeName)) {
            res.status(400).send({ status: false, msg:"collegeId is required"})
            return}
            
        // validateing collegeId----------->

        const collegeId = await collegeModel.findOne({ name: requestBody.collegeName })
        if (!collegeId){
            return res.status(400).send({ status: false, msg: 'college not found' })}

        if (collegeId.isDeleted === true) {
            return res.status(400).send({ status: false, msg: "college is deleted" })}

        //validation email reused???

        let emailCheck = await internModel.findOne({email:requestBody.email})
        if(emailCheck){
           return res.status(400).send({status:false,msg:"this email already exist"})}

        //validation number reused???

        let mobileCheck = await internModel.findOne({mobile:requestBody.mobile})
        if(mobileCheck){
          return  res.status(400).send({status:false,msg:"this mobile number is already exist"})}

        requestBody.collegeId=collegeId._id
        const createIntern = await internModel.create(requestBody)
        res.status(201).send({ status: true, data: requestBody })

    } catch (error){
        console.log(error)
        res.status(500).send({ status: false, msg: error.message})
    }
}
module.exports.createIntern = createIntern;