import React from "react";
import PropTypes from "prop-types";
import Article from "../Article/Article";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Fab from "@material-ui/core/Fab";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import cardStyles from "../../constants/cardStyles";

const ArticleItem = ({ article, onAddStockClicked, onRemoveStockClicked }) => (
  <Card style={cardStyles}>
    <CardContent>
      <Article name={article.name} stock={article.stock} />
    </CardContent>
    <CardActions>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={onAddStockClicked}
      >
        <ExposurePlus1Icon />
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-label="del"
        onClick={onRemoveStockClicked}
        disabled={article.stock <= 0}
      >
        <ExposureNeg1Icon />
      </Fab>
    </CardActions>
  </Card>
);

ArticleItem.propTypes = {
  article: PropTypes.shape({
    art_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onAddStockClicked: PropTypes.func,
  onRemoveStockClicked: PropTypes.func,
};

export default ArticleItem;
