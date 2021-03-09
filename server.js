const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Pizza = require("./model/pizza");


app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.urlencoded({extended:true}));

mongoose
  .connect("mongodb://localhost:27017/DbPizzaStore", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Successfully Connected..."))
  .catch((err) => {
    console.log("Not Connected to Db");
  });

app.get("/", (req, res) => {
  Pizza.find().sort({createdAt:-1})
  .then((data)=>{
    res.render("index", { title: "Home", orders:data });
  }).catch((err)=>{
    console.log(err);
  })
  
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/orders", (req, res) => {
  res.render("order", { title: "Orders" });
});

app.post("/orders", (req, res) => {
  const pizza = new Pizza(req.body)
  pizza.save()
  .then(() => {
    res.redirect("/")
    console.log("Succesfully Placed Order");      
  })
  .catch((err) => {
    console.log(`Error Occured while Placing an Order ${err}`);     
  });
});

app.use((req, res) => res.render("404", { title: "Error" }));

app.listen(4000, () => console.log("The Server is Running on Port : 4000"));
