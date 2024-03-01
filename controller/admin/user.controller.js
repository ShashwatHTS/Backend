var { supabaseInstance } = require("../../supabase-db/supabaseClient.js");

const UserDatabase = require('../../infrastructure/databases/userDatabase.js');
const { UserService } = require('../../application/services/admin/userService.js');

const userDatabase = new UserDatabase(supabaseInstance);
const userService = new UserService(userDatabase);


exports.createUser = async (req, res) => {
    try {
        const postBody = req.body
        const serviceResponse = await userService.createUser(postBody);
        if (serviceResponse.data) {
            return res.status(200).json({
                success: true,
                message: " user created successfully",
                data: serviceResponse.data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const postBody = req.body;
        const id = req.params.id;
        console.log("postBody", postBody)
        const serviceResponse = await userService.updateUser(postBody, id);
        console.log("serviceResponse", serviceResponse)

        if (serviceResponse.data) {
            return res.status(200).json({
                success: true,
                message: " user updated successfully",
                data: serviceResponse.data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const serviceResponse = await userService.getUser(page, limit);
        if (serviceResponse) {
            return res.status(200).json({
                success: true,
                message: "user list successfully",
                data: serviceResponse
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}




// var decrypted = cryptoJs.AES.decrypt("U2FsdGVkX19i5gFbP53Lb1jflUSTQuOXqH1sJvnZFH0=", secret).toString(cryptoJs.enc.Utf8);
// console.log("------------------", decrypted)
