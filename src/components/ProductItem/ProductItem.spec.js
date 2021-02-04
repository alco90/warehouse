import React from "react";
import { shallow } from "enzyme";
import Product from "../Product/Product";
import ProductItem from "./ProductItem";
import {Button} from "@material-ui/core";

const setup = (product) => {
  const actions = {
    onSellClicked: jest.fn(),
  };

  const component = shallow(
    <ProductItem
      prod_id="1"
      product={product}
      inventory={[
        {
          art_id: "1",
          name: "leg",
          stock: "10",
        },
        {
          art_id: "2",
          name: "screw",
          stock: "5",
        },
      ]}
      contain_articles={[
        {
          "art_id": "1",
          "amount_of": "9"
        },
        {
          "art_id": "2",
          "amount_of": "4"
        },
      ]}
      {...actions}
    />
  );

  return {
    component: component,
    actions: actions,
    button: component.find(Button),
    product: component.find(Product),
  };
};

let productProps;

describe("ProductItem component", () => {
  beforeEach(() => {
    productProps = {
      prod_id: "1",
      name: "Product 1",
      quantity: 6,
      contain_articles: [],
    };
  });

  it("should render product", () => {
    const { product } = setup(productProps);
    expect(product.props()).toEqual({
      name: "Product 1",
      quantity: 6,
    });
  });

  it("should not disable button", () => {
    const { button } = setup(productProps);
    // enabled because has inventory
    expect(button.prop("disabled")).toEqual(false);
    expect(button.text()).toMatch(/^Sell product/);
  });

  it("should call action on buttons click", () => {
    const { button, actions } = setup(productProps);
    button.simulate("click");
    expect(actions.onSellClicked).toBeCalled();
  });

  describe("when product stock is 0", () => {
    beforeEach(() => {
      productProps.quantity = 0;
      productProps.contain_articles = [
        {
          "art_id": "1",
          "amount_of": "100"
        },
        {
          "art_id": "2",
          "amount_of": "200"
        },
      ];
    });

    it("should render No Inventory message", () => {
      const { button } = setup(productProps);
      expect(button.text()).toMatch(/^No Inventory/);
    });

    it("should disable remove action button", () => {
      const { button } = setup(productProps);
      expect(button.prop("disabled")).toEqual(true);
    });
  });
});
