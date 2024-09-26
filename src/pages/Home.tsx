import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/Index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCategoriesId,
  selectCurrentPage,
  selectSearchValue,
  selectSortProprty,
  setCategoryId,
  setCurrentPage,
} from "../redux/slices/filterSlice";
import { fetchPizzaz } from "../redux/slices/pizzasSlice";

const Home: React.FC = () => {
  const categoriesId = useSelector(selectCategoriesId);
  const CurrentPage = useSelector(selectCurrentPage);
  const sortType = useSelector(selectSortProprty);
  const searchValue = useSelector(selectSearchValue);
  let { items, status } = useSelector((state: any) => state.pizzasReducer);

  const dispatch = useDispatch();

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizza = async () => {
    const category = categoriesId !== 0 ? `category=${categoriesId}` : "";
    const sortBy = sortType.replace("-", "");
    const sortDirect = sortType.includes("-") ? "asc" : "desc";

    dispatch(
      // @ts-ignore
      fetchPizzaz({
        category,
        sortBy,
        sortDirect,
        CurrentPage,
      })
    );

    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    getPizza();
  }, [categoriesId, sortType, CurrentPage]);

  const pizzas = items
    .filter((obj: any) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoriesId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            Возникла ошибка. Просим прощения, но нам не удалось получить питцы
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={CurrentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
