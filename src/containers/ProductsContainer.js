import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sellProduct } from "../actions";
import { getVisibleProducts } from "../reducers/products";
import ProductItem from "../components/ProductItem/ProductItem";
import ItemList from "../components/ItemList/ItemList";
import { getVisibleArticles } from "../reducers/inventory";

const ProductsContainer = ({ products, inventory, sellProduct }) => (
  <ItemList name="Products">
    {products.map((product) => {
      return (
        <ProductItem
          key={product.prod_id}
          product={product}
          inventory={inventory}
          onSellClicked={() => sellProduct(product.prod_id, inventory)}
        />
      );
    })}
  </ItemList>
);

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      prod_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  sellProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: getVisibleProducts(state.products),
  inventory: getVisibleArticles(state.inventory),
});

export default connect(mapStateToProps, { sellProduct })(
  ProductsContainer
);
