const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'cametumbling',
    password: '',
    database: 'smartbrain'
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, brcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req,res) => { image.handleImage(req, res, db) })

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})


/*

defining our routes/endpoints:

/--> res = this is working

/signin --> POST (for security reasons) = success/fail

/register --> POST (for security reasons) = user

/profile/:id --> GET = user

/image --> PUT = user

*/
