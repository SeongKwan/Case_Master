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
        const { lastCaseId } = this.props.searchStore;
        if (lastCaseId === '') {
            // this.props.searchStore.searchCases();
            this.props.caseStore.loadCases({lastCaseId: ''});
        }
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        const { caseStore } = this.props;
        caseStore.clearRegistry();
        caseStore.clearLastCaseId();
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = async () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const { lastCaseId, hasMore, isLoading } = this.props.caseStore;
        // IE에서는 document.documentElement 를 사용.
        const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
        
        if (scrollHeight - innerHeight - scrollTop < 50) {
            if(hasMore) {
                if(!this.state.loadingState) {
                    if (!isLoading) {
                        await this.setState({ loadingState: true });
                        await this.props.caseStore.loadCases({lastCaseId});
                    }
                    // this.props.searchStore.searchCases();
                }
            }
        } else {
            if (this.state.loadingState) {
                this.setState({ loadingState: false });
            }
        }
    }

    render() {
        const { isLoading, registry, hasMore } = this.props.caseStore;
        return (
            <ul className={cx('SearchCaseList')}>
                {
                    registry.map((Case, i) => {
                        return <CaseListItem type={'search'} item={Case} key={i} />
                    })
                }
                {
                    isLoading && <div className={cx('SearchCaseList', 'loading')}>
                        <Loader />
                    </div>
                }
                {
                    !hasMore && <div className={cx('no-more-load')}>마지막 증례입니다</div>
                }
            </ul>
        );
    }
}

export default SearchCaseList;