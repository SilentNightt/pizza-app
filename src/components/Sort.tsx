import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";

type SortItem = {
  name: string;
  sortProperty: string;
}

export const popup: SortItem[] = [
  { name: "рейтингу(убыв)", sortProperty: "rating" },
  { name: "рейтингу(возр)", sortProperty: "-rating" },
  { name: "цене(убыв)", sortProperty: "price" },
  { name: "цене(возр)", sortProperty: "-price" },
  { name: "алфавиту(убыв)", sortProperty: "title" },
  { name: "алфавиту(возр)", sortProperty: "-title" },
];


const Sort: React.FC = ( ) => {
  const dispatch = useAppDispatch();
  const sortValue = useSelector((state: any) => state.filterReducer.sort);
  const sortRef = React.useRef<HTMLDivElement>(null);



  const [visiblePopup, setVisiblePopup] = React.useState(false);

  const SetPopupList = (obj: SortItem) => {
    dispatch(setSort(obj as any));
    setVisiblePopup(false);
  };

  React.useEffect(() => {
    const handlerEventListener = (event: MouseEvent) => {
      // Переопределяю тип переменной для исключения ошибки в handlerEventListener
      const _event = event as MouseEvent & {
          composedPath: () => EventTarget[];
      }
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setVisiblePopup(false);
      }
    };
    document.body.addEventListener("click", handlerEventListener);

    // Удаляю слушатель события в тот момент, когда ухожу с этой страницы (пофикшен баг с размножениеем слушателей события)
    return () => {
      document.body.removeEventListener("click", handlerEventListener);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setVisiblePopup(!visiblePopup);
          }}
        >
          {sortValue.name}
        </span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {popup.map((obj, i) => (
              <li
                key={i}
                className={
                  sortValue.sortProperty === obj.sortProperty ? "active" : ""
                }
                onClick={() => SetPopupList(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
