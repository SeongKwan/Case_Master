import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { observer, inject } from 'mobx-react';
import Loader from '../../../Loader/Loader';

const cx = classNames.bind(styles);

@inject('authStore')
@observer
class LoginForm extends Component {
    componentWillUnmount() {
        this.props.authStore.clearUserInfo();
    }

    _handleChange = (e) => {
        const { name, value } = e.target;
        this.props.authStore.changeInput(name, value);
    }

    _handleClick = () => {
        const { authStore, authStore: {userInfo: {email, password}}} = this.props;
        if (email === null || password === null) {
            return window.alert('이메일 또는 비밀번호를 입력해주세요')
        }
        return authStore.login({email, password});
    }

    _handleKeyDown = (e) => {
        const { keyCode } = e;
        const { authStore, authStore: {userInfo: {email, password}}} = this.props;
        if (keyCode === 13) {
            if (email === null || email === '' || password === null || password === '') {
                return window.alert('이메일 또는 비밀번호를 입력해주세요')
            }
            return authStore.login({email, password});
        }
    }

    render() {
        const { isLoading } = this.props.authStore;
        if (isLoading) {
            return <div className={cx('LoginForm', "loading")}>
                    <Loader />
                </div>
        }
        return (
            <div className={cx('LoginForm')}>
                <input 
                    name="email" 
                    type="text" 
                    placeholder="이메일"
                    onChange={this._handleChange}
                    onKeyDown={this._handleKeyDown}
                />
                <div className={cx('login-pw-box')}>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="비밀번호"
                        onChange={this._handleChange}
                        onKeyDown={this._handleKeyDown}
                    />
                    <a href="/login">비밀번호찾기<span>&nbsp;</span></a>
                </div>
                <button 
                    className={cx('login-login-button')} 
                    onClick={this._handleClick}
                    onKeyDown={this._handleKeyDown}
                >
                    로그인
                </button>
                <div className={cx('login-signup-link')}>
                    <p>계정이 없으신가요? <a href="/login">회원가입<span>&nbsp;</span></a></p>
                </div>
            </div>
        );
    }
}

export default LoginForm;