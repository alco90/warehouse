import React from 'react'
import PropTypes from 'prop-types'

const ItemList = ({ name, children }) => (
  <div>
    <h3>{name}</h3>
    <div>{children}</div>
  </div>
);

ItemList.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired
}

export default ItemList
