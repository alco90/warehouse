import React from "react";
import { shallow } from "enzyme";
import Product from "./Product";

const setup = (props) => {
  const component = shallow(<Product {...props} />);

  return {
    component: component,
  };
};

describe("Product component", () => {
  const name = "Test Product";
  const price = "5€";

  it("should render name and price", () => {
    const { component } = setup({ name, price });
    expect(component.text()).toEqual(`${name}${price}`);
  });

  describe("when given quantity", () => {
    it("should render name, price and stock", () => {
      const quantity = 6;
      const { component } = setup({ name, price, quantity });
      expect(component.text()).toEqual(`${name}${price}`);
    });
  });
});
