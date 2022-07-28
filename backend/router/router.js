const express = require('express')

const router = express.Router()
const signUpTemplateInstance = require('../modals/signUpModals')
const bcrypt = require('bcrypt')

router.post('/signup',async (req,res)=>{
    const saltedPassword = await bcrypt.genSalt(10);
    const securePassword =  await bcrypt.hash(req.body.password, saltedPassword)
    
    const signedUser = new signUpTemplateInstance({
        imageUrl: req.body.imageUrl,
        firstName: req.body.firstName,
        userName:req.body.userName,
        emailId: req.body.emailId,
        password: securePassword
    })
    signedUser.save()
    .then(data => {
        res.json(data)
    })
    .catch(err =>{
        res.json(err)
    })
})

module.exports = router