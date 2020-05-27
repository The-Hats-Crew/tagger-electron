import React from 'react';
import { connect } from 'react-redux';
import { viewEmail, discard, setAnalyticsBarContact } from '../../actions';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

import ShowDate from '../../utils/ShowDate';

export const Card = props => {

    const setViewEmail = email => {
        props.setAnalyticsBarContact(email.from)
        props.viewEmail(email.id);
        props.discard();
    }

    return (
        // From or To defined by which folder in sidebar is selected
    <div className="snippet" onClick={() => {setViewEmail(props.email)}}>{/* () => setThreadContact() */}
        <div className="snippet-header row">
            {/* the onClick in here sets the analyticsContact to either who sent the email or who it was sent to depending on the snippetsFilter */}
            <FontAwesomeIcon icon={faUserCircle} />
            <div className="snippet-meta row">
                {/* This ternary checks whether to display who its from or who it was sent to depending on what snippetsFilter is set to */}
                <h3>
                    {/* {showContact()} */}{props.email.name}
                </h3>
                <time>
                    {ShowDate(props.email.date)}
                </time>
            </div>
        </div>
        <p className="snippet-subject">
            {props.email.subject}
        </p>
        <p className="snippet-message">
            {props.email.email_body_text}
        </p>
    </div>
    );
}

export default connect(null,{viewEmail,discard, setAnalyticsBarContact})(Card);
