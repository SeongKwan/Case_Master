import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { observer, inject } from 'mobx-react';
import CommentDetail from '../CaseDetail/components/CommentDetail';
import QuestionDetail from '../CaseDetail/components/QuestionDetail';
import QuestionAnswer from '../CaseDetail/components/QuestionAnswer';

const cx = classNames.bind(styles);

@inject('customModalStore')
@observer
class Modal extends Component {
    componentWillUnmount() {
        
    }
    renderComponent = (content, data) => {
        if (content === 'commentDetail') {
            return <CommentDetail comment={data} />
        } else if (content === 'commentDetailEdit') {
            return <CommentDetail comment={data} isEditing />
        } else if (content === 'questionDetail') {
            return <QuestionDetail question={data} />
        } else if (content === 'questionAnswer') {
            return <QuestionAnswer />
        } else if(content === '') {
            return <div></div>;  
        } else return false;
    }
    render() {
        const { isOpenModal, content, data } = this.props;
        return (
            <div className={cx('Modal', { isOpenModal })}>
                {this.renderComponent(content, data)}
            </div>
        );
    }
}

export default Modal;