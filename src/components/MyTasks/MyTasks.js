import React from "react";
import Header from "../Layout/Header/Header";
import Image from "../../assets/images/myTaskHeader.png";
import Task from "./Task";

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
    taskType: "Merida",
  },
  {
    id: "t5",
    partType: "pedals",
    partModel: "tęczowe pedały",
    taskType: "service",
    location: "Kellys Spider",
  },
];
const MyTasks = () => {
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

  return (
    <>
      <Header image={Image} alt="cat looking at the bike.">
        My Tasks
      </Header>
      <ul>{tasksList}</ul>
    </>
  );
};
export default MyTasks;
