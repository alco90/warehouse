import reducer, * as inventory from "./inventory";

describe("reducers", () => {
  describe("inventory", () => {
    let state;

    describe("when inventory are received", () => {
      beforeEach(() => {
        state = reducer(
          {},
          {
            type: "RECEIVE_INVENTORY",
            inventory: [
              {
                art_id: 1,
                name: "Article 1",
                stock: 2,
              },
              {
                art_id: 2,
                name: "Article 2",
                stock: 1,
              },
            ],
          }
        );
      });

      it("contains the inventory from the action", () => {
        expect(inventory.getArticle(state, 1)).toEqual({
          art_id: 1,
          name: "Article 1",
          stock: 2,
        });
        expect(inventory.getArticle(state, 2)).toEqual({
          art_id: 2,
          name: "Article 2",
          stock: 1,
        });
      });

      it("contains no other inventory", () => {
        expect(inventory.getArticle(state, 3)).toEqual(undefined);
      });

      it("contains no other inventory", () => {
        expect(inventory.getArticle(state, 3)).toEqual(undefined);
      });

      it("add stock to article", () => {
        const newState = reducer(state, {
          type: "ADD_STOCK",
          art_id: "1",
        });

        expect(inventory.getVisibleArticles(newState)).toEqual([
          {
            art_id: 1,
            name: "Article 1",
            stock: 3,
          },
          {
            art_id: 2,
            name: "Article 2",
            stock: 1,
          },
        ]);
      });

      it("remove stock to article", () => {
        const newState = reducer(state, {
          type: "REMOVE_STOCK",
          art_id: "1",
        });

        expect(inventory.getVisibleArticles(newState)).toEqual([
          {
            art_id: 1,
            name: "Article 1",
            stock: 1,
          },
          {
            art_id: 2,
            name: "Article 2",
            stock: 1,
          },
        ]);
      });

      it("default action returns inventory", () => {
        const newState = reducer(state, {
          type: "DEFAULT_ACTION",
          art_id: "1",
        });
        expect(inventory.getVisibleArticles(newState)).toEqual(
          inventory.getVisibleArticles(state)
        );
      });

      it("lists all of the inventory as visible", () => {
        expect(inventory.getVisibleArticles(state)).toEqual([
          {
            art_id: 1,
            name: "Article 1",
            stock: 2,
          },
          {
            art_id: 2,
            name: "Article 2",
            stock: 1,
          },
        ]);
      });
    });
  });
});
