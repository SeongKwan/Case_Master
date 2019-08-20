import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { observer, inject } from 'mobx-react';
import Close from '../../styles/img/close-white.png';
import { FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";

const cx = classNames.bind(styles);

@withRouter
@inject('sidebarStore', 'commonStore', 'authStore')
@observer
class Sidebar extends Component {
    handleClickOnClose = () => {
        const { sidebarStore, commonStore } = this.props;
        sidebarStore.setIsClose();
        commonStore.uncoverApp();
    }
    handleClickOnLogout = () => {
        if (!window.confirm('로그아웃 하시겠습니까?')) return false;
        this.props.authStore.clear();
        setTimeout(() => {
            window.location.href = '/login';
        }, 0);
    }
    render() {
        const { isOpen } = this.props;
        const user_name = window.localStorage.getItem('username');
        return (
            <aside id='Sidebar' className={cx('Sidebar', { isOpen: isOpen })}>
                <span 
                    className={cx('close-icon')}
                    onClick={this.handleClickOnClose}
                >
                    <img src={Close} alt="close-icon-sidebar"/>
                </span>
                <div className={cx('flex-box-top')}>
                    <ul>
                        <li className={cx('service-title')}>
                            Case Master
                        </li>
                        <li className={cx('user')}>
                            <span className={cx('username')}>{user_name}</span>
                            <span className={cx('title')}>&nbsp;님, 안녕하세요.</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('flex-box-bottom')}>
                    <ul>
                        <li className={cx('my-page')}>
                            <Link to="/my-page">
                                <span className={cx('sidebar-icon')}><FaUserTie /></span>
                                <span className={cx('item-name')}>나의정보</span>
                            </Link>
                        </li>
                        <li className={cx('question-board')}>
                            <Link to="/question/board">
                                <span className={cx('sidebar-icon')}><MdQuestionAnswer /></span>
                                <span className={cx('item-name')}>질의응답관리</span>
                            </Link>
                        </li>
                        <li className={cx('logout')} onClick={this.handleClickOnLogout}>
                            <span className={cx('sidebar-icon')}><FaSignOutAlt /></span>
                            <span className={cx('item-name')}>로그아웃</span>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
}

export default Sidebar;