import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import * as register from './controllers/register.js';
import * as signin from './controllers/signin.js';
import * as profile from './controllers/profile.js';
import * as image from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'user',
      password : '',
      database : 'smart-brain'
    }
});

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register' , (req,res) => { register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
 
app.listen(3000, ()=> {
    console.log('app is running on port 3000');
  })