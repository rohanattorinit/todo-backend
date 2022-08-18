require("dotenv").config();
require("./config/database.js").connect();
const express = require("express");
const app = express()
const port = 4000
const cors = require('cors');
//using inbuilt body parser of express
app.use(express.json());
app.use(cors())

const Task = require("./model/task")

//get all the tasks
app.get('/', async(_, res) => {
   Task.find()
  .then(tasks=>res.json(tasks))
  .catch(err=>{
    console.log(err)
    res.status(400).json(`Error: ${err}`)})
})

//create a task
app.post('/create',async(req,res)=>{
  const {task} = req.body;
  const newTask = new Task({task})

   newTask.save()
  .then((result)=>res.json(`Task created! ${result}`))
  .catch(err=>{
    console.error(err);
    res.status(400).json(`Error occured: ${err}`)})
})

//update a task
app.post('/update',async(req,res)=>{
  const {id,isCompleted} = req.body;
  
   Task.updateOne({ _id:id }, {
    isComplete:isCompleted
  })
  .then(()=>res.json(`Task updated!`))
  .catch(err=>res.status(400).json(`Error occured: ${err}`))
})

//delete a task
app.post('/delete',async(req,res)=>{
  const {id} = req.body;
  
  Task.deleteOne({ _id: id })
  .then(()=>res.json(`Task deleted!`))
  .catch(err=>res.status(400).json(`Error occured: ${err}`))
})


app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`)
})