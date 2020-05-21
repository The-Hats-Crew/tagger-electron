import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import logger from "redux-logger";
import thunk from "redux-thunk";


import { inboxReducer } from "./inboxReducer";
import { composerReducer } from "./composerReducer";
import { sidebarReducer } from "./sidebarReducer";
import { analyticsBarReducer } from './analyticsBarReducer'; // added the anaylytics bar to the store. 
import { viewEmailReducer } from './viewEmailReducer';
import { setOperationReducer } from './emailOperationReducer';
import { searchKeyword } from './searchReducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    inbox: inboxReducer,
    composer: composerReducer,
    sidebar: sidebarReducer,
    analyticsbar: analyticsBarReducer, // this is the reducer i added.
    viewEmail:viewEmailReducer,
    operation:setOperationReducer,
    search:searchKeyword
  });
}
