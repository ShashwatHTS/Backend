const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/index.js');

const bcrypt = require('bcrypt');
const supabase = createClient(supabaseUrl, supabaseKey)



exports.createUser = async (req, res) => {
    try {
        const { name, email, phone, password, role_id } = req.body
        const hash_password = await bcrypt.hash(password, 10)
        let { data, error } = await supabase.from('user').insert({
            name, email, phone, password: hash_password, role_id
        }).select()
        if (data?.data) {
            return res.status(200).json({
                success: true,
                message: " user created successfully",
                data: data.data,
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
        const { name, email, phone, password, role_id } = req.body
        const hash_password = await bcrypt.hash(password, 10)
        let { data, error } = await supabase.from('user').update({
            name, email, phone, password: hash_password, role_id
        }).eq("id", req.params.id).select("*").maybeSingle()

        if (data) {
            return res.status(200).json({
                success: true,
                message: " user updated successfully",
                data: data,
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
        const { page, perPage } = req.query;
        const pageNumber = parseInt(page) || 1;
        const itemsPerPage = parseInt(perPage) || 10;

        let { data, error, count } = await supabase
            .from('user')
            .select("*", { count: "exact" })
            .range((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage - 1)

        if (data) {
            const totalPages = Math.ceil(count / itemsPerPage);
            return res.status(200).json({
                success: true,
                message: "user list successfully",
                data: data,
                meta: {
                    page: pageNumber,
                    perPage: itemsPerPage,
                    totalPages,
                    totalCount: count,
                },
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}