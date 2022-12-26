import React from 'react';

export function Categories({ value, setValue }) {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const onClickCategory = (i) => {
    return () => {
      setValue(i);
    };
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            className={value === i ? 'active' : ''}
            onClick={onClickCategory(i)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
