import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './QuestionCard.module.scss';
import { observer, inject } from 'mobx-react';
import momentHelper from '../../../../util/momentHelper';

const cx = classNames.bind(styles);

@withRouter
@inject('caseStore', 'customModalStore', 'commonStore', 'questionStore')
@observer
class QuestionCard extends Component {
    handleClick = (question) => {
        const { customModalStore, commonStore, questionStore } = this.props;
        const { _id } = question;
        customModalStore.openModal();
        commonStore.coverApp();
        customModalStore.setContent('questionDetail');
        customModalStore.setRegistry(question);
        questionStore.loadQuestion({questionid: _id});
    }

    handleClickOnEdit = (question) => {
        const { customModalStore, commonStore, questionStore } = this.props;
        const { _id } = question;
        customModalStore.openModal();
        commonStore.coverApp();
        customModalStore.setContent('questionDetailEdit');
        customModalStore.setRegistry(question);
        questionStore.loadQuestion({questionid: _id})
        .then((res) => {
            return questionStore.initEditQuestion();
        })
        .catch((err) => {
            return console.log(err);
        });
    }

    handleClickOnDelete = () => {
        const { params: { caseid }  } = this.props.match;
        const { _id } = this.props.question;
        if(window.confirm('정말로 삭제하시겠습니까?')) {
            return this.props.questionStore.deleteQuestion({questionid: _id})
            .then(() => {
                this.props.caseStore.loadCase({caseid});
            })
            .catch();
        }
    }
    
    render() {
        if (this.props.question === undefined) {
            return <div>Loading...</div>
        }
        const {
            // case_id,
            // case_writer_id,
            questioner_id,
            questioner_name,
            createdDate,
            content,
            answer,
            // status,
            // _id
        } = this.props.question;
        const { index } = this.props;
        const userId = window.localStorage.getItem('userid');
        const authControlTool = (userId === questioner_id) ? true : false;
        return (
            <div className={cx('QuestionCard')}>
                {
                    authControlTool &&
                    <div className={cx('edit-delete')}>
                        {/* <button className={cx('edit')} onClick={() => {this.handleClickOnEdit(this.props.question)}}>수정</button> */}
                        <button className={cx('delete')} onClick={this.handleClickOnDelete}>삭제</button>
                    </div>
                }
                <div className={cx('top')}>
                    <div className={cx('number')}>{index + 1}</div>
                    <div className={cx('status', {unanswer: !answer}, {answer: !!answer})}>{!!answer ? '답변완료' : '미답변'}</div>
                    <div className={cx('questioner')}>{questioner_name}</div>
                    <div className={cx('date')}>{momentHelper.getLocaleDateWithYY(Number(createdDate))}</div>
                </div>
                <div className={cx('bottom')}>
                    <div className={cx('content')}>
                        {
                            content.length < 35 ? content 
                            : `${content.slice(0, 35)}...`
                        }
                    </div>
                </div>
                <div className={cx('view-more')} onClick={() => {this.handleClick(this.props.question)}}>상세보기</div>
            </div>
        );
    }
}

export default QuestionCard;