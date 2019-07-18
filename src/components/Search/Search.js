import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { observer, inject } from 'mobx-react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import SearchCaseList from './components/SearchCaseList';
import SearchIcon from '../../styles/img/search.png';

const cx = classNames.bind(styles);

@inject()
@observer
class Search extends Component {
    render() {
        return (
            <>
                <div className={cx("cover-app-layer")}></div>
                <Header />
                {/* <Sidebar /> */}
                <main className={cx('Search')}>
                    <div className={cx('search-bar')}>
                        <input className={cx('search-bar-input')} type="text"/>
                        <span><img src={SearchIcon} alt="Search icon search bar"/></span>
                    </div>
                    <div className={cx('sort')}>
                        <ul>
                            <li className={cx('sort-item', 'active')}>처방수<span>&uarr;</span></li>
                            <li className={cx('sort-item')}>조회수<span>&uarr;</span></li>
                            <li className={cx('sort-item')}>등록일<span>&uarr;</span></li>
                        </ul>
                    </div>
                    <SearchCaseList />
                </main>
            </>
        );
    }
}

export default Search;