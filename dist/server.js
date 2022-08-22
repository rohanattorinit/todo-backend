"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
require("./config/database.ts").connect();
const app = (0, express_1.default)();
const port = 4000;
const cors_1 = __importDefault(require("cors"));
//using inbuilt body parser of express
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const task_1 = __importDefault(require("./model/task"));
//get all the tasks
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    task_1.default.find()
        .then((tasks) => res.json(tasks))
        .catch((err) => {
        console.log(err);
        res.status(400).json(`Error: ${err}`);
    });
}));
//create a task
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    const newTask = new task_1.default({ task });
    newTask
        .save()
        .then((result) => res.json(`Task created! ${result}`))
        .catch((err) => {
        console.error(err);
        res.status(400).json(`Error occured: ${err}`);
    });
}));
//update a task
app.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, isCompleted } = req.body;
    task_1.default.updateOne({ _id: id }, {
        isComplete: isCompleted,
    })
        .then(() => res.json(`Task updated!`))
        .catch((err) => res.status(400).json(`Error occured: ${err}`));
}));
//delete a task
app.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    task_1.default.deleteOne({ _id: id })
        .then(() => res.json(`Task deleted!`))
        .catch((err) => res.status(400).json(`Error occured: ${err}`));
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Tod0 App Server is running at https://localhost:${port}`);
});
