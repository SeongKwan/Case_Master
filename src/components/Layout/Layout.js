import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import { observer, inject } from 'mobx-react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Modal from '../Modal';
// import Bottom from '../Bottom/Bottom';

const cx = classNames.bind(styles);

@inject('sidebarStore', 'commonStore', 'customModalStore')
@observer
class Layout extends Component {
    handleClickOnCoverLayer = () => {
        const { sidebarStore, commonStore, customModalStore } = this.props;
        if (sidebarStore.isOpen) {
            sidebarStore.setIsClose();
        } else if (customModalStore.isOpenModal) {
            customModalStore.closeModal();
        }
        commonStore.uncoverApp();
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
        const { isOpenModal, content } = this.props.customModalStore;
        const { children } = this.props;
        return (
            <>
                <div 
                    id="cover-app-layer"
                    className={cx("cover-app-layer", {cover: cover})}
                    onClick={this.handleClickOnCoverLayer}
                ></div>
                <Header />
                <Modal content={content} isOpenModal={isOpenModal} />
                <Sidebar isOpen={isOpen} />
                <div className={cx('main-container')}>
                    {children}
                </div>
                {/* <Bottom /> */}
            </>
        );
    }
}

export default Layout;