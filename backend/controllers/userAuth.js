import generateToken from "../config/generateToken.js";
import User from "../model/userAuth.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
export const authRegister = async(req,res)=>{
    console.log('Received!')
      const {name,lastname,email,password} = req.body;
      try{
          const user = await User.findOne({email:email});
          if(user){
              const response = {...user,exist:"true"}
              return res.status(500).json(response);
          }
          try {
              const hashPass = bcrypt.hashSync(password, saltRounds);
              // Store the 'hash' value in your database for this user
             const Role = email === "admin@xcelore.com" && password === "Xcelore@2024"?"Admin":"User"
          const data = {
              firstname: name,
              lastname: lastname,
              email: email,
              password: hashPass,
              role: Role
            };
            await User.insertMany([data]);
            const userData = await User.findOne({email:email});
            if(userData){
              const response = {...userData,exist:"false",token:generateToken(userData._id)};
              res.status(201).json(response); 
            }
          } catch (err) {
              res.status(500).json('Error creating user');
          }
      }catch(e){
          console.error('Error checking for existing user:', e);
          next(e);
      }
  }
  export const authLogin= async(req,res)=>{
    const {email,password} = req.body;
    console.log(email," ",password)
    try{
        const user = await User.findOne({email:email});
        if(user){
            bcrypt.compare(password, user.password, (compareErr, result) => {
                if (compareErr) {
                  console.error('Error comparing passwords:', compareErr);
                }
                if (result) {
                    res.status(200).json({name:user.firstname,email:user.email,token:generateToken(user._id)});
                } else {
                    res.send("Incrorrect");
                }
              });
        }
        else {
            res.json("notexist");
        }
    }catch(e){
        next(e);
    }

}
export const getUser = async(req,res)=>{
    try {
        const user = await User.findById({_id:req.user.id});
        // console.log(user, req.user.id)
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
      } catch (err) {
        next(err)
      }
    };