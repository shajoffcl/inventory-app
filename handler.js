const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');

const corsOptions = require('./configs/corsOptions');
const userRoutes = require('./routes/user.routes');
const itemsRoutes = require('./routes/items.routes');

const auth = require('./middlewares/auth.middleware');

const app = express();

app.use(cors(corsOptions));
// app.use('*', cors());

app.use(express.json());
app.use(express.static('public'))


app.use('/user', userRoutes);
app.use('/items', auth, itemsRoutes);

app.get("/health-check", (req, res) => {
  res.json({ 
    Msg: "Hello from server!",
    Time: Date.now()
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
