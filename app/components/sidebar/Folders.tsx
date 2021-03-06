import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getEmails, setLabel, closeEmail, resetSearch, setAnalyticsBar, setSliding, checkNewMail, setTotalCount, setCurrentCount } from '../../actions';
import { FaInbox, FaFolderOpen, FaEnvelope } from 'react-icons/fa';
// const io = require("socket.io-client");

export const Folders = props => {
  // const { push } = useHistory();
  const setFilter = (folder) => {
    props.resetSearch()
    props.closeEmail()
    props.setLabel(folder)
    props.setAnalyticsBar(false);
    props.setSliding(false);

  }

  // useEffect(() => {
  //   let emailInterval;
  //   const numMinutes = 10;
  //   if (!props.isChecking) {
  //     console.log("SETTING EMAIL INTERVAL")
  //     emailInterval = setInterval(setupBackgroundTimers(numMinutes), 1000 * 60 * numMinutes);
  //   }
  //   const socket = io("http://localhost:3001");

  //   socket.on("total_count", totalCount => {
  //     props.setTotalCount(totalCount);
  //   })

  //   socket.on("current_count", currentCount => {
  //     props.setCurrentCount(currentCount);
  //   })


  //   return () => clearInterval(emailInterval)
  // }, [])


  // useEffect(() => {
  //   let checkingEmailsInterval;
  //   if (!props.isChecking) {
  //     console.log('HERREEEEE', props.label, props.pageNum, props.isSearch)
  //     props.getEmails(props.label, props.pageNum, props.isSearch)
  //     clearInterval(checkingEmailsInterval);
  //   } else {
  //     checkingEmailsInterval = setInterval(() => {
  //       props.getEmails(props.label, props.pageNum, props.isSearch)
  //     }, 1000)

  //   }
  //   //eslint-disable-next-line
  //   return () => clearInterval(checkingEmailsInterval);
  // }, [props.label, props.isChecking])

  // useEffect(() => {
  //   console.log(props.failed);
  //   if (props.failed) {
  //     localStorage.removeItem("token");
  //     push('/login')
  //   }
  // }, [props.failed])

  // function setupBackgroundTimers(numMinutes) {
  //   const token = localStorage.getItem("token");
  //   if (token && !props.isChecking) {
  //     props.checkNewMail(props.lastUid, token)
  //     // update after 1 second, then every 10 minutes
  //     console.log(`Started props.checkForNewMail every ${numMinutes} minutes`);
  //   } else {
  //     push("/login")
  //   }
  // }

  return (
    <nav>
      {/* this onClick sets the snippets to filter email by received */}
      <li onClick={() => setFilter("inbox")}><FaInbox />Inbox</li>
      {/* this onClick sets the snippets to filter email by sent */}
      <li onClick={() => setFilter('sent')}><FaEnvelope />Sent</li>
      {/* this onClick sets the snippets to filter email by drafts */}
      <li onClick={() => setFilter('draft')}><FaFolderOpen />Draft</li>
    </nav>
  )
}

const mapStateToProps = ({ inbox, operation, progress }) => ({
  label: inbox.label,
  pageNum: inbox.pageNum,
  isSearch: inbox.isSearch,
  isChecking: operation.isChecking,
  failed: operation.failed,
  lastUid: inbox.lastUid,
  totalCount: progress.totalCount,
  currentCount: progress.currentCount
})

export default connect(mapStateToProps, { getEmails, closeEmail, setLabel, resetSearch, setAnalyticsBar, setSliding, checkNewMail, setTotalCount, setCurrentCount })(Folders);
