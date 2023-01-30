import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  addItem,
  selectCartItemById,
} from '../../store/slices/cart.slice';

import { CartItem } from '../../store/slices/cart.slice';

type PizzaBlockProps = {
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  id: string;
  category: number;
  rating: number;
  imageUrl: string;
};

const namingTypes = ['тонкое', 'традиционное'];

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  title,
  price,
  types,
  sizes,
  id,
  category,
  rating,
  imageUrl,
}) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const dispatch = useDispatch();

  const ourObj = useSelector(selectCartItemById(id));

  const addedCount = ourObj ? ourObj.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      title,
      price,
      imageUrl,
      id,
      type: namingTypes[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={'/pizza/' + id}>
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">
          {title || 'Неизвестно'}
        </h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li
              key={i}
              className={activeType === i ? 'active' : ''}
              // bad case, лучше ссылаться на одну функцию
              onClick={() => setActiveType(i)}>
              {namingTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              className={activeSize === i ? 'active' : ''}
              onClick={() => setActiveSize(i)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price || 0} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={onClickAdd}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
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
  );
};
