import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentCreate.module.scss';
import { observer, inject } from 'mobx-react';
import Layout from '../Layout';
import WizardForm from '../WizardForm';
import Diagnosis from './components/Diagnosis';
import Drug from './components/Drug';
import Note from './components/Note';

const cx = classNames.bind(styles);

@inject('wizardFormStore', 'commentStore')
@observer
class CommentCreate extends Component {
    handleCompleteAction = () => {
        const { params: { caseid }  } = this.props.match;
        const commenter_id = window.localStorage.getItem('userid');
        this.props.commentStore.createComment({case_id: caseid, commenter_id})
        .then((res) => {
            return this.props.history.goBack();
        })
        .catch((error) => {
            window.alert(error);
        });;
    }
    render() {
        const components = [
            {title: '진단', component: <Diagnosis />},
            {title: '처방', component: <Drug />},
            {title: '메모', component: <Note />}
        ];
        return (
            <Layout where="create-comment" headerBack>
                <div className={cx('CommentCreate')} role="main">
                    <WizardForm stepCount={3} steps={components} completeAction={this.handleCompleteAction} />
                </div>
            </Layout>
        );
    }
}

export default CommentCreate;