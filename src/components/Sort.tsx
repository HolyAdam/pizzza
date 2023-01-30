import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSort,
  setSort,
  SortProperty,
  SortTypeEnum,
} from '../store/slices/filter.slice';

type SortItem = {
  name: string;
  sortType: SortTypeEnum;
};

type SortPopupT = {
  value: SortProperty;
};

export const sortNames: SortItem[] = [
  {
    name: 'популярности (возр.)',
    sortType: SortTypeEnum.RATING_DESC,
  },
  {
    name: 'популярности (убыв.)',
    sortType: SortTypeEnum.RATING_ASC,
  },
  {
    name: 'цене (возр.)',
    sortType: SortTypeEnum.PRICE_DESC,
  },
  {
    name: 'цене (убыв.)',
    sortType: SortTypeEnum.PRICE_ASC,
  },
  {
    name: 'алфавиту (возр.)',
    sortType: SortTypeEnum.TITLE_DESC,
  },
  {
    name: 'алфавиту (убыв.)',
    sortType: SortTypeEnum.TITLE_ASC,
  },
];

export const SortPopup: React.FC<SortPopupT> = React.memo(
  ({ value }) => {
    const dispatch = useDispatch();
    const sortRef = React.useRef<HTMLDivElement>(null);

    const [isVisible, setIsVisible] = React.useState(false);

    const onBtnClick = () => {
      setIsVisible(!isVisible);
    };

    const onClickSort = (obj: SortItem) => {
      dispatch(setSort(obj));
      setIsVisible(false);
    };

    React.useEffect(() => {
      const fn = (e: any) => {
        const pathDost =
          e.path || (e.composedPath && e.composedPath());
        const path = pathDost.includes(sortRef.current);
        if (!path) setIsVisible(false);
      };

      document.body.addEventListener('click', fn);

      return () => document.body.removeEventListener('click', fn);
    }, []);

    return (
      <div className="sort" ref={sortRef}>
        <div className="sort__label">
          <svg
            style={
              !isVisible
                ? {
                    transform: 'rotate(-180deg)',
                    transition: '0.1s ease-in',
                  }
                : {}
            }
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span onClick={onBtnClick}>{value.name}</span>
        </div>
        {isVisible && (
          <div className="sort__popup">
            <ul>
              {sortNames.map((obj, i) => (
                <li
                  key={i}
                  className={
                    value.sortType === obj.sortType ? 'active' : ''
                  }
                  onClick={() => onClickSort(obj)}>
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);
