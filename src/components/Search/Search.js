import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { observer, inject } from 'mobx-react';
import SearchCaseList from './components/SearchCaseList';
import Layout from '../Layout';

const cx = classNames.bind(styles);

@inject()
@observer
class Search extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    render() {
        return (
            <Layout where={'search'}>
                <div role="main" className={cx('Search')}>
                    <div className={cx('sort')}>
                        <ul>
                            <li className={cx('sort-item', 'active')}>처방수<span>&uarr;</span></li>
                            <li className={cx('sort-item')}>조회수<span>&uarr;</span></li>
                            <li className={cx('sort-item')}>등록일<span>&uarr;</span></li>
                        </ul>
                    </div>
                    <SearchCaseList />
                </div>
            </Layout>
        );
    }
}

export default Search;