import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './QuestionAnswer.module.scss';
import Close from '../../../../styles/img/close.png';
import { observer, inject } from 'mobx-react';
import Loader from '../../../Loader';

const cx = classNames.bind(styles);

@withRouter
@inject('commonStore', 'customModalStore', 'questionStore', 'caseStore')
@observer
class QuestionAnswer extends Component {
    render() {
        return (
            <div className={cx('QuestionAnswer')}>
                question Answer
            </div>
        );
    }
}

export default QuestionAnswer;