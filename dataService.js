
// require mongoose
var mongoose = require("mongoose");

// require .env file for connection string (hidden)
require('dotenv').config()

// connect to the localhost mongo running on default port 27017
const connectionString = process.env.MONGODB_CONN_STR
let db = mongoose.createConnection(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// check if connection succeeds
db.on('error', (err)=>{
    console.log("Mongo database connection error!");
});

db.once('open', ()=>{
    console.log("Mongo database connection success!");
});

//setup schemas
var Schema = mongoose.Schema;

// create schema
var mealIdeaSchema = new Schema
({
  "protein":  String,
  "side": String,
  "date": String
});

var MealIdea = db.model("meal_idea", mealIdeaSchema);

module.exports.createMealIdea = (remoteData) =>
{
    console.log("remoteData: ", remoteData);

    var localMealIdea = new MealIdea
    ({
        protein: remoteData.protein,
        side: remoteData.side,
        date: remoteData.date
    });

    console.log("localmealidea: ", localMealIdea);

    //save the meal idea
    return new Promise(function (resolve, reject){
        if (remoteData)
        {
            console.log('entered new promise');
            localMealIdea.save((err, addedMealIdea) =>
            {
                console.log('entered save function');
                if (err) {console.log('error occured');reject(err);}
                else {
                    console.log('save and resolve promise');
                    resolve(addedMealIdea._id);
                };
            });
        }
    });   
};

// get one meal idea
module.exports.getMealIdeaById = (remoteData) =>
{
    return new Promise(function(resolve,reject){

        MealIdea.find({_id: remoteData})
        .limit(1)
        .exec()
        .then((data) => {
            data = data.map(value => value.toObject());
            console.log("meal-idea found:", data[0]);
            resolve(data[0]);
        })
        .catch((err)=>{
            reject(err);
        });
    })
};

// get one meal idea
module.exports.getAllMealIdea = () =>
{
    return new Promise (function(resolve, reject)
    {
        MealIdea.find()
        .exec()
        .then((data) => {
            data = data.map(value => value.toObject());
            resolve(data);
        })
        .catch((err)=>{
            reject(err);
        });
    });
};