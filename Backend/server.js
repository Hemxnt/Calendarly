const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./src/routes/routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(4000, () => console.log('Server running on port 4000'));
