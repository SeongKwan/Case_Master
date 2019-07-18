import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseInfoCard.module.scss';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject()
@observer
class CaseInfoCard extends Component {
    render() {
        return (
            <div className={cx('CaseInfoCard')}>
                
            </div>
        );
    }
}

export default CaseInfoCard;