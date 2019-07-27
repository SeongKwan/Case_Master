import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import { observer, inject } from 'mobx-react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Modal from '../Modal';
import { IoIosArrowUp } from 'react-icons/io';
import $ from 'jquery';

const cx = classNames.bind(styles);

@inject('sidebarStore', 'commonStore', 'customModalStore')
@observer
class Layout extends Component {
    componentDidMount() {
        const { location } = this.props;
        if (location === 'main' || location === 'search') {
            return $(window).on('scroll', () => {
                if ( $( window ).scrollTop() > 200 ) {
                    $( '#scrollToTop' ).fadeIn();
                } else {
                    $( '#scrollToTop' ).fadeOut();
                }
            })
        }
        return false;
    }
    handleClickOnCoverLayer = () => {
        const { sidebarStore, commonStore, customModalStore } = this.props;
        if (sidebarStore.isOpen) {
            sidebarStore.setIsClose();
        } else if (customModalStore.isOpenModal) {
            customModalStore.closeModal();
        }
        commonStore.uncoverApp();
    }
    handleClickOnScrollToTop = () => {
        $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
        return false;
    }
    componentWillUnmount() {
        const { sidebarStore, commonStore, customModalStore } = this.props;
        sidebarStore.clearIsOpen();
        commonStore.clearCover();
        customModalStore.clear();
    }
    
    render() {
        const { isOpen } = this.props.sidebarStore;
        const { cover } = this.props.commonStore;
        const { isOpenModal, content, registry } = this.props.customModalStore;
        const { children, location } = this.props;
        let showTopButton = (location === 'search' || location === 'main') ? true : false;
        return (
            <>
                <div 
                    id="cover-app-layer"
                    className={cx("cover-app-layer", {cover: cover})}
                    onClick={this.handleClickOnCoverLayer}
                ></div>
                <Header type={location} />
                <Modal 
                    content={content} 
                    isOpenModal={isOpenModal} 
                    data={registry}
                />
                <Sidebar isOpen={isOpen} />
                {
                    showTopButton &&
                    <div 
                        id="scrollToTop" 
                        className={cx("scrollToTop")} 
                        onClick={this.handleClickOnScrollToTop}>
                        <span>
                            <IoIosArrowUp />
                        </span>
                    </div>
                }
                <div className={cx('main-container')}>
                    {children}
                </div>
            </>
        );
    }
}

export default Layout;