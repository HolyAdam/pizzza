import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import searchSvg from '../../assets/img/search.svg';
import closeSvg from '../../assets/img/close.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../store/slices/filter.slice';

export const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [],
  );

  const onClickClear = (e: React.MouseEvent<HTMLImageElement>) => {
    updateSearchValue('');
    setValue('');
    inputRef.current?.focus();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.search} src={searchSvg} alt="Search" />
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы"
        value={value}
        ref={inputRef}
        onChange={onChangeInput}
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.close}
          src={closeSvg}
          alt="Close"
        />
      )}
    </div>
  );
};
