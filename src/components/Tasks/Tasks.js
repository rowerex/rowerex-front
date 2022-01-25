import React from "react";
import Task from "./Task";
import Card from "../UI/Card";

const DUMMY_TASKS = [
  {
    id: "t1",
    partType: "front wheel",
    partModel: "Shimano Road WH-RS100-CL",
    taskType: "service",
    location: "Wilier Filante SLR",
  },
  {
    id: "t2",
    partType: "brake",
    partModel: "SRAM Code RSC",
    taskType: "service",
    location: "on shelf",
  },
  {
    id: "t3",
    partType: "tire",
    partModel: "Continental eRuban Plus Clincher Tyre",
    taskType: "service",
    location: "Wilier Filante SLR",
  },
  {
    id: "t4",
    partType: "crank set",
    partModel: "FSA SL-K Modular BB386EVO",
    taskType: "retire",
    location: "Merida",
  },
  {
    id: "t5",
    partType: "pedals",
    partModel: "tęczowe pedały",
    taskType: "service",
    location: "Kellys Spider",
  },
];
const Tasks = () => {
  const tasksList = DUMMY_TASKS.map((task) => (
    <Task
      id={task.id}
      key={task.id}
      partType={task.partType}
      partModel={task.partModel}
      taskType={task.taskType}
      location={task.location}
    />
  ));

  return <ul>{tasksList}</ul>;
};
export default Tasks;
