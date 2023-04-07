import {UPDATE_ACTIVE_TAB} from './activeTab.types';

//Update Active Tab
export const updateActiveTabAction = data => dispatch => {
  dispatch({
    type: UPDATE_ACTIVE_TAB,
    payload: data,
  });
};
