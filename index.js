//require express
const express = require("express");
const app = express();

//setup handlebars
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// to set up body parser to handle incoming text submissions
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup mongoDB
const mongoDataService = require('./dataService');

//setup server utilities
const myServerUtilities = require('./serverUtilities'); 

// setup http server to listen on HTTP_PORT
app.listen(myServerUtilities.getHttpPort(), myServerUtilities.onHttpStart());

// route root to index
app.get("/", function(req,res)
{
    res.redirect('index');
});

// route server to index
app.get("/index", function(req,res)
{
    mongoDataService.getAllMealIdea()
    .then((data) =>
    {
        res.render('index', {
            dataListing: data,
            layout: false // do not use the default Layout
        });
    })
    .catch((reason) => {console.log(reason);}); 
});

// add meal idea
app.post('/addMealIdea', (req, res) => 
{
    mongoDataService.createMealIdea(req.body)
    .then((createdDataId) => 
    {
        console.log('data returned to successful promise: ', createdDataId);

        mongoDataService.getMealIdeaById(createdDataId)
        .then((data) =>
        {
            res.render('index', {
                message: "Meal idea added to database!",
                addedData: data,
                layout: false // do not use the default Layout
            });
        })
        .catch((reason) => {console.log(reason);});

    })
    .catch((reason) => {console.log(reason);});
});
