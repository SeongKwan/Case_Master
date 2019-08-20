import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './Question.module.scss';
import { observer, inject } from 'mobx-react';
import Loader from '../../../Loader';
import QuestionCard from '../QuestionCard';

const cx = classNames.bind(styles);

@withRouter
@inject('caseStore')
@observer
class Question extends Component {
    renderQuestions(questions) {
        if (questions.length === 0) {
            return <div className={cx('empty-question')}>
                <p>증례에 관해 궁금한 점이 있다면</p>
                <p>질문을 남겨주세요</p>
            </div>
        }
        return questions.map((question, i) => {
            return <QuestionCard question={question} key={i} index={i} />
        })
    }

    render() {
        const { questions, isLoading } = this.props;
        if (isLoading || questions === undefined ) {
            return <div className={cx('Question', 'loading')}>
                <Loader />
            </div>
        }
        return (
            <div className={cx('Question')}>
                {this.renderQuestions(questions)}
            </div>
        );
    }
}

export default Question;