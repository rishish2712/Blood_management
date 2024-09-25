const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const donorRoutes = require('./routes/donorRoutes');
const bloodRoutes = require('./routes/bloodRoutes'); // Import your routes

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://<UserName>:<Password>@cluster0.4onb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(5000, () => {
        console.log('Server is running on http://localhost:5000');
        console.log("MONGODB CONNECTED SUCCESSFULLY.");
    });
})
.catch(err => console.error(err));

app.use('/api/donors', donorRoutes);
app.use('/api/blood', bloodRoutes);
