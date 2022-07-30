const express = require('express')

const router = express.Router()
const signUpTemplateInstance = require('../modals/signUpModals')
const bcrypt = require('bcrypt')
const session = require('express-session')
const cookieParser = require('cookie-parser')

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
    //const user = signUpTemplateInstance.findOne(emailId: req.body.emailId)
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
                const userSession = {emailId: savedUser.emailId} // creating user session to keep user loggedin also on refresh
                req.session.savedUser = savedUser // attach user session to session object from express-session
                res.json({message:"Login Successfully"})
            }else{
                return res.status(422).json({error:"Invalid password"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })

})
// cleaning the cookies from the user session
router.post('/logout', (req,res)=>{
    req.session.destroy();
    return res.send("User Logged out")
})


router.get('/isAuthorised', (req, res) => {
        if (req.session.savedUser) {
            return res.json(req.session.savedUser)
          } else {
            return res.status(401).json('unauthorize')
          }
    
  })
  
module.exports = router