import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { nextPage, prevPage, closeEmail } from '../../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export const Pagination = props => {

  const currentPage = props.pageNum;
  const lower = ((props.pageNum - 1) * 25) + 1;
  let higher = ((props.pageNum - 1) * 25) + 25;
  if (higher > props.totalCount) {
    higher = props.totalCount
  }
  const pageCount = Math.ceil(props.totalCount / 25)

  useEffect(() => {
    console.log(props.totalCount);
  }, [])

  const handlePrev = () => {
    if (currentPage > 1) {
      props.closeEmail()
      props.prevPage(props.label, currentPage - 1, props.isSearch)
    }
  }

  const handleNext = () => {
    console.log('HANDLE NEXT LABEL', props.label)
    if (currentPage < pageCount) {
      props.closeEmail()
      props.nextPage(props.label, currentPage + 1, props.isSearch)
    }
  }

  return (
    <div className="row pagination">
      <span>{lower}-{higher} of {props.totalCount}</span>
      <FontAwesomeIcon
        icon={faAngleLeft}
        className={currentPage === 1 ? 'inactive' : ""}
        id = "prev-btn"
        onClick={() => handlePrev()}
      />
      <FontAwesomeIcon
        icon={faAngleRight}
       className={currentPage === pageCount ? 'inactive' : ""}
       id = "next-btn"
        onClick={() => handleNext()}
      />
    </div>
  )
}

const mapStateToProps = ({ inbox }) => ({
  totalCount: inbox.totalCount,
  pageNum: inbox.pageNum,
  label: inbox.label,
  isSearch: inbox.isSearch
})

export default connect(mapStateToProps, { nextPage, prevPage, closeEmail })(Pagination);
