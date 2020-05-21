import React, { useEffect } from 'react';
import { makeHtmlSafe } from "../../utils/MessageHelper";

export const Single = props => {
    return (
        <div
            className="thread-message"
            dangerouslySetInnerHTML={{ __html: makeHtmlSafe(props.email_body) }}
        />
    )
}

export default Single;
