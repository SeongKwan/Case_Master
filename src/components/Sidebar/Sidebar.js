import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { observer, inject } from 'mobx-react';
import Close from '../../styles/img/close-white.png';

const cx = classNames.bind(styles);

@inject()
@observer
class Sidebar extends Component {
    render() {
        return (
            <aside className={cx('Sidebar')}>
                <span className={cx('close-icon')}>
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
                            <span className={cx('sidebar-icon')}>&</span>
                            <span className={cx('item-name')}>나의정보</span>
                        </li>
                        <li className={cx('my-page')}>
                            <span className={cx('sidebar-icon')}>#</span>
                            <span className={cx('item-name')}>정보요청관리</span>
                        </li>
                        <li className={cx('my-page')}>
                            <span className={cx('sidebar-icon')}>%</span>
                            <span className={cx('item-name')}>로그아웃</span>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
}

export default Sidebar;