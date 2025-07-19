import user from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from'jsonwebtoken'

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const containspecialchar = /[!@#$%^&*()_\-+=~`?:;,./]/.test(password);
  const number = "1234567890";
  const emailtest = /!#$%^&*()_-+=~`?:;,./.test(email);

  const hasnumber = /[0-9]/.test(password);
  try {
    if (!email || !password)
      return res.status(401).json({ error: "Email or password required" });

    if (emailtest)
      return res.status(404).json({ error: "Inalid email format" });

    if (password.length < 6 || password.length > 15)
      return res
        .status(400)
        .json({ error: "Password length must be between 6 and 15" });

    if (!hasUppercase || !hasLowercase || !containspecialchar || !hasnumber)
      
      return res.status(400).json({
        error:
          "Password must contain atleast one uppercase one lowercase and one special character and a number",
      });

    const userExists = await user.findOne({ email });

    if (userExists)
      return res.status(409).json({ message: "user already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedpwd = await bcrypt.hash(password, salt);

    const newUser = new user({ email, password : hashedpwd });

    await newUser.save();

    return res.status(200).json({ message: "User registered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

  export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password)
        return res.status(400).json({ error: "Email or Password required" });

      const userExists = await user.findOne({ email });
      
    if (!userExists) return res.status(404).json({ message: "User not found" });

    //console.log(password, user.hashedpwd);
    const ismatch = await bcrypt.compare(password, userExists.password);
    
    if (ismatch) {
      // yet to create jwt token and pass
      const token = jwt.sign(
        {id : userExists._id, email: userExists.email},
        process.env.JWT_SECRET,
        {expiresIn : '1hr'}
      );
      return res.status(200).json({token, message : `${userExists.email} logged in successfully`});
    } else {
      return res.status(401).json({ message: "Incorrect credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
