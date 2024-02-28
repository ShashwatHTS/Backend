const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/index.js');
const { getCurrentUser } = require('./auth.controllers.js');
const supabase = createClient(supabaseUrl, supabaseKey)

exports.getData = async (req, res) => {
    // console.log("getdata")
    const { data, error } = await supabase
        .from('todo')
        .select('*');

    if (error) {
        console.error(error);
        return;
    }
    console.log(data);
    res.json(data)

}

exports.createTodo = async (req, res) => {
    try {

        const { name, description } = req.body
        const getCurrentUserId = await getCurrentUser(req)
        const { data, error } = await supabase
            .from('todo')
            .insert(
                { name, description, user_id: getCurrentUserId }
            )
            .select()
        if (error) {
            console.error(error);
            return;
        }
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json('Error posting data to Supabase');
    }
}

exports.getTodoById = async (req, res, next) => {
    // find a book by id
    let { data, error } = await supabase.from('todo').select("*")
        .eq('id', req.params.id)
    // console.log("show", data)
    if (!data) {
        return res.status(404).json("Book not found")
    }
    if (error) {
        console.log(error)
    } else {
        res.send(data)
    }
}

exports.updateTodoById = async (req, res) => {
    // update a book
    try {
        const { name, description } = req.body
        let { data, error } = await supabase.from('todo').select("*")
            .eq('id', req.params.id)
        if (!data) {
            return res.status(404).send("todo not found")
        }
        if (error) {
            console.log(error)
        } else {
            data = await supabase
                .from('todo')
                .update({
                    name,
                    description
                })
                .eq('id', req.params.id)
                .select()

        console.log("data--------------", data)
            res.json(data.data)
        }
    } catch (error) {
        console.error(error);
    }
}

exports.deleteTodoById = async (req, res) => {
    // delete a book
    try {
        let { data, error } = await supabase.from('todo').select("*")
            .eq('id', req.params.id)
        // console.log("show", data)
        if (!data) {
            return res.status(404).send("Book not found")
        }
        if (error) {
            console.log(error)
        } else {
            await supabase
                .from('todo')
                .delete()
                .eq('id', req.params.id)
            res.json("delete successfully")
        }

    } catch (error) {
        console.error(error);
    }
}
