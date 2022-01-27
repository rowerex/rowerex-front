import React from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Parts from "../components/Parts/Parts";
import useParts from "../components/Parts/useParts";

const PartsView = () => {
  const [parts, error] = useParts();
  return (
    <>
      <Header image={Image} alt="cat looking at the bike part">
        My Parts
      </Header>
      {error !== null
        ? <p>Error fetching parts: {error}</p>
        : <Parts parts={parts}/>
      }
    </>
  );
};

export default PartsView;
