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
        const { cases } = this.props;
        const username = window.localStorage.getItem('username');
        if (cases.myCaseWithQuestion === undefined) {
            return <div style={{display: 'none'}}>loading...</div>
        }
        if (cases.myCaseWithQuestion.length === 0) {
            return <div className={cx('MyCase')}>
                <div className={cx('empty-case-list')}>
                    <p>
                        {`현재 등록된 "${username}" 님의 증례가 없습니다`}
                    </p>
                </div>
            </div>
        }
        return (
            <div className={cx('MyCase')}>
                {
                    cases.myCaseWithQuestion.map((Case, i) => {
                        return <CaseListItem type={'MyCase'} item={Case} key={i} />
                    })
                }
            </div>
        );
    }
}

export default MyCase;