import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';

import { sortNames } from '../components/Sort';

import {
  setCategoryId,
  setPage,
  setFilters,
  selectFilter,
  selectSearch,
} from '../store/slices/filter.slice';

import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import {
  fetchPizzas,
  selectPizzas,
} from '../store/slices/pizzas.slice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {
    categoryId,
    sort,
    currentPage,
    searchValue: search,
  } = useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzas);

  const onCategoryChange = (i) => {
    dispatch(setCategoryId(i));
  };

  const onChangePage = (number) => {
    dispatch(setPage(number));
  };

  const getPizzas = async () => {
    const sortInReq = `sortBy=${sort.sortType.replace('-', '')}`;

    const categoryInReq =
      categoryId > 0 ? `&category=${categoryId}` : '';

    const order = sort.sortType.includes('-') ? 'desc' : 'asc';

    const searchInReq = search ? `&search=${search}` : '';

    dispatch(
      fetchPizzas({
        sortInReq,
        categoryInReq,
        order,
        searchInReq,
        currentPage,
      }),
    );
  };

  // const [categoryId, setCategoryId] = React.useState(0);
  // const [currentPage, setCurrentPage] = React.useState(1);

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sort.sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortType, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortNames.find(
        (obj) => obj.sortType === params.sortType,
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortType, search, currentPage]);

  const pizzasRender = items.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeleton = [...new Array(9)].map((_, i) => (
    <Skeleton key={i} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setValue={onCategoryChange} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не получилось отобразить пиццы. Попробуйте
            еще раз
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeleton : pizzasRender}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Home;
