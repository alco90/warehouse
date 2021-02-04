import reducer, * as products from "./products";
import * as inventory from "./inventory";

describe("reducers", () => {
  describe("products", () => {
    let state;

    describe("when products are received", () => {
      beforeEach(() => {
        state = reducer(
          {},
          {
            type: "RECEIVE_PRODUCTS",
            products: [
              {
                prod_id: 1,
                name: "Product 1",
                quantity: 2,
              },
              {
                prod_id: 2,
                name: "Product 2",
                quantity: 1,
              },
            ],
          }
        );
      });

      it("contains the inventory from the action", () => {
        expect(products.getProduct(state, 1)).toEqual({
          prod_id: 1,
          name: "Product 1",
          quantity: 2,
        });
        expect(products.getProduct(state, 2)).toEqual({
          prod_id: 2,
          name: "Product 2",
          quantity: 1,
        });
      });

      it("sell product", () => {
        const newState = reducer(state, {
          type: "SELL_PRODUCT",
          prod_id: "1",
        });

        expect(products.getProduct(newState, 1)).toEqual({
          prod_id: 1,
          name: "Product 1",
          quantity: 3,
        });
      });

      it("sell product", () => {
        const newState = reducer(state, {
          type: "SELL_PRODUCT",
          prod_id: "1",
        });

        expect(products.getProduct(newState, 1)).toEqual({
          prod_id: 1,
          name: "Product 1",
          quantity: 3,
        });
      });

      it("default action returns inventory", () => {
        const newState = reducer(state, {
          type: "DEFAULT_ACTION",
          prod_id: "1",
        });

        expect(products.getVisibleProducts(newState)).toEqual(products.getVisibleProducts(state));
      });

      it("contains no other inventory", () => {
        expect(products.getProduct(state, 3)).toEqual(undefined);
      });

      it("lists all of the inventory as visible", () => {
        expect(products.getVisibleProducts(state)).toEqual([
          {
            prod_id: 1,
            name: "Product 1",
            quantity: 2,
          },
          {
            prod_id: 2,
            name: "Product 2",
            quantity: 1,
          },
        ]);
      });
    });
  });
});
