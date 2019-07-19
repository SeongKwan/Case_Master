import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject()
@observer
class LoginForm extends Component {
    render() {
        return (
            <div className={cx('LoginForm')}>
                <input type="text" placeholder="이메일"/>
                <div className={cx('login-pw-box')}>
                    <input type="password" placeholder="비밀번호"/>
                    <a href="/login">비밀번호찾기<span>&nbsp;</span></a>
                </div>
                <Link className={cx('login-login-button')} to="/main/updatedCase">로그인</Link>
                <div className={cx('login-signup-link')}>
                    <p>계정이 없으신가요? <a href="/login">회원가입<span>&nbsp;</span></a></p>
                </div>
            </div>
        );
    }
}

export default LoginForm;