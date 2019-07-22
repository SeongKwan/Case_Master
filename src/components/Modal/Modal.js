import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { observer, inject } from 'mobx-react';
import CommentDetail from '../CaseDetail/components/CommentDetail';

const cx = classNames.bind(styles);

@inject('customModalStore')
@observer
class Modal extends Component {
    renderComponent = (content) => {
        if (content === 'commentDetail') {
            return <CommentDetail />
        } else if(content === '') {
            return <div></div>;  
        } else return false;
    }
    render() {
        const { isOpenModal, content } = this.props;
        return (
            <div className={cx('Modal', { isOpenModal })}>
                {this.renderComponent(content)}
            </div>
        );
    }
}

export default Modal;