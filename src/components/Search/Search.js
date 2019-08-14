import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { observer, inject } from 'mobx-react';
import SearchCaseList from './components/SearchCaseList';
import Layout from '../Layout';

const cx = classNames.bind(styles);

@inject('searchStore')
@observer
class Search extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleClickOnFilter = (e) => {
        const { filter } = this.props.searchStore;
        const { dataset } = e.target
        if (filter !== dataset.filter) {
            this.props.searchStore.setFilter(dataset.filter);
            this.props.searchStore.searchCases();
        }
    }
    
    render() {
        const { filter } = this.props.searchStore;
        return (
            <Layout where={'search'}>
                <div role="main" className={cx('Search')}>
                    <div className={cx('sort')}>
                        <ul>
                            <li onClick={this.handleClickOnFilter} data-filter="date" className={cx('sort-item',
                            {active: filter === 'date'})}>등록일<span data-filter="date">&darr;</span></li>
                            <li onClick={this.handleClickOnFilter} data-filter="view" className={cx('sort-item', {active: filter === 'view'})}>조회수<span data-filter="view">&darr;</span></li>
                            <li onClick={this.handleClickOnFilter} data-filter="comment" className={cx('sort-item', {active: filter === 'comment'})}>처방수<span data-filter="comment">&darr;</span></li>
                        </ul>
                    </div>
                    <SearchCaseList />
                </div>
            </Layout>
        );
    }
}

export default Search;