import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullSizePizza : React.FC = () => {
  const [pizza , setPizza] = React.useState<{
    title: string;
    imageUrl: string;
    price: number;
  }>();
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://669bb279276e45187d3636c3.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        alert("Ошибка загрузки пиццы");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загружаем пиццу...";
  }

  return (
    <div>
      <h1>{pizza.title}</h1>
      <img src={pizza.imageUrl} alt="Не подгрузилось ;(" />
      <p>от {pizza.price} ₽</p>
    </div>
  );
}

export default FullSizePizza;
