import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { observer, inject } from 'mobx-react';
import Close from '../../styles/img/close-white.png';
import { FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";

const cx = classNames.bind(styles);

@withRouter
@inject('sidebarStore')
@observer
class Sidebar extends Component {
    handleClickOnClose = () => {
        this.props.sidebarStore.toggleIsOpen();
    }
    handleClickOnLogout = () => {
        this.props.history.push('/');
    }
    render() {
        const { isOpen } = this.props;
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
                            <span className={cx('username')}>홍길동</span>
                            <span className={cx('title')}>&nbsp;원장님</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('flex-box-bottom')}>
                    <ul>
                        <li className={cx('my-page')}>
                            <span className={cx('sidebar-icon')}><FaUserTie /></span>
                            <span className={cx('item-name')}>나의정보</span>
                        </li>
                        <li className={cx('my-page')}>
                            <span className={cx('sidebar-icon')}><MdQuestionAnswer /></span>
                            <span className={cx('item-name')}>정보요청관리</span>
                        </li>
                        <li className={cx('my-page')} onClick={this.handleClickOnLogout}>
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