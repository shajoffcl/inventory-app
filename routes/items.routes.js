const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/items.controller');
const Validator = require('../validator/items.validator');

router.post('/create', Validator.validateCreateItem, ItemsController.addItem);
router.get('/list', Validator.validateGetItems, ItemsController.getItem);
router.put('/update/:itemName', Validator.validateUpdateItem, ItemsController.updateItem);
router.delete('/remove/:itemName', Validator.validateDeleteItem, ItemsController.deleteItem);

module.exports = router;

