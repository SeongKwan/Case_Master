import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchCaseList.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';
import Loader from '../../../Loader';

const cx = classNames.bind(styles);

@inject('caseStore', 'searchStore')
@observer
class SearchCaseList extends Component {
    state = {
        loadingState: false
    };
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.searchStore.searchCases();
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        this.props.searchStore.clear();
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = async () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const { hasMore, isLoading } = this.props.searchStore;
        // IE에서는 document.documentElement 를 사용.
        const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
        
        if (scrollHeight - innerHeight - scrollTop < 50) {
            if(hasMore) {
                if(!this.state.loadingState) {
                    if (!isLoading) {
                        await this.setState({ loadingState: true });
                        await this.props.searchStore.searchCases();
                    }
                }
            }
        } else {
            if (this.state.loadingState) {
                this.setState({ loadingState: false });
            }
        }
    }

    handleClickOnLoadMore = async () => {
        const { hasMore, isLoading } = this.props.searchStore;
        if(hasMore) {
            if (!isLoading) {
                await this.props.searchStore.searchCases();
            }
        }
    }

    render() {
        const { 
            hasMore,
            isLoading, 
            registry, 
            searchRegistry, 
            onSearching, 
            noResult 
        } = this.props.searchStore;
        
        return (
            <ul className={cx('SearchCaseList')}>
                {   !onSearching && !noResult &&
                    registry.map((Case, i) => {
                        return <CaseListItem type={'search'} item={Case} key={i} />
                    })
                }
                {   onSearching && !noResult &&
                    searchRegistry.map((Case, i) => {
                        return <CaseListItem type={'search'} item={Case} key={i} />
                    })
                }
                {
                    noResult && 
                    <div className={cx('no-result')}>검색결과가 없습니다</div>
                }
                {
                    (isLoading || this.props.searchStore.isLoading) && <div className={cx('SearchCaseList', 'loading')}>
                        <Loader />
                    </div>
                }
                {
                    !hasMore && !noResult && !isLoading &&
                    <div className={cx('no-more-load')}>마지막 증례입니다</div>
                }
                {
                    hasMore && !isLoading &&
                    <button className={cx('load-more-button')} onClick={this.handleClickOnLoadMore}>더보기...</button>
                }
            </ul>
        );
    }
}

export default SearchCaseList;