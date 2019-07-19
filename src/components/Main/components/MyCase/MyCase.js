import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './MyCase.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';

const cx = classNames.bind(styles);

@inject()
@observer
class MyCase extends Component {
    render() {
        return (
            <div className={cx('MyCase')}>
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
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
            </div>
        );
    }
}

export default MyCase;