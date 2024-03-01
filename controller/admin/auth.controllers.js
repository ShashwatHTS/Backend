
const { logInGenerateAndStoreToken, logOutService } = require('../../middleware/authService.js');

var { supabaseInstance } = require("../../supabase-db/supabaseClient.js");

const authService = require('../../middleware/authService.js');
const UserDatabase = require('../../infrastructure/databases/userDatabase.js');
const { UserService } = require('../../application/services/admin/userService.js');


const userDatabase = new UserDatabase(supabaseInstance);
const userService = new UserService(userDatabase);


const logInUser = async (req, res) => {
  try {
    const postBody = req.body
    if (postBody.email && postBody.password) {
      const logInService = authService.logInGenerateAndStoreToken(postBody, res);
      if (logInService) {
        const decrypt_password = await userService.login(postBody);
        console.log("decrypt_password", decrypt_password)
        res.send(decrypt_password)

      } else {
        res.send("something went inside try wrong")
      }
    }
  } catch (error) {
    console.log(error)
    res.send("something went wrong")

  }
}


const logOutUser = async (req, res) => {
  try {
    const service = await authService.logOutService(res);
    if (service) {
      res.status(200).json({ success: true, message: 'Logout successful' });
    } else {
      res.status(401).json({ error: 'Logout failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {
  logInUser, logOutUser
};



