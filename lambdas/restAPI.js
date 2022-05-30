const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const AWS = require("aws-sdk");

const TABLE_NAME = process.env.TABLE_NAME;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.get("/", function (req, res) {
    res.send("Pet shop API");
});

// Get User endpoint
app.get("/products", function (req, res) {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'begins_with(#id, :id_item)',
        ExpressionAttributeNames:{
            "#id": "id",},
        ExpressionAttributeValues: {
            ":id_item": "item_",}
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not get products' });
        }
        else if (result) {
            console.log(result)
            // const {userId, name} = result.Item;
            res.json({result});
        } else { // No devuelte nada
            res.status(404).json({ error: "Products not found" });
        }
    });
});

module.exports.handler = serverless(app);
