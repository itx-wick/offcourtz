import {UPDATE_ACTIVE_TAB} from './activeTab.types';

const initialState = {
  activeTab: 'Challenges',
};

export default function (state = initialState, action) {
  const {payload, type} = action;
  switch (type) {
    case UPDATE_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: payload,
      };
    }
    default:
      return state;
  }
}
