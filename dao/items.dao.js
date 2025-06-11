const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { 
  DynamoDBDocumentClient, 
  QueryCommand, 
  PutCommand, 
  DeleteCommand,
  UpdateCommand
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient();
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.INVENTORY_ITEMS_TABLE;

const getTop5ItemsByExpiry = async () => {
     try {
       const params = {
          TableName: TABLE_NAME,
          IndexName: 'expiryIndex',
          KeyConditionExpression: 'staticKey = :s',
          ExpressionAttributeValues: {
            ':s': 'ALL'
          },
          ScanIndexForward: true, // ascending (earliest expiry first)
          Limit: 5
       };
   
       const result = await ddbDocClient.send(new QueryCommand(params));
       return result.Items;
     } catch (err) {
       console.error('DynamoDB query error:', err);
       throw err;
     }
};

const getTop5ItemsByName = async (itemName) => {
  try {
    const params = {
       TableName: TABLE_NAME,
       KeyConditionExpression: 'itemName = :itemName',
       ExpressionAttributeValues: {
         ':itemName': itemName
       },
       ScanIndexForward: true, // ascending (earliest expiry first)
       Limit: 5
    };

    const result = await ddbDocClient.send(new QueryCommand(params));
    return result.Items;
  } catch (err) {
    console.error('DynamoDB query error:', err);
    throw err;
  }
};

const createItem = async (itemData) => {   
     const item = {
       itemName: itemData.itemName,         // Partition key
       expiry: itemData.expiry,           // Sort key (if used)
       quantity: itemData.quantity,
       category: itemData.category,
       purchasePrice: itemData.purchasePrice,
       mrp: itemData.mrp,
       staticKey: 'ALL',
       createdAt: new Date().toISOString()
     };
   
     try {
       await ddbDocClient.send(new PutCommand({
         TableName: TABLE_NAME,
         Item: item
       }));
       return { success: true, item };
     } catch (error) {
       console.error('DynamoDB put error:', error);
       throw error;
     }
};

const updateItem = async (keyObj, updateExpression, expressionAttributeNames, expressionAttributeValues) => {
  const params = {
    TableName: TABLE_NAME,
    Key: keyObj,
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await ddbDocClient.send(new UpdateCommand(params));
    return { success: true, result };
  } catch (err) {
    console.error('Error deleting item:', err);
    throw err
  }
}

const deleteItem = async (keyObj) => {
  const params = {
    TableName: TABLE_NAME,
    Key: keyObj,
  };

  try {
    await ddbDocClient.send(new DeleteCommand(params));
    return { success: true, message: 'Item deleted successfully' };
  } catch (err) {
    console.error('Error deleting item:', err);
    return { success: false, error: err };
  }
}
   
module.exports = {
     getTop5ItemsByExpiry,
     createItem,
     getTop5ItemsByName,
     deleteItem,
     updateItem
};