import React from "react";
import PropTypes from "prop-types";
import cardStyles from "../../constants/cardStyles";
import StyledBadge from "../../constants/badgeStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Product = ({ name, price, quantity }) => (
  <div>
    <IconButton aria-label="cart">
      <StyledBadge
        badgeContent={Number(quantity) ? quantity : 0}
        color="primary"
      >
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
    <Typography className={cardStyles.title} color="textSecondary" gutterBottom>
      {name}
    </Typography>
    <Typography className={cardStyles.price} color="textSecondary" gutterBottom>
      {price}
    </Typography>
  </div>
);

Product.propTypes = {
  quantity: PropTypes.number,
  price: PropTypes.string,
  name: PropTypes.string,
};

export default Product;
