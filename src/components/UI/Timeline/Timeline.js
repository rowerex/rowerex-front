import React from "react";
import classes from "./Timeline.module.scss";
import { ReactComponent as RetireIcon } from "../../../assets/icons/button-retire.svg";
import { ReactComponent as NewIcon } from "../../../assets/icons/star-icon.svg";
import { ReactComponent as ServiceIcon } from "../../../assets/icons/button-service.svg";
import { ReactComponent as LinkIcon } from "../../../assets/icons/button-link.svg";

const Timeline = (props) => {
    return (
        <div>
            {
                props.events ?
                        <ul className={classes.timeLineList}>{props.events.map((timelineItem, index) => (
                        <li key={`stat-item-${index}`}>
                            <div>
                            {(timelineItem.label === 'installed' || timelineItem.label === 'removed') && <LinkIcon/>}
                            {timelineItem.label === 'serviced' && <ServiceIcon/>}
                            {timelineItem.label === 'purchased' && <NewIcon/>}
                            {timelineItem.label === 'retired' && <RetireIcon/>}
                            </div>
                            <p className={classes.title}>{timelineItem.date} {timelineItem.label}</p>
                            <p>{timelineItem.description}</p>
                        </li>))}
                        </ul>
                    : <p>No events to display.</p>
            }
        </div>
    );
};

export default Timeline;
