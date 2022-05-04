const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")
//====================CreateCollege=========================================================//
const createCollege = async function(req,res){
    try{
        const requestBody = req.body
        if (!requestBody){
            res.status(400).send({status:false, msg: "Invalid request"})
        return}

        if(!requestBody.name){
            res.status(400).send({status:false, msg: "The Name of the college is Required"})
        return}

        if (!requestBody.fullName){
            req.status(400).send({status:false, msg:"FullName of the college is required"})
        return}

        if (!requestBody.logoLink){
            req.status(400).send({status:false, msg:"LogoLink is required"})
        return}

        let createCollege = await collegeModel.create(requestBody)
        res.status(201).send({status:true, msg:"College is created successfully", data:createCollege})

    }catch(error){
    res.status(500).send({status: false, msg: error.message})
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