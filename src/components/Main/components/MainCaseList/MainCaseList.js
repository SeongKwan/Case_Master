import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './MainCaseList.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';

const cx = classNames.bind(styles);

@inject()
@observer
class MainCaseList extends Component {
    render() {
        return (
            <section className={cx('MainCaseList')}>
                <ul className={cx('tab-header-list')}>
                    <div className={cx('divider-horizontal')}></div>
                    <li className={cx('tab-header-item', 'active')}>최근증례<span>&nbsp;</span></li>
                    <li className={cx('tab-header-item')}>나의증례<span>&nbsp;</span></li>
                    <li className={cx('tab-header-item')}>나의처방<span>&nbsp;</span></li>
                </ul>
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
            </section>
        );
    }
}

export default MainCaseList;