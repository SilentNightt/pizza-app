import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, CartItem, selectCartItemById } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const pizzaType = ["традиционная", "тонкая"];

type PizzaBlockProps = {
  id: string; 
  price: number; 
  title: string;
  imageUrl: string; 
  types: number[];
  sizes: number[];
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, price, title, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();
  // Из всего массива корзины вытаскиваем count, если он есть и рендерим его
  const cartItem = useSelector(selectCartItemById(id));
  const [valueType, setValueType] = React.useState(0);
  const [valueSize, setValueSize] = React.useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      price,
      title,
      imageUrl,
      type: pizzaType[valueType],
      size: sizes[valueSize],
      count: 0,
    };

    dispatch(addProduct(item));
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((bulVal) => (
              <li
                key={bulVal}
                className={valueType === bulVal ? "active" : ""}
                onClick={() => {
                  setValueType(bulVal);
                }}
              >
                {pizzaType[bulVal]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                className={valueSize === index ? "active" : ""}
                onClick={() => {
                  setValueSize(index);
                }}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
