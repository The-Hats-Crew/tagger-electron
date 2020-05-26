import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEmails, setLabel, closeEmail, resetSearch, setAnalyticsBar, setSliding, checkNewMail } from '../../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faFolderOpen,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Folders = props => {

  const setFilter = (folder) => {
    props.resetSearch()
    props.closeEmail()
    props.setLabel(folder)
    props.setAnalyticsBar(false);
    props.setSliding(false);
  }

  useEffect(() => {
    if(!props.isChecking){
      console.log('HERREEEEE', props.label, props.pageNum, props.isSearch)
      props.getEmails(props.label, props.pageNum, props.isSearch)
    }
    //eslint-disable-next-line
  }, [props.label, props.isChecking])

  useEffect(() => {
    if(props.lastUid){
      props.checkNewMail(props.lastUid);
    }
  }, [props.lastUid])

  return (
    <nav>
      {/* this onClick sets the snippets to filter email by received */}
      <li onClick={() => setFilter("inbox")}><FontAwesomeIcon icon={faInbox} />Inbox</li>
      {/* this onClick sets the snippets to filter email by sent */}
      <li onClick={() => setFilter('sent')}><FontAwesomeIcon icon={faEnvelope} />Sent</li>
      {/* this onClick sets the snippets to filter email by drafts */}
      <li onClick={() => setFilter('draft')}><FontAwesomeIcon icon={faFolderOpen} />Draft</li>
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
