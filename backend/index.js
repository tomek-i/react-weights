require('dotenv').config();
const config = require('config');//

const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const _ = require('underscore');

const app = express();

// use json middleware
app.use(helmet());

app.use(express.json());
//app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

if(app.get('env') ==='development'){
    console.log('Morgan HTTP logging middleware enabled ...');
    app.use(morgan('tiny'));

    console.log('Custom logging middleware enabled ...');
    app.use(logger);//custom logger
};



console.log('App name: '+config.get('name'));
console.log('Mail Server: '+config.get('mail.host'));
console.log('Mail Password: '+config.get('mail.password'));

// demo data points - will come from database
const dataPoints = [
    {
        id: 1,
        date:'05/11/2019',
        value:91
    },
    {
        id: 2,
        date:'06/11/2019',
        value:89
    },
    {
        id: 3,
        date:'07/11/2019',
        value:87
    },
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/data', (req, res) => {
  res.send(dataPoints);
});

app.get('/api/data/:id', (req, res) => {

    const dataPoint = dataPoints.find(c=> c.id === parseInt(req.params.id));

    if(!dataPoint) {
        res.status(404).send('No data point with that ID was found.');
    }

    res.send(dataPoint);
});

app.get('/api/data/:year/:month', (req, res) => {
    res.send(req.params);
});


app.put('/api/data/:id',(req,res)=>{
    const dataPoint = dataPoints.find(c=> c.id === parseInt(req.params.id));

    if(!dataPoint) {
        return res.status(404).send('No data point with that ID was found.');
    }

   //object deconstructing, same as `const result = validateDataPoint(req.body);` and then calling/using `result.error`
   const { error } = validateDataPoint(req.body);

   if(error) {
        return res.status(400).send(error.details[0].message);
    }

    dataPoint.value = req.body.value;
    dataPoint.date = new Date(req.body.date || new Date(dataPoint.date).toLocaleDateString()).toLocaleDateString();

    res.send(dataPoint);
});

app.post('/api/data',(req,res) => {

    //object deconstructing, same as `const result = validateDataPoint(req.body);` and then calling/using `result.error`
    const { error } = validateDataPoint(req.body);

    if(error) {
        // respond back with '400 Bad Request' with error details
        return res.status(400).send(error.details[0].message);
    }

    // parse the date and/or create a new Date() object
    const date = new Date(req.body.date || new Date().toLocaleDateString())

    const dataPoint = {
        id: dataPoints.length + 1,
        date: date.toLocaleDateString(),
        value:req.body.value
    };

    dataPoints.push(dataPoint);

    res.send(dataPoint);

});


app.delete('/api/data/:id',(req,res)=>{
    const dataPoint = dataPoints.find(c=> c.id === parseInt(req.params.id));

    if(!dataPoint) {
        return res.status(404).send('No data point with that ID was found.');
    }

    const index = dataPoints.indexOf(dataPoint);
    dataPoints.splice(index,1);

    res.send(dataPoint);
});

function validateDataPoint(dataPoint){
    const schema = {
        date:Joi.date().optional(),
        value:Joi.number().positive().precision(2).required(),
    }
    return Joi.validate(dataPoint,schema);
}



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});
