import React from "react";
import { shallow } from "enzyme";
import Article from "../Article/Article";
import ArticleItem from "./ArticleItem";
import { Fab } from "@material-ui/core";

const setup = (article) => {
  const actions = {
    onAddStockClicked: jest.fn(),
    onRemoveStockClicked: jest.fn(),
  };

  const component = shallow(
    <ArticleItem art_id="1" article={article} {...actions} />
  );

  return {
    component: component,
    actions: actions,
    button: component.find(Fab),
    article: component.find(Article),
  };
};

let articleProps;

describe("ArticleItem component", () => {
  beforeEach(() => {
    articleProps = {
      art_id: "1",
      name: "Article 1",
      stock: 6,
    };
  });

  it("should render article", () => {
    const { article } = setup(articleProps);
    expect(article.props()).toEqual({
      name: "Article 1",
      stock: 6,
    });
  });

  it("should not disable button", () => {
    const { button } = setup(articleProps);
    // enabled always
    expect(button.at(0).prop("disabled")).toEqual(undefined);
    // enabled because stock is > 0
    expect(button.at(1).prop("disabled")).toEqual(false);
  });

  it("should call action on buttons click", () => {
    const { button, actions } = setup(articleProps);
    button.at(0).simulate("click");
    expect(actions.onAddStockClicked).toBeCalled();
    button.at(1).simulate("click");
    expect(actions.onRemoveStockClicked).toBeCalled();
  });

  describe("when article stock is 0", () => {
    beforeEach(() => {
      articleProps.stock = 0;
    });

    it("should disable button", () => {
      const { button } = setup(articleProps);
      expect(button.at(1).disabled).toEqual(undefined);
    });
  });
});
