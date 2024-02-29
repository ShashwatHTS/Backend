const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/index.js');

const supabase = createClient(supabaseUrl, supabaseKey)



exports.deleteUserById = async (req, res) => {
    // delete a book
    try {
        let { data, error } = await supabase.from('todo').delete().eq('id', req.params.id)
        console.log("show", data)
        if (data) {
            return res.status(201).json("delete successfully")
        } else {
            return res.status(404).json("Something wen wrong")

        }
    } catch (error) {
        console.error(error);
    }
}
