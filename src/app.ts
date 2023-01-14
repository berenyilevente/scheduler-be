import dotenv from 'dotenv';
import express from 'express';

dotenv.config({
  path: '.env'
});

const app = express();
const PORT = process.env.APP_PORT || 5000
app.get('/', (req, res) => {
    res.send("Welcome to scheduler API");
  });


app.listen(PORT, () => {
    console.log(`server running: ${PORT}`);
  });