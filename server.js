const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'postgresql-transparent-26620',
    user: 'postgres',
    password: '',
    database: 'smartbrain'
  }
});


const app = express();
const saltRounds = 10;


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send('it is working!') })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req,res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})

/*
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
})
console.log(process.env);
*/

/*

defining our routes/endpoints:

/--> res = this is working

/signin --> POST (for security reasons) = success/fail

/register --> POST (for security reasons) = user

/profile/:id --> GET = user

/image --> PUT = user

*/
