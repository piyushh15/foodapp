const express = require('express')
const app = express()
const port = 5000
const mongoDB=require('./db')
mongoDB();

//creating a middleware function it is necesary
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(
  express.urlencoded({ extended: true })
);
app.use(express.json()) ;


app.use('/api',require("./Routes/createuser"));
app.use('/api',require("./Routes/DisplayData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})