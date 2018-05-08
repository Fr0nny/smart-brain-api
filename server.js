const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profileID = require('./controllers/profileID');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
 	ssl: true
  }
});

db.select('*').from('users').then(data => {
	// console.log(data);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res)=>{
	res.send('it is working!');
})

//signin --> POST = success/fail
app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) });
//shorter way:
// app.post('/signIn', signIn.handleSignIn(db, bcrypt)); <--------------

//register --> POST = user
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//profile/:userId --> GET = user
app.get('/profile/:id', (req, res) => { profileID.handleProfileID(req, req, db) });

//image --> PUT --> user
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) });


app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})




/* Ideas how to set up that server
/ ---> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user


*/