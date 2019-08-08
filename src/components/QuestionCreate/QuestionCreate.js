import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './QuestionCreate.module.scss';
import { observer, inject } from 'mobx-react';
import Layout from '../Layout';
const cx = classNames.bind(styles);

@inject('sidebarStore', 'questionStore')
@observer
class QuestionCreate extends Component {
    componentWillUnmount() {
        this.props.questionStore.clear();
    }
    handleOnChangeContent = (e) => {
        const { value } = e.target;
        this.props.questionStore.handleChangeContent(value);
    }
    handleSubmit = () => {
        const { params: { caseid }  } = this.props.match;
        const questioner_id = window.localStorage.getItem('userid');
        const questioner_name = window.localStorage.getItem('username');
        this.props.questionStore.createQuestion({case_id: caseid, questioner_id, questioner_name})
        .then((res) => {
            return this.props.history.goBack();
        })
        .catch((error) => {
            window.alert(error);
        });;
    }
    
    render() {
        const { content } = this.props.questionStore;

        return (
            <Layout where="create-question" headerBack>
                <main className={cx('QuestionCreate')}>
                    <h1>아래에 증례에 관련한 의문사항 또는 처방에 관련한 질문을 적어주세요</h1>
                    <div className={cx('form-container')}>
                        <div className={cx('textarea-container')}>
                            <textarea 
                                name='content'
                                rows='6'
                                value={content || ""}
                                onChange={this.handleOnChangeContent || ''}
                                placeholder="질문 내용"
                            />
                        </div>
                    </div>
                    <button onClick={this.handleSubmit}>질문하기</button>
                </main>
            </Layout>
        );
    }
}

export default QuestionCreate;