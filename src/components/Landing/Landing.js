import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Landing extends Component {
    render() {
        return (
            <div className={cx('Landing')}>
                <h1>Case Master</h1>
                <Link to='/login'>시작하기</Link>
            </div>
        );
    }
}

export default Landing;