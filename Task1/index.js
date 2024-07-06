const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const datas = require("./models/reg.js");
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.set("views",(path.join(__dirname,"/views")));
app.use(express.urlencoded({extended: true}));

app.post("/reg_up", (req,res) => {
  let regd_no1 = req.body.regd_no;
  let name1 = req.body.name;
  let email1 = req.body.email;
  let branch1 = req.body.branch;
  //console.log(branch1);
  let data1 = new datas({
    regd_no : regd_no1,
    name : name1, 
    email : email1, 
    branch : branch1,
  });
  data1.save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
  
 res.render("index.ejs",{nam : data1.name });
});

app.get("/", (req,res) => {
  res.set({
    "Allow-access-Allow-Origin" : '*'
  })
  return res.redirect("form.html");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});