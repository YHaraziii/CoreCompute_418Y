const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.listen(9000, ()=> { console.log('Server Started at ${9000}')})