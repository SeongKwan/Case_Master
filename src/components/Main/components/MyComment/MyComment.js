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
        return (
            <div className={cx('MyComment')}>
                <CaseListItem />
                <CaseListItem />
                <CaseListItem />
            </div>
        );
    }
}

export default MyComment;