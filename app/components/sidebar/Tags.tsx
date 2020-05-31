import React from 'react';
import { FaTags } from "react-icons/fa";

const Tags = () => {

    return (
        <>
            <div className="tags">
                <li><FaTags />Tags</li>
            </div>
            <ul>
            {/* {props.boxes.map((box, i) => {
            return (
                <li key={i} onClick={() => props.setSnippetFilter(`${box.name}`)}>
                {box.name}
                </li>
            );
            })} */}
            </ul>
        </>
    )
}

export default Tags;
