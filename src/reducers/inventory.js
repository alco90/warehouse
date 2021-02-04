import { combineReducers } from "redux";
import {
  RECEIVE_INVENTORY,
  ADD_STOCK,
  REMOVE_STOCK,
} from "../constants/ActionTypes";

const inventory = (state, action) => {
  switch (action.type) {
    case ADD_STOCK:
      return {
        ...state,
        stock: state.stock + (Number(action.num) || 1),
      };
    case REMOVE_STOCK:
      return {
        ...state,
        stock: Math.max(state.stock - (Number(action.num) || 1), 0),
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_INVENTORY:
      return {
        ...state,
        ...action.inventory.reduce((obj, article) => {
          obj[article.art_id] = article;
          return obj;
        }, {}),
      };
    default:
      const { art_id } = action;
      if (art_id) {
        return {
          ...state,
          [art_id]: inventory(state[art_id], action),
        };
      }
      return state;
  }
};

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_INVENTORY:
      return action.inventory.map((article) => article.art_id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds,
});

export const getArticle = (state, id) => state.byId[id];

export const getVisibleArticles = (state) =>
  state.visibleIds.map((id) => getArticle(state, id));
