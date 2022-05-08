var aws = require('aws-sdk');
aws.config.update({region: process.env.REGION});
var ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});

var products = [
    {
        id: "item_01",
        title: "Turtle Aquarium",
        category: "Reptiles",
        url: "../assets/turtleaquarium.jpg",
        description:
            "Wide turtle hatch, designed to keep your pet in a space to move freely.",
        price: 35,
    },
    {
        id: "item_02",
        title: "Bird Cage",
        category: "Birds",
        url: "../assets/birdcage.jpg",
        description: "Perfect birdhouse for your home in white.",
        price: 30,
    },
    {
        id: "item_03",
        title: "Dog Bed",
        category: "Dogs",
        url: "static/dogbed.jpg",
        description:
            "Perfect dog mattress to guarantee the rest of the pet. There are several sizes available.",
        price: 15,
    },
    {
        id: "item_04",
        title: "Dog Toy",
        category: "Dogs",
        url: "static/dogtoy.jpg",
        description: "Puppy toy. Multicolor for your entertainment.",
        price: 7,
    },
    {
        id: "item_05",
        title: "Cat House",
        category: "Cats",
        url: "static/cathouse.jpg",
        description:
            "Cat house with a beautiful design that guarantees the rest of your pet.",
        price: 56,
    },
    {
        id: "item_06",
        title: "Cat Scratcher",
        category: "Cats",
        url: "static/catscratcher.jpg",
        description: "Sturdy scratcher with toy, soft and fun.",
        price: 18,
    },
    {
        id: "item_07",
        title: "Hamster Cage",
        category: "Rodents",
        url: "static/hamstercage.jpg",
        description:
            "Comfortable hamster cage so that it can grow up healthy and strong.",
        price: 16,
    },
    {
        id: "item_08",
        title: "Fish Aquarium",
        category: "Fishes",
        url: "static/fishaquarium.jpg",
        description: "Perfect aquarium for any corner of your house.",
        price: 23,
    },
]

exports.handler = async (event, context, callback) => {
    for (const product of products) {
        var params = {
            TableName: process.env.TABLE_NAME,
            Item: {
                'id' : {S: product.id},
                'title' : {S: product.title},
                'category' : {S: product.category},
                'url' : {S: product.url},
                'description' : {S: product.description},
                'price' : {S: product.price.toString()}
            }
        };
        console.log("params", params)
        try {
            await ddb.putItem(params).promise()
            console.log("Success");
        } catch (err) {
            console.log("Error", err);
        }
    }
    context.done(null, event);
};
