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
    allowedHeaders: ['Content-type', 'Access-Control-Allow-Origin'],
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


app.get("/user", function (req, res) {
    const params = {
        ExpressionAttributeValues: {
            ':s': 'user',
            ':d': req.query.id
        },
        ExpressionAttributeNames: {
            "#typeData": "typeData",
            "#id": "id"
        },
        KeyConditionExpression: '#typeData = :s and #id = :d',
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

app.post("/userupdate", function(req, res) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "typeData": "user",
            "id": req.body.user.id
        },
        UpdateExpression: "set #cart = :cart, #orders = :orders",
        ExpressionAttributeNames: {
            "#cart": "cart",
            "#orders": "orders"
        },
        ExpressionAttributeValues: {
            ":cart": req.body.user.cart,
            ":orders": req.body.user.orders
        }
    };
    dynamoDb.update(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
})

app.post("/sms", function(req, res) {
    console.log(req.body)
    var message = "Este es el resumen del pedido nº " + req.body.order.id.toString() + ": \n"
    message += "Total " + req.body.order.total + " €\n";
    message += "Products " + JSON.stringify(req.body.order.products);
    const params = {
        Message: message,
        PhoneNumber: req.body.phone.toString()
    };
    const sns = new AWS.SNS();
    sns.publish(params, (data, err) =>{
        if (data) {
            console.log(data);
        }
        else{
            console.log(err);
        }
    })
})

module.exports.handler = serverless(app);
