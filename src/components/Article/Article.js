import React from "react";
import PropTypes from "prop-types";

import cardStyles from "../../constants/cardStyles";
import ExtensionIcon from '@material-ui/icons/Extension';
import Badge from '@material-ui/core/Badge';
import Typography from "@material-ui/core/Typography";

const defaultProps = {
    color: 'secondary',
    children: <ExtensionIcon />,
};

const Article = ({ name, stock }) => (
  <div>
    <Badge
      max={999}
      badgeContent={Number(stock) ? stock : 0}
      {...defaultProps}
    />
    <Typography className={cardStyles.title} color="textSecondary" gutterBottom>
      {name}
    </Typography>
  </div>
);
Article.propTypes = {
  quantity: PropTypes.number,
  name: PropTypes.string,
};

export default Article;
