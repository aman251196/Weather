const express = require('express');
var app = express();
const hbs = require('hbs');
const fs = require('fs');

app.set('View engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
const Port = process.env.PORT || 3000;
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

app.use((req, res) => {
    res.render('maintainence.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('CurrentYear', () => new Date().getFullYear());
app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome To my website',
        pageTitle: 'Home Page',
    });
});
app.get('/about', (req, res) => {
    res.render('help.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'BAD REQUEST BUDDY!!'
    });
});
app.listen(Port, () => {
    console.log(`Server ${Port} is up and Running`);
});