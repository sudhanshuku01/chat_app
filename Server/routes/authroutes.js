import User from '../model/usermodel.js' 
import express from 'express'
export const router=express.Router();
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

router.post('/signup',async (req,res)=>{
    const {username,phoneNumber,password}=req.body;
    try {
        if(!username || !phoneNumber || !password){
            return res.status(400).send({
                success:false,
                message:"all credentails are required"
            })
        }
        const existeduser=await User.findOne({phoneNumber});
        if(existeduser){
            return res.status(200).send({
                success:true,
                message:"user of this number already exits pls login"
            })
        }
        var salt = bcrypt.genSaltSync(10);
        var hashpass =await bcrypt.hashSync(password, salt);
        const user=new User({
           username:username,
           phoneNumber:phoneNumber,
           password:hashpass
        })
        await user.save()

        return res.status(200).send({
            success:true,
            message:'signup successfully'
        })   
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"server error",
            error
        })
    }

})

router.post('/login',async (req,res)=>{
    const {phoneNumber,password}=req.body;
   try {
    if(!phoneNumber || !password){
        return res.status(400).send({
            success:false,
            message:"all credentials are required!"
        })
    }
    const user=await User.findOne({phoneNumber});
    if(!user){
      return res.status(400).send({
        success:false,
        message:"Invalid credentials"
      })
    }
    let ans=await bcrypt.compareSync(password, user.password);
    if(!ans){
       return res.status(200).send({
        success:false,
        message:"password is wrong"
       })
    }
    var token = JWT.sign({ id:user._id },process.env.SECRET_KEY);
    return res.status(200).send({
        success:true,
        message:'login successfully',
        id:user._id,
        username:user.username,
        token:token,
        phoneNumber:user.phoneNumber
    })
   } catch (error) {
     return res.status(500).send({
        success:false,
        message:"server error",
        error
     })
   }

})

