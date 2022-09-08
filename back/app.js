const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const http = require('http');

const authRoutes = require('./routes/auth')
const app = express();
const PORT = 3000;

//connection as mongodb
mongoose.connect('mongodb+srv://hauretax:2tMuvjuSVpieDshR@cluster0.lubjtun.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((er) => console.log('mongodb say : ' + er));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/',(req,res)=> {
    res.send("<h1>OUI</h1>")
})

app.use('/auth', authRoutes)

app.listen(PORT, (error) => {
    if(!error)
    console.log("Sever is running, app listen on http://localhost:3000/")
    else 
    console.log("Error occurred, server can't start", error);
}
)