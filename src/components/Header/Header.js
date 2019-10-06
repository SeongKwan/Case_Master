import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { observer, inject } from 'mobx-react';
import Hamburger from '../../styles/img/hamburger-white.png';
import SearchIcon from '../../styles/img/search-white.png';
import Back from '../../styles/img/back-white.png';
import brandLogo from '../../styles/img/logo_main.png';
import { IoMdHome } from "react-icons/io";
import { FiFilePlus } from "react-icons/fi";

const cx = classNames.bind(styles);

@inject('sidebarStore', 'commonStore', 'searchStore', 'authStore')
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
        if (searchKeyword === '') {
            await this.props.searchStore.clearForSearch();
            await this.props.searchStore.notSearching();
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
            if (searchKeyword === '') {
                this.props.searchStore.clearForSearch();
                this.props.searchStore.notSearching();
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

    _handleAddCase = () => {

    }

    render() {
        const { back, type } = this.props;
        const { searchKeyword } = this.props.searchStore;
        let switchIcon = !back ? Hamburger : Back;
        const {email, token, userId, username} = this.props.authStore.logOn;
        return (
            <header className={cx('Header')}>
                <div className={cx('header-flex-box', {search: type==='search'}, {create: type === 'create-comment' || type === 'create-question'})}>
                    <div className={cx('left')}>
                        { 
                            type !== 'search' && <span className={cx('hamburger-menu-box')} onClick={this.handleClickOnMenu}><img src={switchIcon} alt="Header Menu Icon"/></span>
                        }
                        {/* <span className={cx('count_unanswered')}>4</span> */}
                        { 
                            type === 'search' && <span className={cx('home-button')}><Link to='/main'><IoMdHome /></Link></span>
                        }
                    </div>
                    <div className={cx('center')}>
                        { 
                            !back && type !== 'search' && <Link to='/main' className={cx('logo')}>
                                <img
                                    className={cx('brand-logo')}
                                    alt="Cloudoc Logo"
                                    src={brandLogo}
                                />
                                Case Master
                            </Link> 
                        }
                    </div>
                    {/* <a href='http://cloudoc.net.s3-website.ap-northeast-2.amazonaws.com/cloudoc/case/create' className={cx('add-case')} onClick={this._handleAddCase}><FiFilePlus /></a> */}
                    <div className={cx('right')}>
                        {
                            type !== 'search' && !back && <a href={`http://localhost:3000/al?email=${email}&token=${token}&username=${username}&userId=${userId}`} target='_self' rel="noopener noreferrer" className={cx('add-case')} onClick={this._handleAddCase}><FiFilePlus /></a>
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
                </div>
            </header>
        );
    }
}

export default Header;