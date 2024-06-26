import bcrypt from 'bcrypt';
import User from "../model/user.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupUser =async (req,res)=>{
    try {
         
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = { username: req.body.username, name: req.body.name, password: hashedPassword }

      const newUser = await new User(user);
      await newUser.save();
      const savedUser = User.findById(newUser._id);
      if(!savedUser){
        return res.status(500).json({msg:'Error in saving user in DB'})
      }
      
      return res.status(200).json({msg:'SignUp Succesfull',newUser})
    } catch (error) {
        return res.status(500).json({msg:'Error in Sign in'})
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username }).select('+password');;
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
             const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        console.error('Error while logging in user:', error); // Log the error message
    return response.status(500).json({ msg: 'error while login the user' })
    }
}