import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './UpdatedCase.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';

const cx = classNames.bind(styles);

@inject()
@observer
class UpdatedCase extends Component {
    render() {
        return (
            <div className={cx('UpdatedCase')}>
                <CaseListItem />
            </div>
        );
    }
}

export default UpdatedCase;