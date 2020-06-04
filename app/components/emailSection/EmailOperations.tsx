import React from 'react';
import { connect } from 'react-redux';
import { setEmailOperation } from '../../actions';
import SimilarButton from './SimilarButton';
import {FaReply, FaReplyAll, FaTrashAlt, FaShare} from "react-icons/fa";

export const EmailOperations = props => {

  return (
      <>
      <SimilarButton />
      <FaReply
          onClick={() => {
            props.setEmailOperation('reply')
          }}
      />
      <FaReplyAll
          onClick={() => {
            props.setEmailOperation('replyall')
          }}
      />
      <FaShare
          onClick={() => {
            props.setEmailOperation('forward')
          }}
      />
      <FaTrashAlt
          onClick={() => {
            //setReplyIsHidden(false);
            // todo: need a delete email function that moves the email from emails array in imap to a deleted array so that it lives inside of "trash" before permanently deleting
          }}
      />
      </>
  )
}

export default connect(null,{setEmailOperation})(EmailOperations);
