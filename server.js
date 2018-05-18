const express= require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = port.env.PORT ||7777;

let app = express();
hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');





app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log("Unable to append to server.log.")
        }
        next();
    });
});

// app.use((req,res, next) =>{
//  res.render('m.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
   return text.toUpperCase();
});

app.get('/', (req, res) =>{

    res.render('home.hbs',{
        pageTitle: 'Home Shit',
        welcomeMessage: 'HOOOOO I LOVE BITCONNEKT!!!'

    })
});

app.get('/about', (req, res) =>{
    res.render('juanning.hbs', {
        pageTitle: 'JUANNING Page',
        welcomeMessage: "where's my bitconnekt???"
    });
});

app.get('/bad', (req, res) =>{
    res.render('juanning.hbs');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port} ya heard!!!`)
});