import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchCaseList.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';

const cx = classNames.bind(styles);

@inject('caseStore')
@observer
class SearchCaseList extends Component {
    componentDidMount() {
        this.props.caseStore.loadCases();        
    }
    render() {
        const { isLoading, updatedCases } = this.props.caseStore;

        if (isLoading) {
            return <div>Loading...</div>
        }
        return (
            <ul className={cx('SearchCaseList')}>
                {
                    updatedCases.map((Case, i) => {
                        return <CaseListItem item={Case} key={i} />
                    })
                }
            </ul>
        );
    }
}

export default SearchCaseList;