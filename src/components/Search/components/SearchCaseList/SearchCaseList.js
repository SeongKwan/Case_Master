import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchCaseList.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';

const cx = classNames.bind(styles);

@inject()
@observer
class SearchCaseList extends Component {
    render() {
        return (
            <ul className={cx('SearchCaseList')}>
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
            </ul>
        );
    }
}

export default SearchCaseList;