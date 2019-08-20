import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './MyComment.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';

const cx = classNames.bind(styles);

@inject()
@observer
class MyComment extends Component {
    render() {
        const { cases } = this.props;
        const username = window.localStorage.getItem('username');
        if (cases.caseWithMyComment === undefined) {
            return <div style={{display: 'none'}}>loading...</div>
        }
        if (cases.caseWithMyComment.length === 0) {
            return <div className={cx('MyComment')}>
                <div className={cx('empty-case-list')}>
                    <p>
                        {`현재 작성된 "${username}" 님의 처방이 없습니다`}
                    </p>
                </div>
            </div>
        }
        return (
            <div className={cx('MyComment')}>
                {
                    cases.caseWithMyComment.map((Case, i) => {
                        return <CaseListItem type="MyComment" item={Case} key={i} />
                    })
                }
            </div>
        );
    }
}

export default MyComment;