const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
      name: { type:String, required:"Name is required",trim: true},

      email:{ type:String, trim: true, unique: true, required:"EmailId is required"},

      mobile:{ type:Number, unique: true, required:"Mobile Number is required"},

      collegeId:{ type: mongoose.Schema.Types.ObjectId, ref :"College", required:"College Id is required"},

      isDeleted:{ type:Boolean, default:false}

},{timestamps: true})

module.exports = mongoose.model('Intern', internSchema)