import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseListItem.module.scss';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import { FiHash } from "react-icons/fi";
import { TiEye } from "react-icons/ti";
import { FaNotesMedical } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
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
        if (type === 'search') {
            const {
                _id,
                views,
                createdDate
            } = JSON.parse(JSON.stringify(this.props.item));
            const caseData = this.props.item.case;
            const {
                patient,
                symptom,
                user_id
            } = caseData;

            return (
                <li className={cx('CaseListItem')}>
                    <div className={cx('list-item-container')} onClick={() => {this.handleClick(_id)}}>
                        <div className={cx('status-bar')}>
                            {/* <div className={cx('case-id')}>
                                <span><FiHash /></span>{_id}
                            </div> */}
                            <div className={cx('view-count')}>
                                <span><TiEye /></span>{views}
                            </div>
                            <div className={cx('comment-count')}>
                                <span><FaNotesMedical /></span>{'임시99'}
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
                                    symptom.map((symptom, i) => {
                                        return <li key={i} className={cx('symptom-item')}>&bull;&nbsp;{symptom.name}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </li>
            );
        } else if (type === null || type === "TodayCase" || type === "MyCase" || type === "MyComment") {
            const {
                case_id,
                count_comment,
                count_fans,
                patient,
                symptom,
                views,
                questions,
                comment
            } = JSON.parse(JSON.stringify(this.props.item));
    
            if (patient === undefined || symptom === undefined) {
                return <div style={{display: 'none'}}>loading...</div>
            }
    
            return (
                <li className={cx('CaseListItem')}>
                    <div className={cx('list-item-container')} onClick={() => {this.handleClick(case_id)}}>
                        <div className={cx('status-bar')}>
                            {/* <div className={cx('case-id')}>
                                <span><FiHash /></span>{_id}
                            </div> */}
                            <div className={cx('view-count')}>
                                <span><TiEye /></span>{views}
                            </div>
                            <div className={cx('comment-count')}>
                                <span><FaNotesMedical /></span>{count_comment}
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
                                    symptom.map((symptom, i) => {
                                        return <li key={i} className={cx('symptom-item')}>&bull;&nbsp;{symptom.name}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    {
                        type === "MyCase" &&
                        <ul className={cx('myCase-question-list')}>
                            {
                                questions.map((question, i) => {
                                    const {
                                        createdDate,
                                        content,
                                        status
                                    } = question;
                                    return <li key={i} className={cx('question')}>
                                        <div className={cx('question-status', {answered: status === "answered"})}>
                                            <div className={cx('number')}>#{i + 1}</div>
                                            <div className={cx('date')}>{createdDate}</div>
                                            <div className={cx('user')}>질문자: 토니</div>
                                            <div className={cx('status')}>
                                                {
                                                    status === "answered" ? '답변완료' : '미답변'
                                                }
                                            </div>
                                        </div>
                                        <div className={cx('question-content')}>
                                            {content}
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    }
                    {
                        type === "MyComment" &&
                        <div className={cx('myComment-drug')}>
                            <div className={cx('drug-name')}>
                                <div className={cx('icon')}><span><TiDocumentAdd /></span></div>
                                <div className={cx('name')}>{comment.prescription.drug.name}</div>
                            </div>
                            <div className={cx('drug-formula')}>
                                <ul>
                                    {
                                        comment.prescription.drug.fomula.map((drug, i) => {
                                            const {
                                                herb,
                                                dose,
                                                unit
                                            } = drug;
                                            return <li key={i}>
                                                <div className={cx('herb')}>{herb}</div>
                                                <div className={cx('dose')}>{dose}&nbsp;[{unit}]</div>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className={cx('like-container')}>
                                <div className={cx('like', 'icon')}>
                                    <span><FaRegThumbsUp /></span>
                                </div>
                                <div className={cx('like-count')}>{count_fans}</div>
                            </div>
                        </div>
                    }
                </li>
            );
        }

    }
}

export default CaseListItem;