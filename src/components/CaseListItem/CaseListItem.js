import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseListItem.module.scss';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import { FiHash } from "react-icons/fi";
import { TiEye } from "react-icons/ti";
import { FaNotesMedical } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { TiDocumentAdd } from "react-icons/ti";

const cx = classNames.bind(styles);

@withRouter
@inject()
@observer
class CaseListItem extends Component {
    handleClick = (_id) => {
        let caseid = _id; 
        this.props.history.push(`/caseDetail/${caseid}`);
    }

    render() {
        const { type } = this.props;
        const {
            _id,
            case: {
                patient,
                record,
                // user_id
            }
        } = JSON.parse(JSON.stringify(this.props.item))
        let updatedRecordIndex = record.length - 1;
        let updatedSymptom = record[updatedRecordIndex].symptom;

        return (
            <li className={cx('CaseListItem')}>
                <div className={cx('list-item-container')} onClick={() => {this.handleClick(_id)}}>
                    <div className={cx('status-bar')}>
                        {/* <div className={cx('case-id')}>
                            <span><FiHash /></span>{_id}
                        </div> */}
                        <div className={cx('view-count')}>
                            <span><TiEye /></span>28
                        </div>
                        <div className={cx('comment-count')}>
                            <span><FaNotesMedical /></span>7
                        </div>
                    </div>
                    <div className={cx('basic-info')}>
                        <div className={cx('gender')}>{patient.gender}</div>
                        <div className={cx('divider-vertical')}></div>
                        <div className={cx('age')}>{patient.age}</div>
                    </div>
                    <div className={cx('symptom')}>
                        <div className={cx('title')}>증상</div>
                        <ul className={cx('symptom-list')}>
                            {
                                updatedSymptom.map((symptom, i) => {
                                    return <li key={i} className={cx('symptom-item')}>&bull;&nbsp;{symptom.name}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                {
                    type === "MyCase" &&
                    <ul className={cx('myCase-question-list')}>
                        <li className={cx('question')}>
                            <div className={cx('question-status', {answered: true})}>
                                <div className={cx('number')}>#1</div>
                                <div className={cx('date')}>2019-07-27</div>
                                <div className={cx('user')}>질문자: 토니</div>
                                <div className={cx('status')}>답변완료</div>
                            </div>
                            <div className={cx('question-content')}>
                                질문 내용... Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, officia?
                            </div>
                        </li>
                        <li className={cx('question')}>
                            <div className={cx('question-status', {answered: false})}>
                                <div className={cx('number')}>#2</div>
                                <div className={cx('date')}>2019-07-28</div>
                                <div className={cx('user')}>질문자: 토르</div>
                                <div className={cx('status')}>미답변</div>
                            </div>
                            <div className={cx('question-content')}>
                                질문 내용... Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, officia?
                            </div>
                        </li>
                        <li className={cx('question')}>
                            <div className={cx('question-status', {answered: true})}>
                                <div className={cx('number')}>#3</div>
                                <div className={cx('date')}>2019-07-27</div>
                                <div className={cx('user')}>질문자: 토니</div>
                                <div className={cx('status')}>답변완료</div>
                            </div>
                            <div className={cx('question-content')}>
                                질문 내용... Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, officia?
                            </div>
                        </li>
                    </ul>
                }
                {
                    type === "MyComment" &&
                    <div className={cx('myComment-drug')}>
                        <div className={cx('drug-name')}>
                            <div className={cx('icon')}><span><TiDocumentAdd /></span></div>
                            <div className={cx('name')}>십전대보탕</div>
                        </div>
                        <div className={cx('drug-formula')}>
                            <ul>
                                <li>
                                    <div className={cx('herb')}>약초명1</div>
                                    <div className={cx('dose')}>용량 g/일</div>
                                </li>
                                <li>
                                    <div className={cx('herb')}>약초명2</div>
                                    <div className={cx('dose')}>용량 g/일</div>
                                </li>
                                <li>
                                    <div className={cx('herb')}>약초명3</div>
                                    <div className={cx('dose')}>용량 g/일</div>
                                </li>
                                <li>
                                    <div className={cx('herb')}>약초명3</div>
                                    <div className={cx('dose')}>용량 g/일</div>
                                </li>
                                <li>
                                    <div className={cx('herb')}>약초명3</div>
                                    <div className={cx('dose')}>용량 g/일</div>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('like-container')}>
                            <div className={cx('like', 'icon')}>
                                <span><FaThumbsUp /></span>
                            </div>
                            <div className={cx('like-count')}>3</div>
                        </div>
                    </div>
                }
            </li>
        );
    }
}

export default CaseListItem;