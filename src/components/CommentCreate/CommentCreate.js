import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentCreate.module.scss';
import { observer, inject } from 'mobx-react';
import Layout from '../Layout';
import Diagnosis from './components/Diagnosis';
import Drug from './components/Drug';
import Note from './components/Note';

const cx = classNames.bind(styles);

@inject('wizardFormStore', 'commentStore', 'swiperStore')
@observer
class CommentCreate extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    handleCompleteAction = () => {
        if (window.confirm('위의 내용대로 진단-처방하시겠습니까?')) {
            const { params: { caseid }  } = this.props.match;
            const commenter_id = window.localStorage.getItem('userid');
            this.props.commentStore.createComment({case_id: caseid, commenter_id})
            .then((res) => {
                // this.props.swiperStore.setCurrentSlide(1);
                
                return this.props.history.goBack();
            })
            .catch((error) => {
                window.alert(error);
            });;
        }
    }
    render() {
        // const components = [
        //     {title: '진단', component: <Diagnosis />},
        //     {title: '처방', component: <Drug />},
        //     {title: '메모', component: <Note />}
        // ];
        return (
            <Layout where="create-comment" headerBack>
                <div className={cx('CommentCreate')} role="main">
                    <Diagnosis />
                    <Drug />
                    <Note />
                    {/* <WizardForm stepCount={3} steps={components} completeAction={this.handleCompleteAction} /> */}
                    <div className={cx('button-container')}>
                        <button className={cx('complete-button')} onClick={this.handleCompleteAction}>진단-처방 완료 및 제출</button>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default CommentCreate;