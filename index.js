// 
// 
// to run the project in terminal type :" nodemon index.js"
// 
// 


//some variables for starting our project

const express=require("express");
const path =require("path");
const app=express();
const port= 8000;

//variables for making access our database

const db=require("./config/mongoose");
const todo=require("./models/todo");


// for setting our view engine and view folder linking

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

// for connecting our assets folder to our view file

app.use(express.static("assets"));

// app.use("/", require("./routes/index"));

//for getting acces and render our main page file

app.get("/", function(req, res)
{
   
   todo.find({},
      function(err, todo)
      {
         if(err)
         {
            console.log("err in fetching data from database");
            return;
         }
         return res.render('home',
         {
            title : "home-todolist",
            task_list : todo
         });

      });
   
   
  
});

// for adding our task into our todo list

app.post("/action/create-task" ,function(req, res)
{
 
   // to render our schema and to create a particular file
   todo.create(
      {
         description: req.body.description ,
         category: req.body.category ,
         date: req.body.date
      }, 
      function(err, newTODO)
        {
         if(err)
         {
            console.log("error in creating contact", err);
            return;
         }

         // for printing or file which has beeen created into our database

         console.log("*******", newTODO);
         return res.redirect("back");
        })
      }
   );


   // for deleting any task from our list by marking up the particular list

app.get("/action/delete-tasks", function(req, res)
{
   
   let id=req.query.id;
   // find the todo in the database using id and deleting
   todo.findByIdAndDelete(id, function(err){
      if(err)
      {
         console.log("there is an error in deleting the contact")
         return;

      }
      return res.redirect("back");
   })
  
});



// for checking whether our server is running or not

app.listen(port, function(err)
{
    if(err)
    {
        console.log(`error in running the server ${err}`);
        return ;
    }

    console.log(`server is running on port : ${port}`);
});



// 
// 
// 
// 
// 