import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseListItem.module.scss';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import { FaNotesMedical } from "react-icons/fa";
import { FaEye, FaRegThumbsUp, FaClock } from "react-icons/fa";
import { TiDocumentAdd } from "react-icons/ti";
import momentHelper from '../../util/momentHelper';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import $ from 'jquery';

const formatter = buildFormatter(koreanStrings)
const cx = classNames.bind(styles);

@withRouter
@inject()
@observer
class CaseListItem extends Component {
    componentDidMount() {
        let symptomBox = $(".symptom-box-size"),
            symptomListBox = $(".symptom-list-box-size");
        symptomListBox.css('max-width', symptomBox.outerWidth(true) - 60);
    }
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
                count_comment,
                createdDate
            } = JSON.parse(JSON.stringify(this.props.item));
            const caseData = this.props.item.case;
            const {
                patient,
                symptom,
                // user_id
            } = caseData;

            return (
                <li className={cx('CaseListItem')}>
                    <div className={cx('list-item-container')} onClick={() => {this.handleClick(_id)}}>
                        <div className={cx('status-bar')}>
                            <div className={cx('top')}>
                                <div className={cx('created-date')}>
                                    <span><FaClock /></span><TimeAgo live date={createdDate} formatter={formatter} />
                                </div>
                                <div className={cx('view-count')}>
                                    <span><FaEye /></span>{views}
                                </div>
                            </div>
                            <div className={cx('bottom')}>
                                <div className={cx('comment-count')}>
                                    <span>처방의견</span>{count_comment}건
                                </div>
                                <div>모두 보기</div>
                            </div>
                        </div>
                        <div className={cx('card-body')}>
                            <div className={cx('basic-info')}>
                                <div className={cx('label')}>환자</div>
                                <div className={cx('content-box')}>
                                    <div className={cx('gender')}>{patient.gender},&nbsp;</div>
                                    <div className={cx('age')}>{patient.age}세</div>
                                </div>
                            </div>
                            <div className={cx('symptom', 'symptom-box-size')}>
                                <div className={cx('label')}>증상</div>
                                <div className={cx('content-box')}>    
                                    <ul className={cx('symptom-list','symptom-list-box-size')}>
                                        {
                                            symptom.map((sympt, i) => {
                                                return <li key={i} className={cx('symptom-item')}>
                                                    {sympt.name}{(symptom.length - 1 !== i) && <span>,&nbsp;</span>}
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
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
                comment,
                createdDate
            } = JSON.parse(JSON.stringify(this.props.item));
    
            if (patient === undefined || symptom === undefined) {
                return <div style={{display: 'none'}}>loading...</div>
            }
    
            return (
                <li className={cx('CaseListItem')}>
                    <div className={cx('list-item-container')} onClick={() => {this.handleClick(case_id)}}>
                        <div className={cx('status-bar')}>
                            <div className={cx('top')}>
                                <div className={cx('created-date')}>
                                    <span><FaClock /></span><TimeAgo live date={createdDate} formatter={formatter} />
                                </div>
                                <div className={cx('view-count')}>
                                    <span><FaEye /></span>{views}
                                </div>
                            </div>
                            <div className={cx('bottom')}>
                                <div className={cx('comment-count')}>
                                    <span>처방의견</span>{count_comment}건
                                </div>
                                <div>모두 보기</div>
                            </div>
                        </div>
                        <div className={cx('card-body')}>
                            <div className={cx('basic-info')}>
                                <div className={cx('label')}>환자</div>
                                <div className={cx('content-box')}>
                                    <div className={cx('gender')}>{patient.gender},&nbsp;</div>
                                    <div className={cx('age')}>{patient.age}세</div>
                                </div>
                            </div>
                            <div className={cx('symptom', 'symptom-box-size')}>
                                <div className={cx('label')}>증상</div>
                                <div className={cx('content-box')}>    
                                    <ul className={cx('symptom-list','symptom-list-box-size')}>
                                        {
                                            symptom.map((sympt, i) => {
                                                return <li key={i} className={cx('symptom-item')}>
                                                    {sympt.name}{(symptom.length - 1 !== i) && <span>,&nbsp;</span>}
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
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
                                        answer,
                                        questioner_name,
                                    } = question;
                                    
                                    return <li key={i} className={cx('question')}>
                                        <div className={cx('question-status', {answered: !!answer})}>
                                            <div className={cx('number')}>#{i + 1}</div>
                                            <div className={cx('status')}>
                                                {
                                                    !!answer ? '답변완료' : '미답변'
                                                }
                                            </div>
                                            <div className={cx('user')}>{questioner_name || ''}</div>
                                            <div className={cx('date')}>{momentHelper.getLocaleDateWithYYYY(Number(createdDate))}</div>
                                        </div>
                                        <div className={cx('question-content')}>
                                            {
                                                content.length < 35 ? content 
                                                : `${content.slice(0, 35)}...`
                                            }
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