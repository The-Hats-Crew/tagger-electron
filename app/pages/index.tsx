import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TopBar from '../components/topbar/TopBar';
import Sidebar from '../components/sidebar/Sidebar';
import Pagination from "../components/pagination/Pagination";
import EmailList from "../components/emailList/EmailList";
import EmailSection from "../components/emailSection/EmailSection";
import Compose from "../components/compose/Compose";
import AnalyticsBar from "../components/analytics/Analytics";
import ProgressBar from "../components/progressBar";
import { checkNewMail, setLastUid, getEmails, setCurrentCount, setTotalCount } from "../actions";
import "../styles/index.global.scss";
import { useHistory } from 'react-router';
const io = require("socket.io-client");

const Index = (props) => {
  const [composer, setComposer] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    let emailInterval;
    const numMinutes = 10;
    if (!props.isChecking) {
      console.log("SETTING EMAIL INTERVAL")
      emailInterval = setInterval(setupBackgroundTimers(numMinutes), 1000 * 60 * numMinutes);
    }
    const socket = io("http://localhost:3001");

    socket.on("total_count", totalCount => {
      props.setTotalCount(totalCount);
    })

    socket.on("current_count", currentCount => {
      props.setCurrentCount(currentCount);
    })


    return () => clearInterval(emailInterval)
  }, [])


  useEffect(() => {
    let checkingEmailsInterval;
    if (!props.isChecking) {
      console.log('HERREEEEE', props.label, props.pageNum, props.isSearch)
      props.getEmails(props.label, props.pageNum, props.isSearch)
      clearInterval(checkingEmailsInterval);
    } else {
      checkingEmailsInterval = setInterval(() => {
        props.getEmails(props.label, props.pageNum, props.isSearch)
      }, 2000)

    }
    //eslint-disable-next-line
    return () => clearInterval(checkingEmailsInterval);
  }, [props.label, props.isChecking])

  // useEffect(() => {
  //   console.log(props.failed);
  //   if (props.failed) {
  //   }
  // }, [props.failed])

  function setupBackgroundTimers(numMinutes) {
    const token = localStorage.getItem("token");
    if (token && !props.isChecking) {
      props.checkNewMail(props.lastUid, token)
      // update after 1 second, then every 10 minutes
      console.log(`Started props.checkForNewMail every ${numMinutes} minutes`);
    } else {
      push("/login")
    }
  }

  return (
    <>
      <TopBar />
      <main>
        <Sidebar setComposer={setComposer} />
        <Pagination />
        <div className={props.isViewEmail ? 'email-list-min' : 'email-list'}> {/* className="email-list-min" or email-list for full width */}
          <EmailList setComposer={setComposer} />
        </div>
        {props.isViewEmail && (
          <div className="email-body" id={props.analyticsBar ? 'email-body-analytics' : null}> {/* add the id="email-body-analytics" for analytics column */}
            <EmailSection />
          </div>
        )}
        {props.analyticsBar ? <AnalyticsBar /> : null}
      </main>
      {composer && <Compose setComposer={setComposer} />}
    </>
  )
}

const mapStateToProps = ({ analyticsbar, viewEmail, operation, inbox }) => ({
  analyticsBar: analyticsbar.analyticsbar,
  isViewEmail: viewEmail.displayEmailSection,
  failed: operation.failed,
  isChecking: operation.isChecking,
  lastUid: operation.lastUid,
  label: inbox.label,
})

export default connect(mapStateToProps, { checkNewMail, setLastUid, getEmails, setCurrentCount, setTotalCount })(Index);
