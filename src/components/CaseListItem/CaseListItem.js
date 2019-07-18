import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseListItem.module.scss';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@withRouter
@inject()
@observer
class CaseListItem extends Component {
    handleClick = () => {
        this.props.history.push('/caseDetail/123');
    }

    render() {
        return (
            <li className={cx('CaseListItem')} onClick={this.handleClick}>
                <div className={cx('list-item-container')}>
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
                    <div className={cx('basic-info')}>
                        <div className={cx('gender')}>남</div>
                        <div className={cx('divider-vertical')}></div>
                        <div className={cx('age')}>22</div>
                    </div>
                    <div className={cx('symptom')}>
                        <div className={cx('title')}>증상</div>
                        <ul className={cx('symptom-list')}>
                            <li className={cx('symptom-item')}><span>&bull;&nbsp;</span>피로</li>
                            <li className={cx('symptom-item')}>&bull;&nbsp;두통</li>
                            <li className={cx('symptom-item')}>&bull;&nbsp;근육통</li>
                            <li className={cx('symptom-item')}>&bull;&nbsp;근육통</li>
                            <li className={cx('symptom-item')}>&bull;&nbsp;근육통</li>
                        </ul>
                    </div>
                </div>
            </li>
        );
    }
}

export default CaseListItem;