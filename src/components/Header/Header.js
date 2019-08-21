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

@inject('sidebarStore', 'commonStore', 'searchStore')
@observer
class Header extends Component {
    componentWillUnmount() {
        this.props.searchStore.clear();
    }

    handleChangeSearchKeyword = (e) => {
        this.props.searchStore.changeSearchKeyword(e.target.value);
    }

    handleClickForSearch = async () => {
        const { searchKeyword } = this.props.searchStore;
        if (searchKeyword !== '') {
            await this.props.searchStore.clearForSearch();
            await this.props.searchStore.searching();
            await this.props.searchStore.searchCases();
        }
    }

    _handleKeyDown = (e) => {
        const { keyCode } = e;
        const { searchKeyword } = this.props.searchStore;
        if (keyCode === 13) {
            if (searchKeyword !== '') {
                this.props.searchStore.clearForSearch();
                this.props.searchStore.searching();
                this.props.searchStore.searchCases();
            }
        }
    }

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
        const { searchKeyword } = this.props.searchStore;
        let switchIcon = !back ? Hamburger : Back;
        return (
            <header className={cx('Header')}>
                <div className={cx('header-flex-box', {search: type==='search'}, {create: type === 'create-comment' || type === 'create-question'})}>
                    { 
                        type !== 'search' && <span className={cx('hamburger-menu-box')} onClick={this.handleClickOnMenu}><img src={switchIcon} alt="Header Menu Icon"/><span className={cx('count_unanswered')}>4</span></span>
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
                            <input value={searchKeyword} 
                                className={cx('search-bar-input')} 
                                placeholder="단어로 검색" 
                                type="text" 
                                onChange={this.handleChangeSearchKeyword} 
                                onKeyDown={this._handleKeyDown}
                                autoFocus
                            />
                            <span onClick={this.handleClickForSearch}><img src={SearchIcon} alt="Search icon search bar"/></span>
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