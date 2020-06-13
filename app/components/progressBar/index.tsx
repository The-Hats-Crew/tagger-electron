import React from 'react';
import {connect} from "react-redux";
import { Line } from "rc-progress";

export const Index = (props) => {
  return (
    <Line style={{position: 'fixed', bottom: "20px"}} percent={(props.currentCount/props.totalCount) * 100} strokeWidth="4" strokeColor="#D3D3D3" />
  )
}

const mapStateToProps = ({progress}) => {
  return {
    totalCount: progress.totalCount,
    currentCount: progress.currentCount
  }
}

export default connect(mapStateToProps)(Index);
