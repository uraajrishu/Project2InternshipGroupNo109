const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")


router.post('/functionup/colleges', collegeController.createCollege)
router.post('/functionup/interns', internController.createIntern)
router.get('/functionup/collegeDetails',collegeController.getAllIntern)
// const authorController = require("../controllers/authorController")
// const loginController = require("../controllers/logincontroller")
// const middleWare = require("../middleware/middleWare")


module.exports = router;