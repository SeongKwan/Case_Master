import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { observer, inject } from 'mobx-react';
import SearchCaseList from './components/SearchCaseList';
import Layout from '../Layout';
import { FaCaretDown } from 'react-icons/fa';
const cx = classNames.bind(styles);

@inject('searchStore', 'caseStore')
@observer
class Search extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleClickOnFilter = async (e) => {
        const { filter } = this.props.searchStore;
        const { dataset } = e.target
        if (filter !== dataset.filter) {
            await this.props.searchStore.setFilter(dataset.filter);
            await this.props.searchStore.clearForSearch();
            await this.props.searchStore.searchCases();
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
                            {active: filter === 'date'})}>등록일<span data-filter="date"><FaCaretDown/></span></li>
                            <li onClick={this.handleClickOnFilter} data-filter="view" className={cx('sort-item', {active: filter === 'view'})}>조회수<span data-filter="view"><FaCaretDown/></span></li>
                            <li onClick={this.handleClickOnFilter} data-filter="comment" className={cx('sort-item', {active: filter === 'comment'})}>처방수<span data-filter="comment"><FaCaretDown/></span></li>
                        </ul>
                    </div>
                    <SearchCaseList />
                </div>
            </Layout>
        );
    }
}

export default Search;