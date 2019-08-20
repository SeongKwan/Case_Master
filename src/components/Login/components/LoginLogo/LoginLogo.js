import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginLogo.module.scss';
import { Link } from 'react-router-dom';
import Logo from '../../../../styles/img/logo_main.png';

const cx = classNames.bind(styles);

class LoginLogo extends Component {
    render() {
        return (
            <div className={cx('LoginLogo')}>
                <h1>
                    <Link to='/'>
                        <span className={cx('cloudoc-logo')}>
                            <img src={Logo} alt="Cloudoc Logo"/>
                            <span>Powered by IML</span>
                        </span>
                        <span>Case Master</span>
                    </Link>
                </h1>
            </div>
        );
    }
}

export default LoginLogo;