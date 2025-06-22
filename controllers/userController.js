const UserSchema = require('../models/UserSchema')

const login =async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await UserSchema.findOne({ email: email}); 
    if (userData.password === password) {
      res.send({Status : "Success" , token : email});  
    }
    else {
      res.send("user does not exist");
    }
    
  } catch (error) {
    res.send( error) ;
  }
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = UserSchema({ email: email, password: password, isBot: true });
    const p = await userData.save();
    res.send("User Created" , p);
  } catch (error) {
    res.send( error); 
  }
};

exports.signUp = signUp ;
exports.login = login ;
