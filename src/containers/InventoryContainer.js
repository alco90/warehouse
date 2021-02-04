import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStock, removeStock } from "../actions";
import { getVisibleArticles } from "../reducers/inventory";
import ArticleItem from "../components/ArticleItem/ArticleItem";
import ItemList from "../components/ItemList/ItemList";

const InventoryContainer = ({ inventory, addStock, removeStock }) => (
  <ItemList name="Inventory">
    {inventory.map((article) => {
      return (
        <ArticleItem
          key={article.art_id}
          article={article}
          onAddStockClicked={() => addStock({ art_id: article.art_id})}
          onRemoveStockClicked={() => removeStock({ art_id: article.art_id})}
        />
      );
    })}
  </ItemList>
);

InventoryContainer.propTypes = {
  inventory: PropTypes.arrayOf(
    PropTypes.shape({
      art_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  addStock: PropTypes.func.isRequired,
  removeStock: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  inventory: getVisibleArticles(state.inventory),
});

export default connect(mapStateToProps, { addStock, removeStock })(
  InventoryContainer
);
