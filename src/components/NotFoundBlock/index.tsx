import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        😞 <br />
        Ничего не найдено
      </h1>
      <p className={styles.descr}>
        Данная страница отсутствует в нашем магазине. Проверьте
        корректность
      </p>
    </div>
  );
};

export default NotFoundBlock;
