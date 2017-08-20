const express = require('express');
const mustacheExpress = require('mustache-express');
const busBoy = require("busboy");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

var user;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({
    extended: true

}));






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


