import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import { observer, inject } from 'mobx-react';
import MainCaseList from './components/MainCaseList';
import Layout from '../Layout';
const cx = classNames.bind(styles);

@inject('sidebarStore')
@observer
class Main extends Component {
    handleClickOnCoverLayer = () => {
        this.props.sidebarStore.setIsClose();
    }
    componentWillUnmount() {
        this.props.sidebarStore.clearIsOpen();
    }
    
    render() {
        return (
            <Layout where="main">
                <div role="main" className={cx('Main')}>
                    <section className={cx('catchphrase-box')}>
                        <p>다양한 증례와 처방을<br/>만나보세요</p>
                    </section>
                    <MainCaseList />
                </div>
            </Layout>
        );
    }
}

export default Main;