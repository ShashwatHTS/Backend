const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/index.js');

const supabase = createClient(supabaseUrl, supabaseKey)



exports.getRole = async (req, res) => {
    try {
        let { data, error } = await supabase.from('role').select("*");
        if (data) {
            return res.status(200).json({
                success: true,
                message: " list of roles",
                list: data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

exports.createAdminRole = async (req, res) => {
    try {
        const { name, access } = req.body
        let { data, error } = await supabase.from('role').insert({
            name, access
        }).select("*")
        console.log("show", data)
        if (data) {
            return res.status(200).json({
                success: true,
                message: "role created",
                data: data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

exports.updateAdminRole = async (req, res) => {
    try {
        const { name, access } = req.body
        let { data, error } = await supabase.from('role').update({
            name, access
        }).eq("id", req.params.id).select("*").maybeSingle();

        if (data) {
            return res.status(200).json({
                success: true,
                message: "role updated",
                data: data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })

        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}
