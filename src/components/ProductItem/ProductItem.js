import React from "react";
import PropTypes from "prop-types";
import Product from "../Product/Product";

// Material
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import cardStyles from "../../constants/cardStyles";

const ProductItem = ({ product, inventory, onSellClicked }) => {
  const disableSell = product.contain_articles.some(
    ({ art_id, amount_of }) =>
      Math.max(
        Number(
          (inventory.find((article) => article.art_id === art_id) || {}).stock
        ),
        0
      ) < amount_of
  );
  return (
    <Card style={cardStyles}>
      <CardContent>
        <Product
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={onSellClicked}
          disabled={disableSell}
        >
          {disableSell ? "No Inventory" : "Sell product"}
        </Button>
      </CardActions>
    </Card>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    prod_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  onSellClicked: PropTypes.func,
};

export default ProductItem;
