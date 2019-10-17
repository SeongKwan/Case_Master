import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseDetail.module.scss';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import BasicInfo from './components/BasicInfo';
// import Comment from './components/Comment';
import Question from './components/Question';
import Layout from '../Layout';
import { FaEye, FaClock } from "react-icons/fa";
import { FaNotesMedical } from "react-icons/fa";
import { TiDocumentAdd } from "react-icons/ti";
import { MdQuestionAnswer } from "react-icons/md";
import { IoIosArrowUp } from 'react-icons/io';
import Swiper from 'react-id-swiper';
import $ from 'jquery';
import Loader from '../Loader';
import mommentHelper from '../../util/momentHelper';

const cx = classNames.bind(styles);

@withRouter
@inject('swiperStore', 'caseStore', 'commentStore')
@observer
class CaseDetail extends Component {
    componentDidMount() {
        const { params: { caseid }  } = this.props.match;
        const { fromWhere } = this.props.caseStore;
        $(window).on('scroll', () => {
            if ( $( window ).scrollTop() > 200 ) {
                $( '#scrollToTop_case' ).fadeIn();
            } else {
                $( '#scrollToTop_case' ).fadeOut();
            }
        })
        if (fromWhere === 'questionCreate') {
            
        } else if (fromWhere === '') {
            window.scrollTo(0, 0);
        }
        this.props.caseStore.loadCase({caseid});
    }
    
    componentWillUnmount() {
        this.props.caseStore.clear();
        this.props.swiperStore.clear();
    }

    handleClickOnAddComment = () => {
        const { params: { caseid }  } = this.props.match;
        const userId = window.localStorage.getItem('userid');
        const { comments } = this.props.caseStore;
        let check = comments.filter(comment => comment.commenter_id === userId);
        if (check.length <= 0) {
            return this.props.history.push(`/create/comment/${caseid}`);
        }
        window.alert('이미 작성하신 처방이 있습니다.');
    }

    handleClickOnAddQuestion = () => {
        const { myCaseOrNot } = this.props.caseStore;
        const { params: { caseid }  } = this.props.match;
        if (!myCaseOrNot) return this.props.history.push(`/create/question/${caseid}`);
    }

    handleClickOnScrollToTop = () => {
        $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
        return false;
    }

    setCurrentSlideIndex = (event) => {
        const { dataset } = event.target;
        this.props.swiperStore.setCurrentSlide(dataset.id);
    }
    
    render() {
        // Slide Header
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
                        $( 'html, body' ).animate( { scrollTop : 0 }, 200 );
                    }
                }
            }
        };
        
        // Slide Contents
        const params2 = {
            slidesPerView: 1,
            loop: false,
            speed: 500,
            autoHeight: true,
            spaceBetween: 30,
            on: {
                slideChangeTransitionEnd: (e) => {
                    var thisComponent = this.props;
                    let changeSlide = function(index) {
                        return thisComponent.swiperStore.setCurrentSlide(index);
                    }
                    var n = this.swiper2.activeIndex;
                    changeSlide(n);
                    $( 'html, body' ).animate( { scrollTop : 0 }, 200 );
                    // if (this.swiper2 !== undefined) {
                    //     this.swiper1.slideTo(n, 500, false);
                    // }
                }
            }
        };
        
        const { activeTab } = this.props.swiperStore;
        const { theCase, isLoading, comments, myCaseOrNot, questions } = this.props.caseStore;
        const item = JSON.parse(JSON.stringify(theCase));

        if ( theCase.comments === undefined || isLoading) {
            return <Layout>
                <div className={cx('CaseDetail', 'loading')} role="main">
                    <Loader />
                </div>
            </Layout>
        }

        const countComments = item.comments.length;
        return (
            <Layout>
                <div className={cx('CaseDetail')} role="main">
                    <div className={cx('status-bar')}>
                        <div className={cx('created-date')}>
                            <span><FaClock /></span>{mommentHelper.getLocaleDateWithYYYY(theCase.createdDate) || 0}
                        </div>
                        <div className={cx('view-count')}>
                            <span><FaEye /></span>{theCase.views || 0}
                        </div>
                        <div className={cx('comment-count')}>
                            <span><FaNotesMedical /></span>{countComments || 0}
                        </div>
                    </div>
                    <div className={cx('tab-content')}>
                        <Swiper {...params1} getSwiper={(swiper) => {this.swiper1 = swiper;}}>
                            <li 
                                data-id='0'
                                className={cx('tab-header-item', {active: activeTab === 0})}
                                onClick={this.setCurrentSlideIndex}
                            >
                                기본정보
                            </li>
                            {/* <li 
                                data-id='1'
                                className={cx('tab-header-item', {active: activeTab === 1})}
                                onClick={this.setCurrentSlideIndex}
                            >
                                진단처방
                            </li> */}
                            <li 
                                data-id='1'
                                className={cx('tab-header-item', {active: activeTab === 1})}
                                onClick={this.setCurrentSlideIndex}
                            >
                                질의응답
                            </li>
                        </Swiper>
                        <Swiper {...params2} getSwiper={(swiper) => {this.swiper2 = swiper;}} activeSlideKey={activeTab.toString()}>
                            <div key='0'><BasicInfo Case={item.case} questions={questions} comments={comments} isLoading={isLoading} /></div>
                            {/* <div key='1'><Comment comments={comments} isLoading={isLoading} /></div> */}
                            <div key='1'><Question questions={questions} isLoading={isLoading} /></div>
                        </Swiper>
                    </div>
                </div>

                {/*****************/}
                {/**** Buttons ****/}
                {/*****************/}
                <div className={cx('requestInfo-addComment')}>
                    {
                        !myCaseOrNot &&
                        <div className={cx('requestInfo')} onClick={() => {this.handleClickOnAddQuestion()}}><MdQuestionAnswer /></div>
                    }
                    <div className={cx('addComment')} onClick={this.handleClickOnAddComment}><TiDocumentAdd /></div>
                    <div 
                        id="scrollToTop_case" 
                        className={cx("scrollToTop")} 
                        onClick={this.handleClickOnScrollToTop}>
                        <span>
                            <IoIosArrowUp />
                        </span>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default CaseDetail;