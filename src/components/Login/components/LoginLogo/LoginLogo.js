import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginLogo.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

class LoginLogo extends Component {
    render() {
        return (
            <div className={cx('LoginLogo')}>
                <h1>
                    <Link to='/'>Case Master</Link>
                </h1>
            </div>
        );
    }
}

export default LoginLogo;