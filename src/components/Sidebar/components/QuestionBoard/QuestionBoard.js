import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './QuestionBoard.module.scss';
import { observer, inject } from 'mobx-react';
import Layout from '../../../Layout';

const cx = classNames.bind(styles);

@withRouter
@inject('sidebarStore', 'commonStore')
@observer
class QuestionBoard extends Component {
    render() {
        return (
            <Layout where="questionBoard">
                <div role="main" className={cx('QuestionBoard')}>
                    question board
                </div>
            </Layout>
        );
    }
}

export default QuestionBoard;