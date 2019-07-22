import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './CommentCard.module.scss';
import { observer, inject } from 'mobx-react';
// import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";

const cx = classNames.bind(styles);

@withRouter
@inject('customModalStore', 'commonStore')
@observer
class CommentCard extends Component {
    handleClick = () => {
        const { customModalStore, commonStore } = this.props;
        customModalStore.openModal();
        commonStore.coverApp();
        customModalStore.setContent('commentDetail');
    }

    render() {
        const myComment = this.props.myComment;

        return (
            <div className={cx('CommentCard')}>
                <div className={cx('comment-item', {my_comment: myComment})}>
                    <div className={cx('like')}>
                        <span className={cx('icon')}><FaRegThumbsUp /></span>
                        <span className={cx('count')}>12</span>
                    </div>
                    <div className={cx('edit-delete')}>
                        <button className={cx('delete')}>삭제</button>
                        <button className={cx('edit')}>수정</button>
                    </div>
                    <div className={cx('more-view')} onClick={this.handleClick}>상세보기</div>
                    <div className={cx('diagnosis')}>
                        <div className={cx('title')}>진단명</div>
                        <ul className={cx('diagnosis-list')}>
                            <li className={cx('diagnosis-name')}>간기능이상</li>
                            <li className={cx('diagnosis-name')}>고혈압</li>
                            <li className={cx('diagnosis-name')}>당뇨</li>
                        </ul>
                    </div>
                    <div className={cx('prescription')}>
                        <div className={cx('title')}>처방명</div>
                        <div className={cx('drug-name')}>십전대보탕</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentCard;