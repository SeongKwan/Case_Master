import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './MainCaseList.module.scss';
import { observer, inject } from 'mobx-react';
import Swiper1 from 'react-id-swiper';
import Swiper2 from 'react-id-swiper';
import UpdatedCase from '../UpdatedCase';
import MyCase from '../MyCase';
import MyComment from '../MyComment';
import $ from 'jquery';

const cx = classNames.bind(styles);

@inject('swiperStore')
@observer
class MainCaseList extends Component {
    componentWillUnmount() {
        this.props.swiperStore.clear();
    }
    setCurrentSlideIndex = (event) => {
        const { dataset } = event.target;
        this.props.swiperStore.setCurrentSlide(dataset.id);
    }
    render() {
        const params1 = {
            slidesPerView: 3,
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
            <section className={cx('MainCaseList')}>
                <Swiper1 {...params1} getSwiper={(swiper) => {this.swiper1 = swiper;}}>
                    <li 
                        data-id='0'
                        className={cx('tab-header-item', {active: activeTab === 0})}
                        onClick={this.setCurrentSlideIndex}
                    >
                        최근증례
                    </li>
                    <li 
                        data-id='1'
                        className={cx('tab-header-item', {active: activeTab === 1})}
                        onClick={this.setCurrentSlideIndex}
                    >
                        나의증례
                    </li>
                    <li 
                        data-id='2'
                        className={cx('tab-header-item', {active: activeTab === 2})}
                        onClick={this.setCurrentSlideIndex}
                    >
                        나의처방
                    </li>
                </Swiper1>
                <Swiper2 {...params2} getSwiper={(swiper) => {this.swiper2 = swiper;}}>
                    <div><UpdatedCase /></div>
                    <div><MyCase /></div>
                    <div><MyComment /></div>
                </Swiper2>
            </section>
        );
    }
}

export default MainCaseList;