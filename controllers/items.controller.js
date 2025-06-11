const ItemsService = require('../services/items.service');

exports.addItem = async (req, res) => {
     try {
          const response = await ItemsService.addItem(req.body);
          res.status(response.code).json(response);
     } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Could not add item", err: error }); 
     }
}

exports.getItem = async (req, res) => {
     try {
          const response = await ItemsService.getItems(req.query);
          res.status(response.code).json(response);
     } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Could not fetch item", err: error });
     }
}

exports.updateItem = async (req, res) => {
     try {
          const response = await ItemsService.updateItem(req.params, req.body);
          res.status(response.code).json(response);
     } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Could not update item", err: error });
     }
}

exports.deleteItem = async (req, res) => {
     try {
          const response = await ItemsService.deleteItem(req.params);
          res.status(response.code).json(response);
     } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Could not delete item", err: error });
     }
}