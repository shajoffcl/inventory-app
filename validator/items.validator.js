exports.validateCreateItem = (req, res, next) => {
     const { itemName, quantity, purchasePrice, mrp, expiry, category } = req.body;

     if (!itemName) {
          return res.status(400).json({ error: "Item Name is required" });
     } else if (itemName && typeof itemName !== "string") {
          return res.status(400).json({ error: "Item Name must be a string" });
     } else if (!quantity) {
          return res.status(400).json({ error: "Quantity is required" });
     } else if (quantity && typeof quantity !== "number") {
          return res.status(400).json({ error: "Quantity must be a number" });
     } else if (!purchasePrice ) {
          return res.status(400).json({ error: "Purchase price is required" });
     } else if (purchasePrice && typeof purchasePrice !== "number") {
          return res.status(400).json({ error: "Purchase price must be a number" });
     } else if (!mrp ) {
          return res.status(400).json({ error: "MRP is required" });
     } else if (mrp && typeof mrp !== "number") {
          return res.status(400).json({ error: "MRP must be a number" });
     } else if (!expiry ) {
          return res.status(400).json({ error: "Expiry is required" });
     } else if (expiry && typeof expiry !== "string") {
          return res.status(400).json({ error: "Expiry must be a string" });
     } else if (!category ) {
          return res.status(400).json({ error: "Category is required" });
     } else if (category && typeof category !== "string") {
          return res.status(400).json({ error: "Category must be a string" });
     } else {
          next();
     }
}

exports.validateGetItems = (req, res, next) => {
     const { itemName } = req.query;

     if (itemName && typeof itemName !== "string") {
          return res.status(400).json({ error: "Item Name must be a string" });
     } else {
          next();
     }
}

exports.validateUpdateItem = (req, res, next) => {
     const { itemName } = req.params;
     const { quantity, purchasePrice, mrp, expiry } = req.body;

     if (!itemName) {
          return res.status(400).json({ error: "Item Name is required" });
     } else if (itemName && typeof itemName !== "string") {
          return res.status(400).json({ error: "Item Name must be a string" });
     } else if (quantity && typeof quantity !== "number") {
          return res.status(400).json({ error: "Quantity must be a number" });
     } else if (purchasePrice && typeof purchasePrice !== "number") {
          return res.status(400).json({ error: "Purchase price must be a number" });
     } else if (mrp && typeof mrp !== "number") {
          return res.status(400).json({ error: "MRP must be a number" });
     } else if (expiry && typeof expiry !== "string") {
          return res.status(400).json({ error: "Expiry must be a string" });
     } else {
          next();
     }
}

exports.validateDeleteItem = (req, res, next) => {
     const { itemName } = req.params;

     if (!itemName) {
          return res.status(400).json({ error: "Item Name is required" });
     } else if (itemName && typeof itemName !== "string") {
          return res.status(400).json({ error: "Item Name must be a string" });
     } else {
          next();
     }
}

