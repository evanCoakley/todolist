const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");
const path = require("path");

const port = process.env.PORT || 8080;
const app = express();


app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "mustache");


app.use(bodyParser.urlencoded({ extended: true }));

const todoList = [];

app.get("/", (req, res) => {

    const completeTodos = [];
    const incompleteTodos = [];

    todoList.forEach(function (todo) {
        if (todo.completed) {
            completeTodos.push(todo);
        } else {
            incompleteTodos.push(todo);
        }
    });


    res.render("todo", { complete: completeTodos, incomplete: incompleteTodos })
});


app.post("/", function (req, res) {
    let newTodo = req.body;
    newTodo.completed = false;
    newTodo.id = Math.random();
    todoList.push(newTodo);
    return res.redirect('/')
})

app.post("/todos/:id", function (req, res) {
    let id = req.params.id;
    let todo = todoList.find(todo => todo.id === parseFloat(id));
    todo.completed = !todo.completed;
    return res.redirect('/');
})

app.listen(port, () => {
    console.log(`Running on port ${port}!`);
});
