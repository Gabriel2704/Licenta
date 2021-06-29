const express = require('express');
const cookieSession = require("cookie-session");
const router = require('./routes');
const passport = require('passport');
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

require('./config/passport')(passport);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["Qo70XNCA0jMTArARI66KU5yyeO2IOyRj.bZ/ubPmHqVIFNUGiGS5AxI/K7kBl+g3cGOK589ARzUM"],
  })
);

app.use(cors({ credentials: true }, "http://localhost:5000/"));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.header("origin"));
  next();
});

const port = process.env.PORT || 5000;

app.listen(port, console.log('Serverul e pe portul ' + port));

app.use('/api', router);
