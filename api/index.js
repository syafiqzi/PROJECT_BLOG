const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require ('jsonwebtoken');


const salt = bcrypt.genSaltSync(10); 
const secret = 'adfnrflsiefje'; 

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());

mongoose.connect('mongodb+srv://syafiqzi98:sJRtpGU3wbVwTVXy@cluster0.cw6eujq.mongodb.net');



app.post('/Register', async(req, res) => {  
  const {username, password} = req.body;
  try{
    const userDoc = await User.create ({
      username, 
      password:bcrypt.hashSync(password,salt)});
    res.json(userDoc);
  }catch(e){
     res.status(400).json(e); 
  } 
}); 

app.post('/login', async(req, res) => {  
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password,userDoc.password);
 
  if (passOk){
    //login
    jwt.sign({username,id:userDoc._id}, secret,{}, (err, token)=> {
      if (err) throw err;
      res.cookie('token', token).json({id:userDoc._id,username,});
    });
  } else {
    //not login
    res.status(400).json('Wrong credential')
  }
}); 

// var { Client } = require('pg')
// const client = new Client({
//   connectionString: 'postgresql://postgres:Kuantan123456!@db.lfkotehspqwcnisecqav.supabase.co:5432/postgres' 
// })
// try {
//   var query = client.query('SELECT * FROM users',(err,res)=> console.log (res))
//   console.log (query)
// } catch (err){
//   console.log(err);
// }

// const PORT = process.env.PORT || 4000;

// app.post('/Register', async(req, res) => {
 
//   const {username,password} = req.body;
//  // create user
//  try {
//   const response = await client.query(
//     'INSERT INTO users (username, password) VALUES ($1, $2 ) RETURNING *',
//     [username,password]
//   )
//   const user = response.rows[0]
//   // redirect to login
//   res.json({ requestData:user});
//   // return
// } catch (err){
  
//   console.log(err);
// }

  
//   // res.send('User registered successfully');

// });




app.listen(4000);



