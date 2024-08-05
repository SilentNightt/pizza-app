import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/Index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import axios from "axios";
import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

function Home() {
  const categoriesId = useSelector((state) => state.filterReducer.CategoriesId);
  const CurrentPage = useSelector((state) => state.filterReducer.currentPage);
  const sortType = useSelector(
    (state) => state.filterReducer.sort.sortProperty
  );

  const dispatch = useDispatch();
  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [skeletonLoading, setSkeletonLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    setSkeletonLoading(true);

    const category = categoriesId !== 0 ? `category=${categoriesId}` : "";
    const sortBy = sortType.replace("-", "");
    const sortDirect = sortType.includes("-") ? "asc" : "desc";

    axios
      .get(
        `https://669bb279276e45187d3636c3.mockapi.io/items?page=${CurrentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortDirect}`
      )
      .then((response) => {
        setItems(response.data);
        setSkeletonLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoriesId, sortType, CurrentPage]);

  const pizzas = items
    .filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoriesId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {skeletonLoading ? skeletons : pizzas}
      </div>
      <Pagination currentPage={CurrentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
