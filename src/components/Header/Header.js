import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { observer, inject } from 'mobx-react';
import Hamburger from '../../styles/img/hamburger-white.png';
import SearchIcon from '../../styles/img/search-white.png';
import Back from '../../styles/img/back-white.png';
import { IoMdHome } from "react-icons/io";

const cx = classNames.bind(styles);

@inject('sidebarStore', 'commonStore')
@observer
class Header extends Component {
    handleClickOnMenu = () => {
        const { handleClickOnBack, back } = this.props;
        // On Menu Icon State
        if (!back) {
            this.props.sidebarStore.setIsOpen();
            this.props.commonStore.coverApp();
        } else {
            handleClickOnBack();
        }
        return;
    }

    render() {
        const { back, type } = this.props;
        let switchIcon = !back ? Hamburger : Back;
        return (
            <header className={cx('Header')}>
                <div className={cx('header-flex-box', {search: type==='search'}, {create: type === 'create-comment' || type === 'create-question'})}>
                    { 
                        type !== 'search' && <span onClick={this.handleClickOnMenu}><img src={switchIcon} alt="Header Menu Icon"/></span>
                    }
                    { 
                        type === 'search' && <span className={cx('home-button')}><Link to='/main'><IoMdHome /></Link></span>
                    }
                    { 
                        !back && type !== 'search' && <Link to='/main' className={cx('logo')}>Case Master</Link> 
                    }
                    {
                        type === 'search' &&
                        <div className={cx('search-bar')}>
                            <input className={cx('search-bar-input')} type="text"/>
                            <span><img src={SearchIcon} alt="Search icon search bar"/></span>
                        </div>
                    }
                    { 
                        !back && type !== 'search' && <Link to='/search'><img src={SearchIcon} alt="Header Search Icon"/></Link> 
                    }
                    {
                        (back && type === 'create-comment') && <h1 className={cx('create-comment-title')} >진단 및 처방 작성</h1>
                    }
                    {
                        (back && type === 'create-question') && <h1 className={cx('create-question-title')} >질문 작성</h1>
                    }
                </div>
            </header>
        );
    }
}

export default Header;