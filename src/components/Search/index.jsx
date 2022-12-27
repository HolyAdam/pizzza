import React from 'react'
import styles from './Search.module.scss'
import searchSvg from '../../assets/img/search.svg'
import closeSvg from '../../assets/img/close.svg'


export const Search = ({ searchVal, setSearchVal }) => {
	return (
		<div className={styles.root}>
			<img className={styles.search} src={searchSvg} alt="Search" />
			<input className={styles.input} type="text" placeholder="Поиск пиццы" value={searchVal} onChange={e => setSearchVal(e.target.value)} />
			{ searchVal && <img onClick={() => setSearchVal('')} className={styles.close} src={closeSvg} alt="Close" /> }
		</div>
	)
}
