import warehouse from "../api/warehouse";
import {
  RECEIVE_INVENTORY,
  RECEIVE_PRODUCTS,
  ADD_STOCK,
  REMOVE_STOCK,
  SELL_PRODUCT,
} from "../constants/ActionTypes";

export const getInventory = () => (dispatch) => {
  warehouse.getInventory((inventory) => {
    dispatch({
      type: RECEIVE_INVENTORY,
      inventory: inventory.map((article) => {
        return {
          ...article,
          stock: isNaN(Number(article.stock)) ? 0 : Number(article.stock),
        };
      }),
    });
  });
};

export const getAllProducts = () => (dispatch) => {
  warehouse.getProducts((products) => {
    dispatch({
      type: RECEIVE_PRODUCTS,
      products: products.map((product, index) => {
        return {
          ...product,
          prod_id: `${index + 1}`,
          quantity: 0,
        };
      }),
    });
  });
};

export const addStock = (data) => (dispatch) => {
  dispatch({
    ...data,
    type: ADD_STOCK,
  });
};

export const removeStock = (data) => (dispatch, getState) => {
  if (getState().inventory.byId[data.art_id].stock > 0) {
    dispatch({
      ...data,
      type: REMOVE_STOCK,
    });
  }
};

export const sellProduct = (prod_id) => (dispatch, getState) => {
  const { contain_articles } = getState().products.byId[prod_id];

  contain_articles.forEach(({ art_id, amount_of }) => {
    dispatch({
      type: REMOVE_STOCK,
      art_id: art_id,
      num: amount_of,
    });
  });

  dispatch({
    type: SELL_PRODUCT,
    prod_id,
  });
};
