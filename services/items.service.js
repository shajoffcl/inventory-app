const responseCodes = require('../configs/responseCodes');
const Response = require('../utils/response');
const ItemsDao = require('../dao/items.dao');

module.exports = class ItemsService {

     static async addItem(reqObj) {
          const { itemName, quantity, category, expiry, purchasePrice, mrp } = reqObj;

          const existEntry = await ItemsDao.getTop5ItemsByName(itemName?.toUpperCase());
          if (existEntry?.length) {
               return new Response(responseCodes.ITEM_EXISTS.code, responseCodes.ITEM_EXISTS.msg, {});
          }

          await ItemsDao.createItem({
               itemName: itemName?.toUpperCase(),
               quantity,
               category,
               expiry,
               purchasePrice,
               mrp
          })
          return new Response(responseCodes.SUCCESS.code, responseCodes.SUCCESS.msg, {});
     }

     static async getItems({itemName}) {
          let data = [];

          if (itemName) {
               itemName = itemName?.trim()?.toUpperCase()
               data = await ItemsDao.getTop5ItemsByName(itemName)
          } else {
               data = await ItemsDao.getTop5ItemsByExpiry();
          }

          return new Response(responseCodes.SUCCESS.code, responseCodes.SUCCESS.msg, {list: data})
     }

     static async updateItem(reqObj, updateObj) {
          const { itemName } = reqObj;
          const { quantity, expiry, purchasePrice, mrp } = updateObj;

          const existEntry = await ItemsDao.getTop5ItemsByName(itemName?.toUpperCase());

          if (!existEntry?.length) {
               return new Response(responseCodes.NOT_FOUND.code, responseCodes.NOT_FOUND.msg, {});
          }

          const { expiry: existingExpiry } = existEntry[0];

          if (expiry) {
               const result = await ItemsDao.deleteItem({
                    itemName: itemName?.toUpperCase(),
                    expiry: existingExpiry
               })

               if (result.success) {
                    await ItemsDao.createItem({
                         ...existEntry[0],
                         expiry
                    })
                    return new Response(responseCodes.SUCCESS.code, responseCodes.SUCCESS.msg, {})
               } else {
                    return new Response(responseCodes.BAD_REQUEST.code, responseCodes.BAD_REQUEST.msg, {})
               }
          }

          const updateParts = [];
          const expressionAttributeNames = {};
          const expressionAttributeValues = {};

          if (quantity) {
               updateParts.push('#quantity = :quantity');
               expressionAttributeNames['#quantity'] = 'quantity';
               expressionAttributeValues[':quantity'] = quantity;
          }

          if (purchasePrice) {
               updateParts.push('#purchasePrice = :purchasePrice');
               expressionAttributeNames['#purchasePrice'] = 'purchasePrice';
               expressionAttributeValues[':purchasePrice'] = purchasePrice;
          }

          if (mrp) {
               updateParts.push('#mrp = :mrp');
               expressionAttributeNames['#mrp'] = 'mrp';
               expressionAttributeValues[':mrp'] = mrp;
          }

          if (!updateParts.length) {
               return new Response(responseCodes.BAD_REQUEST.code, responseCodes.BAD_REQUEST.msg, {})
          }

          const updateExpression = 'SET ' + updateParts.join(', ');

          await ItemsDao.updateItem({
               itemName: itemName?.toUpperCase(), 
               expiry: existingExpiry
          }, updateExpression, expressionAttributeNames, expressionAttributeValues)

          return new Response(responseCodes.SUCCESS.code, responseCodes.SUCCESS.msg, {})

     }

     static async deleteItem(reqObj) {
          const { itemName } = reqObj;

          const existEntry = await ItemsDao.getTop5ItemsByName(itemName?.toUpperCase());

          if (!existEntry?.length) {
               return new Response(responseCodes.NOT_FOUND.code, responseCodes.NOT_FOUND.msg, {});
          }

          const { expiry } = existEntry[0];

          const result = await ItemsDao.deleteItem({
               itemName: itemName?.toUpperCase(),
               expiry
          })

          if (result.success) {
               return new Response(responseCodes.SUCCESS.code, responseCodes.SUCCESS.msg, {})
          } else {
               return new Response(responseCodes.BAD_REQUEST.code, responseCodes.BAD_REQUEST.msg, {})
          }
          
     }
     
}