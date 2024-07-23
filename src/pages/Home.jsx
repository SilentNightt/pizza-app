import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/Index";
import Skeleton from "../components/PizzaBlock/Skeleton";

function Home() {
  const [items, setItems] = React.useState([]);
  const [skeletonLoading, setSkeletonLoading] = React.useState(true);

  const [categoriesId, setCategoriesId] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    setSkeletonLoading(true);

    const category = categoriesId !== 0 ? `category=${categoriesId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const sortDirect = sortType.sortProperty.includes("-") ? "asc" : "desc";

    fetch(
      `https://669bb279276e45187d3636c3.mockapi.io/items?${category}&sortBy=${sortBy}&order=${sortDirect}`
    )
      .then((res) => {
        return res.json();
      })
      .then((array) => {
        setItems(array);
        setSkeletonLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoriesId, sortType]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoriesId}
          onClickCategory={(index) => {
            setCategoriesId(index);
          }}
        />
        <Sort
          sortValue={sortType}
          onClickValue={(index) => {
            setSortType(index);
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {skeletonLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}

export default Home;
