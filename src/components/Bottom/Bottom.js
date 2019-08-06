import React, { Component } from 'react';
import styles from './Bottom.module.scss';
import classNames from 'classnames/bind';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject()
@observer
class Bottom extends Component {
    render() {
        return (
            <div className={cx('Bottom')}>
                Bottom
            </div>
        );
    }
}

export default Bottom;