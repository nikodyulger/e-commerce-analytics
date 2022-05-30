var aws = require('aws-sdk');
aws.config.update({region: process.env.REGION});
var ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});


exports.handler = async(event, context, callback) => {
    var params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'id' : {S: event.userName},
            'email' : {S: event.request.userAttributes.email},
            'birthdate' : {S: event.request.userAttributes.birthdate},
            'address' : {S: event.request.userAttributes.address},
            'name' : {S: event.request.userAttributes.name}
        }
    };
    console.log("params", params)
    try {
        await ddb.putItem(params).promise()
        console.log("Success");
    } catch (err) {
        console.log("Error", err);
    }
    context.done(null, event);
};
