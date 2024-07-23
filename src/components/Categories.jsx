function Categories({ value, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
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
}

export default Categories;
