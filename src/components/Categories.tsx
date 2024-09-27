import React from "react";
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  value: number;
  onClickCategory: (valur: number) => void; 
}

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  useWhyDidYouUpdate('Categories',{ value, onClickCategory })

  return (
    <div className="categories">
      <ul>
        {categories.map((categotuName, index) => (
          <li
            key={index}
            onClick={() => {
              onClickCategory(index);
            }}
            className={value === index ? "active" : ""}
          >
            {categotuName}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
