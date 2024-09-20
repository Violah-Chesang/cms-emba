const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const memberRouter = require('./routes/member');
const userRouter = require('./routes/user');
const EventRouter = require('./routes/event');
const inventoryRouter = require('./routes/inventory');
const cors = require('cors');

dotenv.config()
const app = express();

//body parser
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//middlewares
app.use(memberRouter);
app.use(userRouter);
app.use(EventRouter);
app.use(inventoryRouter);

const PORT = process.env.PORT || 5500;

const urlConnection = db()
app.listen(PORT, ()=> {
    console.log(`Server has started on port ${PORT}`);
});
