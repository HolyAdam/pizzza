import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
  value: number;
  setValue: (i: number) => void;
};

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, setValue }) => {
    // useWhyDidYouUpdate('Categories', { value, setValue });

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
  },
);
