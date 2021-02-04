import { combineReducers } from "redux";
import { RECEIVE_PRODUCTS, SELL_PRODUCT } from "../constants/ActionTypes";

const products = (state, action) => {
  switch (action.type) {
    case SELL_PRODUCT:
      return {
        ...state,
        quantity: state.quantity + (Number(action.num) || 1),
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.prod_id] = product;
          return obj;
        }, {}),
      };
    default:
      const { prod_id } = action;
      if (prod_id) {
        return {
          ...state,
          [prod_id]: products(state[prod_id], action),
        };
      }
      return state;
  }
};

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(({ prod_id }) => prod_id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds,
});

export const getProduct = (state, id) => state.byId[id];

export const getVisibleProducts = (state) =>
  state.visibleIds.map((id) => getProduct(state, id));
