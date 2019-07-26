import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import LoginLogo from './components/LoginLogo';
import LoginForm from './components/LoginForm';

const cx = classNames.bind(styles);

@withRouter
@inject()
@observer
class Login extends Component {
    render() {
        return (
            <div className={cx('Login')}>
                <div className={cx('login-flex-box')}>
                    <LoginLogo />
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default Login;