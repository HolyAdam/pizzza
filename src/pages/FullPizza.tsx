import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<null | {
    imageUrl: string;
    title: string;
    price: number;
  }>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://63669f9bf5f549f052c9fd91.mockapi.io/pizzas/' + id,
        );
        setPizza(data);
      } catch (e) {
        navigate('/');
      }
    })();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} руб.</h4>
    </div>
  );
};
