import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseDetail.module.scss';
import { observer, inject } from 'mobx-react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import BasicInfo from './components/BasicInfo';
import Comment from './components/Comment';

const cx = classNames.bind(styles);

@inject()
@observer
class CaseDetail extends Component {
    render() {
        return (
            <>
                <div className={cx("cover-app-layer")}></div>
                <Header />
                {/* <Sidebar /> */}
                <main className={cx('CaseDetail')}>
                    <div className={cx('status-bar')}>
                        <div className={cx('case-id')}>
                            <span>#</span>1234
                        </div>
                        <div className={cx('view-count')}>
                            <span>@</span>28
                        </div>
                        <div className={cx('comment-count')}>
                            <span>%</span>7
                        </div>
                    </div>
                    <ul className={cx('tab-header-list')}>
                        <div className={cx('divider-horizontal')}></div>
                        <li className={cx('tab-header-item', '')}>기본정보<span>&nbsp;</span></li>
                        <li className={cx('tab-header-item', 'active')}>진단처방<span>&nbsp;</span></li>
                    </ul>
                    <div className={cx('tab-content')}>
                        <BasicInfo />
                        {/* <Comment /> */}
                    </div>
                </main>
            </>
        );
    }
}

export default CaseDetail;