import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './CommentDetail.module.scss';
import { observer, inject } from 'mobx-react';
import Header from '../../../Header';
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";

const cx = classNames.bind(styles);

@withRouter
@inject()
@observer
class CommentDetail extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    handleClickOnBack = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <>
                <Header back={true} handleClickOnBack={this.handleClickOnBack} />
                <div className={cx('CommentDetail')}>
                    <h6>
                        <div className={cx('divider-horizontal')}></div>
                        <span>진단-처방 상세화면</span>
                    </h6>
                    <div className={cx('detail-item-box', 'diagnosis-name')}>
                        <h6 className={cx('main-title')}>진단명</h6>
                        <ul>
                            <li>
                                <div className={cx('content')}>간기능이상</div>
                            </li>
                            <li>
                                <div className={cx('content')}>고혈압</div>
                            </li>
                            <li>
                                <div className={cx('content')}>당뇨</div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'diagnosis-rationale')}>
                        <h6 className={cx('main-title')}>진단근거</h6>
                        <ul>
                            <li>
                                <p className={cx('content')}>판단하는 근거는 .... Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nostrum necessitatibus ex reprehenderit sint ea cupiditate quo a consequuntur suscipit quod doloribus perspiciatis, odio assumenda rerum iure perferendis consectetur inventore?</p>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'diagnosis-reference')}>
                        <h6 className={cx('main-title')}>진단-참고문헌</h6>
                        <ul>
                            <li>
                                <div className={cx('content')}>
                                    <a href="https://naver.com" target="_blank" rel="noopener noreferrer">
                                        https://naver.com
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'drug-name')}>
                        <h6 className={cx('main-title')}>처방명</h6>
                        <ul>
                            <li>
                                <div className={cx('content')}>십전대보탕</div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'drug-formula')}>
                        <h6 className={cx('main-title')}>처방구성</h6>
                        <ul>
                            <li>
                                <div className={cx('name')}>약재명</div>
                                <div className={cx('herb-dose')}>
                                    <span className={cx('value')}></span>
                                    <span className={cx('unit')}>1첩-복용량</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('name')}>작약</div>
                                <div className={cx('herb-dose')}>
                                    <span className={cx('value')}>7</span>
                                    <span className={cx('unit')}>g/일</span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('name')}>감초</div>
                                <div className={cx('herb-dose')}>
                                    <span className={cx('value')}>7</span>
                                    <span className={cx('unit')}>g/일</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'drug-rationale')}>
                        <h6 className={cx('main-title')}>처방근거</h6>
                        <ul>
                            <li>
                                <p className={cx('content')}>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum natus eveniet debitis similique quasi eligendi sapiente, reiciendis officiis. Aliquid culpa fuga soluta illum atque sint possimus ad autem libero! Placeat.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'drug-reference')}>
                        <h6 className={cx('main-title')}>진단-참고문헌</h6>
                        <ul>
                            <li>
                                <div className={cx('content')}>
                                    <a href="https://naver.com" target="_blank" rel="noopener noreferrer">
                                        https://naver.com
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'teaching')}>
                        <h6 className={cx('main-title')}>환자지도</h6>
                        <ul>
                            <li>
                                <div className={cx('content')}>
                                    하루 30분 운동필수
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'like-box')}>
                        <p>도움이 되셨다면 눌러주세요^^</p>
                        <div className={cx('like')}>
                            <span className={cx('icon')}><FaRegThumbsUp /></span>
                            <span className={cx('count')}>11</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CommentDetail;