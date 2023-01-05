import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';

import { setCategoryId } from '../store/slices/filter.slice';

import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { AppContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const onCategoryChange = (i) => {
    dispatch(setCategoryId(i));
  };

  const { searchVal: search } = React.useContext(AppContext);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const sortInReq = `sortBy=${sort.sortType.replace('-', '')}`;

    const categoryInReq = categoryId > 0 ? `&category=${categoryId}` : '';

    const order = sort.sortType.includes('-') ? 'desc' : 'asc';

    const searchInReq = search ? `&search=${search}` : '';

    setIsLoading(true);
    fetch(
      `https://63669f9bf5f549f052c9fd91.mockapi.io/pizzas?page=${currentPage}&limit=4&${sortInReq}${categoryInReq}&order=${order}${searchInReq}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setPizzas(data);
          setIsLoading(false);
        }, 750);
      });
  }, [categoryId, sort.sortType, search, currentPage]);

  const pizzasRender = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  const skeleton = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setValue={onCategoryChange} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeleton : pizzasRender.length > 0 ? pizzasRender : <h2>Ничего не нашлось</h2>}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
