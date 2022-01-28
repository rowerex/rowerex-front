import React from "react";
import classes from "./Task.module.scss";
import Card from "../UI/Card";
import Button from "../UI/Button/Button";
import { ReactComponent as ServiceIcon } from "../../assets/icons/task-service.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/task-trash.svg";

const Task = (props) => {
  return (
    <Card className={classes.card}>
      {props.taskType === "retire" && <TrashIcon className={classes.icon} />}

      {props.taskType === "service" && <ServiceIcon className={classes.icon} />}

      <div className={classes.wrapper}>
        <p className={classes.partType}>{props.partType}</p>
        <h3>{props.partModel}</h3>
        <p className={classes.location}>{props.location}</p>
        <div className={classes.buttons}>
          {props.taskType === "service" && (
            <Button variant="service">Service</Button>
          )}

          {props.taskType === "service" && props.location !== "on shelf" && (
            <Button variant="detach" priority="secondary">
              Detach
            </Button>
          )}

          {props.taskType === "retire" && props.location !== "on shelf" && (
            <>
              <Button variant="service">Service</Button>
              <Button variant="detach" priority="secondary">
                Detach
              </Button>
            </>
          )}

          {props.taskType === "retire" && props.location === "on shelf" && (
            <>
              <Button variant="detach">Detach</Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

// const Task = (props) => {
//   return (
//     <Card className={classes.card}>
//       {props.taskType === "retire" && <TrashIcon className={classes.icon} />}
//       {props.taskType === "service" && <ServiceIcon className={classes.icon} />}
//       <div className={classes.wrapper}>
//         <p className={classes.partType}>{props.partType}</p>
//         <h3>{props.partModel}</h3>
//         <p className={classes.location}>{props.location}</p>
//         <div className={classes.buttons}>
//           {props.taskType === "service" && <Button>Service</Button>}
//           {props.taskType === "retire" && (
//             <>
//               <Button variant="service">Service</Button>
//               <Button variant="detach" priority="secondary">
//                 Detach
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

export default Task;
