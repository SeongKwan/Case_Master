import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import { observer, inject } from 'mobx-react';
import Header from '../Header';
import Sidebar from '../Sidebar';

const cx = classNames.bind(styles);

@inject('sidebarStore')
@observer
class Layout extends Component {
    handleClickOnCoverLayer = () => {
        this.props.sidebarStore.toggleIsOpen();
    }
    componentWillUnmount() {
        this.props.sidebarStore.clearIsOpen();
    }
    
    render() {
        const { isOpen } = this.props.sidebarStore;
        const { children } = this.props;
        return (
            <>
                <div 
                    id="cover-app-layer"
                    className={cx("cover-app-layer", {cover: isOpen})}
                    onClick={this.handleClickOnCoverLayer}
                ></div>
                <Header />
                <Sidebar isOpen={isOpen} />
                <div className={cx('main-container')}>
                    {children}
                </div>
            </>
        );
    }
}

export default Layout;