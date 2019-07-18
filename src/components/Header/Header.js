import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { observer, inject } from 'mobx-react';
import Hamburger from '../../styles/img/hamburger-white.png';
import SearchIcon from '../../styles/img/search-white.png';
import Back from '../../styles/img/back-white.png';

const cx = classNames.bind(styles);

@inject()
@observer
class Header extends Component {
    render() {
        const back = this.props.back;
        let switchIcon = !back ? Hamburger : Back;
        return (
            <header className={cx('Header')}>
                <div className={cx('header-flex-box')}>
                    <span><img src={switchIcon} alt="Header Menu Icon"/></span>
                    { !back && <Link to='/search'><img src={SearchIcon} alt="Header Search Icon"/></Link> }
                </div>
            </header>
        );
    }
}

export default Header;