import express, { Express, Request, Response } from "express";
require("dotenv").config();
require("./config/database.js").connect();

const app: Express = express();
const port = 4000;
import cors from "cors";
//using inbuilt body parser of express
app.use(express.json());

app.use(cors());

import Task from "./model/task";

//get all the tasks
app.get("/", async (req: Request, res: Response) => {
  Task.find()
    .then((tasks: any) => res.json(tasks))
    .catch((err: any) => {
      console.log(err);
      res.status(400).json(`Error: ${err}`);
    });
});

//create a task
app.post("/create", async (req: any, res: any) => {
  const { task } = req.body;
  const newTask = new Task({ task });

  newTask
    .save()
    .then((result: any) => res.json(`Task created! ${result}`))
    .catch((err: any) => {
      console.error(err);
      res.status(400).json(`Error occured: ${err}`);
    });
});

//update a task
app.post("/update", async (req: any, res: any) => {
  const { id, isCompleted } = req.body;

  Task.updateOne(
    { _id: id },
    {
      isComplete: isCompleted,
    }
  )
    .then(() => res.json(`Task updated!`))
    .catch((err: any) => res.status(400).json(`Error occured: ${err}`));
});

//delete a task
app.post("/delete", async (req: any, res: any) => {
  const { id } = req.body;

  Task.deleteOne({ _id: id })
    .then(() => res.json(`Task deleted!`))
    .catch((err: any) => res.status(400).json(`Error occured: ${err}`));
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
