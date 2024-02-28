const express = require('express');
const router = express.Router();

const { createTodo, getData, getTodoById, updateTodoById, deleteTodoById } = require('../controller/todo.controllers');

const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken)
router.get('/', getData);
router.get('/search/:id', getTodoById);
router.post('/create', createTodo);
router.delete('/delete/:id', deleteTodoById);
router.put('/update/:id', updateTodoById)
// router.post('/add/:id', addToCart)
// router.get('/cart', getCartData);

module.exports = router;

