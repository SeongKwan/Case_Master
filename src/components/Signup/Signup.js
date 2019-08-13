import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { observer, inject } from 'mobx-react';
import Loader from '../Loader/Loader';
import Layout from '../Layout';

const cx = classNames.bind(styles);

@withRouter
@inject('commonStore', 'authStore')
@observer
class Signup extends Component {
    componentWillUnmount() {
        this.props.authStore.clearSignup();
    }

    _handleChange = (e) => {
        const { name, value } = e.target;
        this.props.authStore.changeInputSignup(name, value);
    }

    _handleClick = () => {
        const { authStore, authStore: {signupInfo: {email, password}}} = this.props;
        if (email === null) {
            return window.alert('이메일을 입력해주세요')
        }
        if (password === null) {
            return window.alert('비밀번호를 입력해주세요')
        }
        if (email === null && password === null) {
            return window.alert('이메일과 비밀번호를 입력해주세요')
        }
        return authStore.signup({email, password})
            .then((response) => {
                this.props.history.push('/login');
            })
            .catch(error => {
                alert(error.data.message);
            });
    }

    _handleKeyDown = (e) => {
        const { keyCode } = e;
        const { authStore, authStore: {signupInfo: {email, password}}} = this.props;
        if (keyCode === 13) {
            if (email === null || email === '' || password === null || password === '') {
                return window.alert('이메일 또는 비밀번호를 입력해주세요')
            }
            return authStore.signup({email, password})
                .then((response) => {
                    this.props.history.push('/login');
                })
                .catch(error => {
                    alert(error.data.message);
                });
        }
    }
    render() {
        const { isLoading, isLogged } = this.props.authStore;
        if (isLoading || isLogged) {
            return <Layout where="signup" headerBack>
                <div className={cx('Signup', "loading")}>
                    <Loader />
                </div>
            </Layout>
        }
        return (
            <Layout where="signup" headerBack>
                <div className={cx('Signup')}>
                    <h1>회원등록</h1>
                    <div className={cx('description')}>
                        <p>Case Editor의 계정정보를 입력하여 주세요.</p>
                        <span>(Case Editor의 회원가입 필수)</span>
                    </div>
                    <div className={cx('form-box')}>
                        <input 
                            autoFocus
                            name="email" 
                            type="text" 
                            placeholder="이메일"
                            onChange={this._handleChange}
                            onKeyDown={this._handleKeyDown}
                        />
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="비밀번호"
                            onChange={this._handleChange}
                            onKeyDown={this._handleKeyDown}
                        />
                    </div>
                    <button 
                        className={cx('signup-button')} 
                        onClick={this._handleClick}
                        onKeyDown={this._handleKeyDown}
                    >
                        회원등록신청
                    </button>
                </div>
            </Layout>
        );
    }
}

export default Signup;