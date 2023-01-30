import React from 'react';

type CategoriesProps = {
  value: number;
  setValue: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = ({
  value,
  setValue,
}) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const onClickCategory = (i: number) => {
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
};
