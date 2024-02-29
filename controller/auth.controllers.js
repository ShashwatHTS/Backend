require('dotenv').config()

const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/index.js');
const bcrypt = require('bcrypt');
const { logInGenerateAndStoreToken, logOutService } = require('../middleware/authService.js');
const supabase = createClient(supabaseUrl, supabaseKey)



const getData = async (req, res) => {
  let { data, error } = await supabase
    .from('user_info')
    .select('*')
  if (error) {
    console.log(error)
    res.send(error.message)
  }
  req.send(data)
}



const getRegistered = async (req, res) => {
  try {

    const { username, email, role, password } = req.body
    const hash_password = await bcrypt.hash(password, 10)

    // const decrypt_password = await bcrypt .compare(password, hash_password)
    // console.log("Decrypted password:", decrypt_password)


    const { data, error } = await supabase.auth.signUp(req.body)
    // console.log("w => ", data);
    if (data?.user) {
      console.log("data=>", data.user)

      const userResponse = await supabase.from('user_info').insert({ auth_id: data.user.id, email, role, username, password: hash_password }).select();

      if (userResponse.data) {
        console.log("userResponse => ", userResponse)
        res.send(userResponse.data)

      } else {
        console.log("error")
      }
    } else {
      console.log(error)
      res.send("User already Registered")
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    if (email && password) {
      const logInService = logInGenerateAndStoreToken(req.body, res);
      if (logInService) {
        const decrypt_password = await supabase
          .from("user_info").select("password").eq("email", email)
        console.log("decrypt_password=>", decrypt_password?.data[0].password)

        const verifyPassword = await bcrypt.compare(password, decrypt_password?.data[0].password)
        console.log("verifyPassword=>", verifyPassword)
        if (!verifyPassword) {
          res.send("invalid user")
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (data?.user) {
          // console.log("data=>", data?.user.id)
          const userResponse = await supabase
            .from('user_info')
            .select("*")
            .eq('auth_id', data?.user.id)
            .select();

          if (userResponse) {
            console.log("userResponse => ", userResponse)
            res.send(userResponse.data)
            return
          }
        } else {
          console.log(error)
          res.send("invalid name/email or password")
        }
        res.status(200).json({
          success: true,
          message: "login successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Facing error in generating token'
        });
      }
    } else {
      res.status(400).json({ error: 'email or password is missing' });
    }
  } catch (error) {
    console.log(error)
    res.send("something went wrong")

  }
}


const logOutUser = async (req, res) => {
  try {
    const service = logOutService(res);
    if (service) {
      res.status(200).json({ success: true, message: 'Logout successful' });
    } else {
      res.status(401).json({ error: 'Logout failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    console.log(".................", req.user.email)
    const getUserData = await supabase.from('user_info').select('id').eq('email', req.user.email)
    console.log("bv=============== rv", getUserData.data[0].id)
    return getUserData.data[0].id
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getData, getRegistered, logInUser, logOutUser, getCurrentUser
};



