import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getEmails, setLabel, closeEmail, resetSearch, setAnalyticsBar, setSliding, checkNewMail } from '../../actions';
import { FaInbox, FaFolderOpen, FaEnvelope } from 'react-icons/fa';

export const Folders = props => {
  const {push} = useHistory();

  const setFilter = (folder) => {
    props.resetSearch()
    props.closeEmail()
    props.setLabel(folder)
    props.setAnalyticsBar(false);
    props.setSliding(false);
  }

  useEffect(() => {
    const numMinutes = 10;
    const emailInterval = setInterval(setupBackgroundTimers(numMinutes), 1000 * 60 * numMinutes);
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
      }, 1000)

    }
    //eslint-disable-next-line
    return () => clearInterval(checkingEmailsInterval);
  }, [props.label, props.isChecking])

  useEffect(() => {
    if (props.lastUid) {
      props.checkNewMail(props.lastUid);
    }
  }, [props.lastUid])

  function setupBackgroundTimers(numMinutes) {
    const token = localStorage.getItem("token");
    if (token) {
      props.checkNewMail(props.lastUid, token)
      // update after 1 second, then every 10 minutes
      console.log(`Started props.checkForNewMail every ${numMinutes} minutes`);
    } else {
      push("/login")
    }
  }

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

const mapStateToProps = ({ inbox, operation }) => ({
  label: inbox.label,
  pageNum: inbox.pageNum,
  isSearch: inbox.isSearch,
  isChecking: operation.isChecking,
  failed: operation.failed,
  lastUid: inbox.lastUid
})

export default connect(mapStateToProps, { getEmails, closeEmail, setLabel, resetSearch, setAnalyticsBar, setSliding, checkNewMail })(Folders);
