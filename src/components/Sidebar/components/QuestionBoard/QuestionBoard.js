import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './QuestionBoard.module.scss';
import { observer, inject } from 'mobx-react';
import Layout from '../../../Layout';
import momentHelper from '../../../../util/momentHelper';

const cx = classNames.bind(styles);

@withRouter
@inject('sidebarStore', 'questionStore')
@observer
class QuestionBoard extends Component {
    componentWillMount() {
        const userid = window.localStorage.getItem('userid');
        this.props.questionStore.loadQuestions({userid});
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
                                    questioner_id,
                                    questioner_name,
                                    createdDate,
                                    content,
                                    answer,
                                    status
                                } = question;
                                
                                const askOrAsked = userid === questioner_id ? 'ask' : 'asked';
                                return <li key={i}>
                                    <div className={cx('question-list-item-top')}>
                                        <span>{askOrAsked === 'ask' ? '요청' : '받음'}</span>
                                        <span>{momentHelper.getLocaleDateWithYYYY(createdDate)}</span>
                                        <span>{questioner_name}</span>
                                        <span>{status === undefined ? '미답변' : status}</span>
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