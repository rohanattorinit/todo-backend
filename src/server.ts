import express, { Express, Request, Response } from "express";
require("dotenv").config();
require("./config/database.ts").connect();

const app: Express = express();
const port = 4000;
import cors from "cors";
//using inbuilt body parser of express
app.use(express.json());

app.use(cors());

import Task from "./model/task";

//get all the tasks
app.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res
      .status(200)
      .json({ message: `All tasks fetched successfully!`, data: tasks });
  } catch (error) {
    res.status(400).json({
      error: `Error occured while trying to fetch items`,
      errorMsg: error,
    });
  }
});

//create a task
app.post("/", async (req: Request, res: Response) => {
  const { task } = req.body;
  if (!task)
    res.status(400).json({
      error: "Could not find task data to create!",
      errorMsg: `Task data is probably empty!`,
    });
  try {
    const newTask = new Task({ task });
    await newTask.save();
    res.status(200).json({ message: `Task created successfully!` });
  } catch (error) {}
  res
    .status(400)
    .json({ error: `Error occured while trying to create a new task!` });
});

//update a task
app.put("/update/:id", async (req: Request, res: Response) => {
  const { isCompleted } = req.body;
  const { id } = req.params;
  if (!id)
    res.status(400).json({
      error: `Id of the task not found `,
      errorMsg: `Try providing an id through params`,
    });

  try {
    await Task.updateOne(
      { _id: id },
      {
        isComplete: isCompleted,
      }
    );
    res.status(200).json({ message: `Task updated successfully!` });
  } catch (error) {
    res.status(400).json({
      error: `Error occured while trying to update the task`,
      errorMsg: error,
    });
  }
});

//delete a task
app.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: `Id of the task was not obtained` });

  try {
    await Task.deleteOne({ _id: id });
    res.status(200).json({ message: `Task deleted successfully!` });
  } catch (error) {
    res.status(400).json({
      error: `Error occured while deleting the task`,
      errorMsg: error,
    });
  }
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Todo App Server is running at https://localhost:${port}`
  );
});
