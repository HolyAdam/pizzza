import React from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';

import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeSort, setActiveSort] = React.useState({
    name: 'популярности (возр.)',
    sortType: 'rating',
  });
  const [categoryId, setCategoryId] = React.useState(0);

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const sortInReq = `sortBy=${activeSort.sortType.replace(
      '-',
      '',
    )}`;

    const categoryInReq =
      categoryId > 0 ? `&category=${categoryId}` : '';

    const order = activeSort.sortType.includes('-') ? 'desc' : 'asc';

    setIsLoading(true);
    fetch(
      `https://63669f9bf5f549f052c9fd91.mockapi.io/pizzas?${sortInReq}${categoryInReq}&order=${order}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setPizzas(data);
          setIsLoading(false);
        }, 750);
      });
  }, [categoryId, activeSort.sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setValue={setCategoryId} />
        <Sort value={activeSort} setValue={setActiveSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
      </div>
    </div>
  );
};

export default Home;
