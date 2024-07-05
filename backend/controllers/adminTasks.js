import User from "../model/userAuth.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
export const AddUser = async(req,res) => {
    console.log(req.body);
    const {name,lastname,email,password} = req.body;
    
      try{
        console.log(name);
          const user = await User.findOne({email:email});
          console.log(name);
          if(user){
              const response = {exist:"true"}
              return res.status(200).json(response);
          }
          try {
              const hashPass = bcrypt.hashSync(password||'123456', saltRounds);
              // Store the 'hash' value in your database for this user
              console.log(name);
          const data = {
              firstname: name,
              lastname: lastname,
              email: email,
              password: hashPass
            };
            await User.insertMany([data]);
            const userData = await User.findOne({email:email});
            if(userData){
              const response = {'Added':true};
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
export const getAllUsers = async(req, res)=> {
    try {
  
  
      // Default value for pagination
       // Default value for pagination
       const page = parseInt(req.query.page) || 1;
   
       // Calculate how many items to skip
       const skip = (page - 1) * 10; // Fixed limit of 10 items per page
   
       // Fetch the users and their issues, applying pagination
       const users = await User.find()
         .skip(skip)
         .limit(10) 
   
       // Calculate the total number of pages
       const totalUsers = await User.countDocuments();
       const totalPages = Math.ceil(totalUsers / 10); // Fixed limit of 10 items per page
   
       // Send the paginated data back to the client
       res.json({
         users,
         totalPages,
         currentPage: page,
         totalUserCount: totalUsers, // Include the total user count
       });
  
      
    } catch (error) {
        next(error);
    }
   }
  export const deleteUser = async(req, res) => {
    try {
       const user = await User.findByIdAndDelete(req.params.userId);
       if (!user) {
         return res.status(404).send({ message: 'User not found' });
       }
       res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
       next(error);
    }
   }
  
   export const editUserDetails = async (req, res) => {
    try {
      // Ensure the route uses 'userId' if that's the parameter you are referencing
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
  
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User details updated successfully', user });
    } catch (error) {
      // It's good practice to log the error for debugging purposes
      console.error('Error updating user:', error);
      next(error)
    }
  };
  export const searchUser = async (req, res) => {
    try {
        const { searchString } = req.body;
    
        if (!searchString) {
          return res.status(400).json({ msg: 'Search string is required' });
        }
    
        const query = {
          $or: [
            { name: { $regex: searchString, $options: 'i' } },
            { email: { $regex: searchString, $options: 'i' } },
            // Add more fields as needed
          ]
        };
    
        const users = await User.find(query);
        res.status(200).json(users);
      } catch (err) {
        console.error(err);
        next(err);
      }
  }