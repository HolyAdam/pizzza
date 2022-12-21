import React from 'react';

export function Categories() {
  const [active, setActive] = React.useState(0);

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
      setActive(i);
    };
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            className={active === i ? 'active' : ''}
            onClick={onClickCategory(i)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
