import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchCaseList.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';
import Loader from '../../../Loader';

const cx = classNames.bind(styles);

@inject('caseStore')
@observer
class SearchCaseList extends Component {
    state = {
        loadingState: false
    };
    componentDidMount() {
        const { lastCaseId } = this.props.caseStore;
        if (lastCaseId === '') {
            this.props.caseStore.loadCases('');
        }
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        const { caseStore } = this.props;
        caseStore.clearRegistry();
        caseStore.clearLastCaseId();
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const { lastCaseId } = this.props.caseStore;
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        // IE에서는 document.documentElement 를 사용.
        const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
        
        if (scrollHeight - innerHeight - scrollTop === 0) {
            if(!this.state.loadingState) {
                this.setState({ loadingState: true });
                this.props.caseStore.loadCases(lastCaseId);
            }
        } else {
            if (this.state.loadingState) {
                this.setState({ loadingState: false });
            }
        }
    }

    render() {
        const { isLoading, registry } = this.props.caseStore;
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
            </ul>
        );
    }
}

export default SearchCaseList;