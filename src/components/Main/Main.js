import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import { observer, inject } from 'mobx-react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import MainCaseList from './components/MainCaseList';

const cx = classNames.bind(styles);

@inject()
@observer
class Main extends Component {
    render() {
        return (
            <>
                <div className={cx("cover-app-layer")}></div>
                <Header />
                {/* <Sidebar /> */}
                <main className={cx('Main')}>
                    <section className={cx('catchphrase-box')}>
                        <p>다양한 증례와 처방을<br/>만나보세요</p>
                    </section>
                    <MainCaseList />
                </main>
            </>
        );
    }
}

export default Main;