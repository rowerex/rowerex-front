import React from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";

const TaskView = () => {
  return (
    <>
      <Header image={Image} alt="cat looking at the bike.">
        My Bikes
      </Header>
    </>
  );
};

export default TaskView;
