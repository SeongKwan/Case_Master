import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseDetail.module.scss';
import { observer, inject } from 'mobx-react';
import BasicInfo from './components/BasicInfo';
import Comment from './components/Comment';
import Layout from '../Layout';
import { TiEye } from "react-icons/ti";
import { FiHash } from "react-icons/fi";
import { FaNotesMedical } from "react-icons/fa";
import { TiDocumentAdd } from "react-icons/ti";
import { MdQuestionAnswer } from "react-icons/md";

const cx = classNames.bind(styles);

@inject()
@observer
class CaseDetail extends Component {
    render() {
        return (
            <Layout>
                <main className={cx('CaseDetail')}>
                    <div className={cx('status-bar')}>
                        <div className={cx('case-id')}>
                            <span><FiHash /></span>1234
                        </div>
                        <div className={cx('view-count')}>
                            <span><TiEye /></span>28
                        </div>
                        <div className={cx('comment-count')}>
                            <span><FaNotesMedical /></span>7
                        </div>
                    </div>
                    <ul className={cx('tab-header-list')}>
                        <div className={cx('divider-horizontal')}></div>
                        <li className={cx('tab-header-item', '')}>기본정보<span>&nbsp;</span></li>
                        <li className={cx('tab-header-item', 'active')}>진단처방<span>&nbsp;</span></li>
                    </ul>
                    <div className={cx('tab-content')}>
                        <BasicInfo />
                        <Comment />
                    </div>
                </main>
                <div className={cx('requestInfo-addComment')}>
                    <div className={cx('requestInfo')}><MdQuestionAnswer /></div>
                    <div className={cx('addComment')}><TiDocumentAdd /></div>
                </div>
            </Layout>
        );
    }
}

export default CaseDetail;