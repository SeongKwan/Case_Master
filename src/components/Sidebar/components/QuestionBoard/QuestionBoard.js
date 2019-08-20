import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './QuestionBoard.module.scss';
import { observer, inject } from 'mobx-react';
import Layout from '../../../Layout';
import momentHelper from '../../../../util/momentHelper';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const cx = classNames.bind(styles);

@withRouter
@inject('sidebarStore', 'questionStore', 'swiperStore')
@observer
class QuestionBoard extends Component {
    componentWillMount() {
        const userid = window.localStorage.getItem('userid');
        this.props.questionStore.loadQuestions({userid});
    }
    componentWillUnmount() {
        this.props.questionStore.clear();
    }
    handleClick = ({case_id}) => {
        this.props.swiperStore.setCurrentSlide(2);
        this.props.history.push(`/caseDetail/${case_id}`);
    }
    render() {
        const { questions } = this.props.questionStore;
        const userid = window.localStorage.getItem('userid');
        return (
            <Layout where="questionBoard">
                <div role="main" className={cx('QuestionBoard')}>
                    <ul>
                        {
                            questions.map((question, i) => {
                                const {
                                    case_id,
                                    questioner_id,
                                    questioner_name,
                                    createdDate,
                                    content,
                                    answer
                                } = question;
                                
                                const askOrAsked = userid === questioner_id ? 'ask' : 'asked';
                                return <li key={i} onClick={() => this.handleClick({case_id})}>
                                    <div className={cx('question-list-item-top')}>
                                        <span>{askOrAsked === 'ask' ? <span className={cx('request-type')}>요청<FaAngleRight /></span> : <span className={cx('request-type')}>받음<FaAngleLeft /></span>}</span>
                                        <span className={cx({answer: !!answer}, {unanswer: !answer})}>{!answer ? '미답변' : '답변완료'}</span>
                                        <span>{questioner_name}</span>
                                        <span>{momentHelper.getLocaleDateWithYYYY(Number(createdDate))}</span>
                                    </div>
                                    <div className={cx('question-list-item-bottom')}>
                                        <p>{content}</p>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </Layout>
        );
    }
}

export default QuestionBoard;