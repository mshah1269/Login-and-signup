const express = require('express')
const PORT = 3000

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()


app.use(bodyParser.urlencoded({ extended: false }));


mongoose
  .connect(
        'Your uri',{
            useNewUrlParser: true,
            useUnifiedTopology: true

        }
    )
  .then(result => {
    app.listen(PORT,()=>{
        console.log("server is running on ",PORT)
    })
  })
  .catch(err => {
    console.log(err);
  });


  require('./models/user')
  require('./models/post')
  const requireLogin = require("./middleware/requireLogin");

  app.use(express.json())
  app.use(require('./routes/auth'))
  app.use(require('./routes/post'))
  app.get('/',requireLogin,(req,res)=>{
    res.send({email:req.user.email})
})
