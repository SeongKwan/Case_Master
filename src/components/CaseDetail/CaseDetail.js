import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseDetail.module.scss';
import { observer, inject } from 'mobx-react';
import BasicInfo from './components/BasicInfo';
import Comment from './components/Comment';
import Layout from '../Layout';
import { TiEye } from "react-icons/ti";
import { FiHash } from "react-icons/fi";
import { FaNotesMedical } from "react-icons/fa";
import { TiDocumentAdd } from "react-icons/ti";
import { MdQuestionAnswer } from "react-icons/md";
import Swiper from 'react-id-swiper';
import $ from 'jquery';

const cx = classNames.bind(styles);

@inject('swiperStore')
@observer
class CaseDetail extends Component {
    componentWillUnmount() {
        this.props.swiperStore.clear();
    }
    setCurrentSlideIndex = (event) => {
        const { dataset } = event.target;
        this.props.swiperStore.setCurrentSlide(dataset.id);
    }
    render() {
        const params1 = {
            slidesPerView: 2,
            paginationClickable: true,
            freeMode: false,
            loop: false,
            on: {
                tap: () => {
                    let swiper1 = this.swiper1;
                    let swiper2 = this.swiper2;
                    swiper1.slides.each(function (index, val) {
                        var ele = $(this);
                        ele.on("click", function () {swiper2.slideTo(index, 500, false);
                        });
                        //mySwiper.initialSlide=index;
                    });
                },
                slideChangeTransitionEnd: () => {
                    if (this.swiper1 !== undefined) {
                    }
                }
            }
        };
        
        const params2 = {
            slidesPerView: 1,
            loop: false,
            speed: 500,
            autoHeight: true,
            spaceBetween: 30,
            on: {
                slideChangeTransitionEnd: () => {
                    var thisComponent = this.props;
                    let changeSlide = function(index) {
                        return thisComponent.swiperStore.setCurrentSlide(index);
                    }
                    if (this.swiper2 !== undefined) {
                        var n = this.swiper2.activeIndex;
                        changeSlide(n);
                        this.swiper1.slideTo(n, 500, false);
                    }
                }
            }
        };
        const { activeTab } = this.props.swiperStore;
        return (
            <Layout>
                <main className={cx('CaseDetail')}>
                    <div className={cx('status-bar')}>
                        <div className={cx('case-id')}>
                            <span><FiHash /></span>1234
                        </div>
                        <div className={cx('view-count')}>
                            <span><TiEye /></span>28
                        </div>
                        <div className={cx('comment-count')}>
                            <span><FaNotesMedical /></span>7
                        </div>
                    </div>
                    {/* <ul className={cx('tab-header-list')}>
                        <div className={cx('divider-horizontal')}></div>
                        <li className={cx('tab-header-item', '')}>기본정보<span>&nbsp;</span></li>
                        <li className={cx('tab-header-item', 'active')}>진단처방<span>&nbsp;</span></li>
                    </ul> */}
                    <div className={cx('tab-content')}>
                        <Swiper {...params1} getSwiper={(swiper) => {this.swiper1 = swiper;}}>
                            <li 
                                data-id='0'
                                className={cx('tab-header-item', {active: activeTab === 0})}
                                onClick={this.setCurrentSlideIndex}
                            >
                                기본정보
                            </li>
                            <li 
                                data-id='1'
                                className={cx('tab-header-item', {active: activeTab === 1})}
                                onClick={this.setCurrentSlideIndex}
                            >
                                진단처방
                            </li>
                        </Swiper>
                        <Swiper {...params2} getSwiper={(swiper) => {this.swiper2 = swiper;}}>
                            <div><BasicInfo /></div>
                            <div><Comment /></div>
                        </Swiper>
                    </div>
                </main>
                <div className={cx('requestInfo-addComment')}>
                    <div className={cx('requestInfo')}><MdQuestionAnswer /></div>
                    <div className={cx('addComment')}><TiDocumentAdd /></div>
                </div>
            </Layout>
        );
    }
}

export default CaseDetail;