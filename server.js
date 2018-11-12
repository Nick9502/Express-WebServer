const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs'); // Sets handlebars view engine for express.

/* Created Express Logger Middleware*/
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `MyLogInfo: ${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err){
			console.log('Unable to append to server.log');
		}
		
	});
	
	next(); // Needed so middleware doesnt get hung
});

/* Maintenance page Middleware*/
app.use((req, res, next) => {
	res.render('maintenance.hbs', {
		pageTitle: 'Maintenance',
		welcomeMessage: 'Page is currently under construction.'
	});
	
});

/* Register middleware*/
app.use(express.static(__dirname + '/public')); // Directory to public using __dirname for absolute path

// Helper function to use in template injections
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});
hbs.registerHelper('toUpper', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to my Express Site'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Me'
	});
});

app.get('/error', (req, res) => {
	res.send({
		error: "Unable to resolve request."
	});
});

app.get('/me', (req, res) => {
	res.send({
		name: 'Nicolas',
		likes: [
			'Video Games',
			'Dancing',
			'Basketball'
		]
	})
});
app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
