const express = require('express')

const router = express.Router()
const signUpTemplateInstance = require('../modals/signUpModals')
const bcrypt = require('bcrypt')
const { response } = require('express')


router.post('/signup',async (req,res)=>{
    const saltedPassword = await bcrypt.genSalt(6);
    const securePassword =  await bcrypt.hash(req.body.password, saltedPassword)
    const signedUser = new signUpTemplateInstance({
        imageUrl: req.body.imageUrl,
        firstName: req.body.firstName,
        userName:req.body.userName,
        emailId: req.body.emailId,
        password: securePassword
    })

    // const existingEmail = await signUpTemplateInstance.findOne({emailId})
    // if(existingEmail){
    //     return res.status(400).json({errorMessage:"EmailId already Exists"})
    // }
    signedUser.save()
    .then(data => {
        console.log(data.password)
        res.json(data)
    })
    .catch(err =>{
        res.json(err)
    })
})

router.post('/login', async (req,res)=>{
    const {emailId, password} = req.body

    if(!emailId || !password )
    {
        return res.status(422).json({error:"Please add all fields"})
    }
    signUpTemplateInstance.findOne({emailId:emailId})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then((match)=>{
            if(match){
                res.json({message:"Login Successfully"})
            }else{
                return res.status(422).json({error:"Invalid password"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
        // const existingUser = await signUpTemplateInstance.findOne({emailId})
        // if(!existingUser){
        //      return res
        //     .status(401)
        //     .json({ errorMessage:"User do not exists"})
        // }
        
        // const passwordVerification = await bcrypt.compare(password, existingUser.password)
        // if(passwordVerification){
        //     const userSession = {emailId: existingUser.emailId}

        //     req.session.existingUser = userSession
        //     return res.status(200).json({msg:"You have logged in successfully"})
        // }else{
        //     return res.status(400).json({ msg: 'Invalid credential' })
        // }
    
})

module.exports = router