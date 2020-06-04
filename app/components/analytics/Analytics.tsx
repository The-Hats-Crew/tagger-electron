import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAnalyticsBar } from '../../actions';
import { FaUserCircle, FaTimesCircle } from "react-icons/fa";

export const Analytics = props => {

   const closeAnalytics = () => {
        props.setAnalyticsBar(false)
   }

   const sentWidth = (props.sentEmails / props.totalEmails) * 100 + '%';
   const receivedWidth = (props.receivedEmails / props.totalEmails) * 100 + '%';

    return (
        <div className="analytics-bar">
            <FaTimesCircle className= "analytics-bar-close btn" onClick={closeAnalytics}/>

            <div className= "analytics-avatar col">
            <FaUserCircle className="analytics-bar-avatar"/>
            <h3>{props.address}</h3>
            <h2>{props.name}</h2>
            {/* maps over over the everyone it was sent to. prevously it was done mapping over a to object */}

            </div>

            <div className="analytics-body">

              <p>Total messages</p>
              <div id="total_emails" style={{width:"100%"}} className='barwidth'>
                <span className="num">{props.totalEmails}</span>
              </div>

             <p>Sent messages</p>
             <div id="sent_emails" style={{width:sentWidth}} className='barwidth'>
                <span className="num">{props.sentEmails}</span>
              </div>

             <p>Recieved messages</p>
             <div id="received_emails" style={{width:receivedWidth}} className='barwidth'>
                <span className="num">{props.receivedEmails}</span>
              </div>

            </div>

        </div>
    );
};

const mapStateToProps = ({analyticsbar, viewEmail}) => ({

  totalEmails:analyticsbar.totalEmails,
  sentEmails:analyticsbar.sentEmails,
  receivedEmails:analyticsbar.receivedEmails,
  address:analyticsbar.address,
  name:analyticsbar.name,
  viewemail: viewEmail.viewemail
})

export default connect(mapStateToProps,{setAnalyticsBar})(Analytics);
