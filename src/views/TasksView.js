import React from "react";
import Tasks from "../components/Tasks/Tasks";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";

const TasksView = () => {
  return (
    <>
      <Header image={Image} alt="cat looking at the bike.">
        My Tasks
      </Header>
      <Tasks />
    </>
  );
};

export default TasksView;
