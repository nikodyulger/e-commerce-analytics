const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
var cors = require('cors');
const app = express();
const AWS = require("aws-sdk");

const TABLE_NAME = process.env.TABLE_NAME;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

var carsOption = {
    origin: '*',
    allowedHeaders: ['Content-type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
    methods: ['GET', 'POST']
}

app.use(cors(carsOption))
app.use(bodyParser.json({ strict: false }));

app.get("/", function (req, res) {
    res.send("Pet shop API");
});

// Get User endpoint
app.get("/products", function (req, res) {
    const params = {
        ExpressionAttributeValues: {
            ':s': 'product'
        },
        ExpressionAttributeNames: {
            "#typeData": "typeData"
        },
        KeyConditionExpression: '#typeData = :s',
        TableName: TABLE_NAME
    };

    dynamoDb.query(params, function(error, result) {
        if (error) {
            console.log("Error", error);
            res.status(400).json({ error: error });
        }
        else if (result) {
            console.log(result)
            res.json({result});
        } else {
            res.status(404).json({ error: "Products not found" });
        }
    });
});

module.exports.handler = serverless(app);
