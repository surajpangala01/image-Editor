import express from "express";
import cors from "cors";
// import bodyParser from "body-parser"
import mongo from "mongodb"
var ObjectId = mongo.ObjectId;

const MongoClient = mongo.MongoClient;


var db;
var db_images;
var db_community;

const url = "mongodb+srv://admin:admin123@cluster0.h09vs4l.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, database) {
   // console.log("hello")
   if (err) 
   	console.log("db error",err)
   else
   {
	db = database.db("test_work")
   db_images = db.collection("images");
   db_community = db.collection("community")
   
	console.log('Connected to MongoDB');
	//Start app only after connection is ready
	// app.listen(5000);
   }
 })

const app = express();

app.use(cors());
app.use(express.json({limit : 1048576}));
// var students = [
//    {name :"Suraj" , Rollno:30},
//    {name : "Preetham", Rollno: 31}
// ]

app.get("/student" , function(req,res){
   console.log("Connected finally");
   //  var k = JSON.stringify(students);
    // }
   // console.log("hello");
   db_images.find({}).toArray()
   .then(img =>{
      console.log(img);
      res.send(img)
   })
   .catch(err=>{throw err})
   // res.send(name);
   // console.log(students);
   // res.redirect("/");
});



app.post("/student", (req,res)=>
{
   req.body.name = "image1";
   // console.log(req.body);
   console.log("(/student)Data recieved")
   // res.send(req.body);
   db_images.insertOne(req.body,(err,res)=>
   {
      if(err) throw err;
      console.log("Inserted");
      
   });
   res.send("Success");
});

app.delete("/student",(req,res)=>
{
   console.log(students.indexOf(req.query));
   // students.splice(,1);
   res.send(students);
})

app.post("/community",(req,res)=>
{
   // console.log(req.body)
   var body = req.body
   body.updated = true;
   console.log(body)
   db_community.insertOne(body,(req,res)=>
   {
      if (req) throw req;
      console.log("Inserted")
   })
   res.send("updated");
})

app.get("/community",(req,res)=>
{
   // console.log("hello")
   db_community.find({}).toArray()
   .then((data)=>
   {
      // console.log(data);
      res.json(data);
   })
   .catch((err)=>
   {
      console.log("error : ",err);
   })
})

app.put("/community",(req,res)=>
{
   console.log(req.body);
   db_community.updateOne({"_id":new ObjectId(req.body.id)},{$set:{"updated_image":req.body.uploaded_image}})
});

app.get("/community/:id",(req,res)=>
{
   console.log()
   db_community.findOne({"_id":new ObjectId(req.params.id)})
   .then((data)=>
   {
      console.log("got it")
      console.log(data)
      res.json(data)
   })
})
const PORT =5000;

app.listen(PORT,()=>{
   console.log("Litsening...")
})