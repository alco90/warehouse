import React from "react";
import InventoryContainer from "./InventoryContainer";
import ProductsContainer from "./ProductsContainer";

const App = () => (
  <div>
    <h2>Warehouse</h2>
    <hr />
    <InventoryContainer />
    <hr />
    <ProductsContainer />
  </div>
);

export default App;
