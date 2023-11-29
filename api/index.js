const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// const PORT = process.env.PORT || 4000;

app.post('/Register', (req, res) => {
  const {username,password} = req.body;
  res.json({ requestData:{username,password}});
  // res.send('User registered successfully');

});

app.listen(4000);

