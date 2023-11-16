require('dotenv').config()
var cors = require('cors')
const express = require('express');
const connectDatabase = require('./config/database');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

const port = process.env.PORT || 5000;

connectDatabase()

var corsOptions = {
    origin: ["https://workoutbuddy.mattbutton.dev", "http://localhost:3000"],
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () =>
    console.log(`Listening on http://localhost:${port}`)
)