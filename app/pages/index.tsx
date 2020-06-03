import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TopBar from '../components/topbar/TopBar';
import Sidebar from '../components/sidebar/Sidebar';
import Pagination from "../components/pagination/Pagination";
import EmailList from "../components/emailList/EmailList";
import EmailSection from "../components/emailSection/EmailSection";
import Compose from "../components/compose/Compose";
import AnalyticsBar from "../components/analytics/Analytics";
import { checkNewMail, setLastUid } from "../actions";
import "../styles/index.global.scss";

const Index = (props) => {
  const [composer, setComposer] = useState(false);

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

const mapStateToProps = ({ analyticsbar, viewEmail }) => ({
  analyticsBar: analyticsbar.analyticsbar,
  isViewEmail: viewEmail.displayEmailSection
})

export default connect(mapStateToProps, { checkNewMail, setLastUid })(Index);
