import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './QuestionDetail.module.scss';
import Close from '../../../../styles/img/close.png';
import { observer, inject } from 'mobx-react';
import Loader from '../../../Loader';
import momentHelper from '../../../../util/momentHelper';

const cx = classNames.bind(styles);

@withRouter
@inject('commonStore', 'customModalStore', 'questionStore', 'caseStore', 'swiperStore')
@observer
class QuestionDetail extends Component {
    componentWillUnmount() {
        this.props.questionStore.clear();
    }
    handleClickOnClose = () => {
        const { questionStore, customModalStore, commonStore } = this.props;
        questionStore.clear();
        customModalStore.clear();
        commonStore.clearCover();
    }
    handleClickOnAnswer = () => {
        const { answer } = this.props.question;
        if (!answer) {
            return this.props.questionStore.toggleAnswering();
        }
    }
    handleClickOnCancel = () => {
        const { answering } = this.props.questionStore;
        if (answering) {
            this.props.questionStore.clearAnswer();
            return this.props.questionStore.toggleAnswering();
        }
    }
    handleClickOnSubmit = () => {
        const { _id } = this.props.question;
        const { answerContent } = this.props.questionStore;
        const { questionStore, customModalStore, commonStore } = this.props;
        
        if (window.confirm('답변하시겠습니까?')) {
            if (answerContent === '') {
                return alert('글을 작성하여 주십시요');
            }
            return this.props.questionStore.answerQuestion({questionid: _id})
            .then(() => {
                const { params: { caseid }  } = this.props.match;
                this.props.swiperStore.setCurrentSlide(2);
                this.props.caseStore.loadCase({caseid});
                questionStore.clear();
                customModalStore.clear();
                commonStore.clearCover();
            })
            .catch();
        }
    }
    handleOnChangeAnswer = (e) => {
        this.props.questionStore.changeAnswer(e.target.value);
    }
    render() {
        const {
            // case_id,
            case_writer_id,
            // questioner_id,
            questioner_name,
            createdDate,
            content,
            answer,
            // status
        } = this.props.question;

        const { answering, answerContent } = this.props.questionStore;
        const userId = window.localStorage.getItem('userid');
        const authAnswer = (userId === case_writer_id) ? true : false;

        return (
            <div className={cx('QuestionDetail')}>
                <div className={cx('close-modal')}>
                    <span 
                        className={cx('close-icon')}
                        onClick={this.handleClickOnClose}
                    >
                        <img src={Close} alt="close-icon-sidebar"/>
                    </span>
                </div>
                <h6>
                    <div className={cx('divider-horizontal')}></div>
                    <span>질의응답 상세화면</span>
                </h6>
                <div className={cx('detail-item-box', 'question')}>
                    <h6 className={cx('main-title')}>질문</h6>
                    <ul>
                        <li>
                            <div className={cx('title')}>
                                질문자
                            </div>
                            <p className={cx('content')}>
                                {questioner_name}
                            </p>
                        </li>
                        <li>
                            <div className={cx('title')}>
                                등록일
                            </div>
                            <p className={cx('content')}>
                                {momentHelper.getLocaleFullDateWithTime(Number(createdDate))}
                            </p>
                        </li>
                        <li>
                            <div className={cx('title')}>
                                내용
                            </div>
                            <textarea 
                                className={cx('content', 'question-content')} 
                                readOnly 
                                rows="5"
                                value={content || ""}
                            />
                        </li>
                    </ul>
                </div>
                <div className={cx('detail-item-box', 'answer')}>
                    {
                        (authAnswer && !answer) && !answering &&
                        <div className={cx('answer-button')}>
                            <button className={cx('answer')} onClick={this.handleClickOnAnswer}>답변하기</button>
                        </div>
                    }
                    {
                        (authAnswer && !answer) && answering &&
                        <div className={cx('answer-button')}>
                            <button className={cx('cancel')} onClick={this.handleClickOnCancel}>취소</button>
                            <button className={cx('submit')} onClick={this.handleClickOnSubmit}>답변</button>
                        </div>
                    }
                    <h6 className={cx('main-title')}>답변</h6>
                    {
                        answering && 
                        <ul>
                            <li>
                                <textarea 
                                    name='answer'
                                    rows='5'
                                    value={answerContent || ""}
                                    onChange={this.handleOnChangeAnswer}
                                    placeholder="답변내용"
                                />
                            </li>
                        </ul>
                    }
                    {
                        !!answer && !answering &&
                        <ul>
                            <li>
                                <textarea 
                                    name='answer'
                                    rows='5'
                                    value={answer.content || ""}
                                    placeholder="답변내용"
                                    readOnly
                                />
                            </li>
                        </ul>
                    }
                    {
                        !answer && !answering &&
                        <ul>
                            <li>
                                <div className={cx('content')}>
                                    답변 대기중...
                                </div>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

export default QuestionDetail;