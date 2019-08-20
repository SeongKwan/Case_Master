import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './CommentCard.module.scss';
import { observer, inject } from 'mobx-react';
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";

const cx = classNames.bind(styles);

@withRouter
@inject('customModalStore', 'commonStore','commentStore')
@observer
class CommentCard extends Component {
    handleClick = (comment) => {
        const { customModalStore, commonStore, commentStore } = this.props;
        const { _id } = comment;
        customModalStore.openModal();
        commonStore.coverApp();
        customModalStore.setContent('commentDetail');
        customModalStore.setRegistry(comment);
        commentStore.loadComment({comment_id: _id});
    }

    handleClickOnEdit = (comment) => {
        const { customModalStore, commonStore, commentStore } = this.props;
        const { _id } = comment;
        customModalStore.openModal();
        commonStore.coverApp();
        customModalStore.setContent('commentDetailEdit');
        customModalStore.setRegistry(comment);
        commentStore.loadComment({comment_id: _id})
        .then((res) => {
            return commentStore.initEditComment();
        })
        .catch((err) => {
            return console.log(err);
        });
    }

    handleClickOnDelete = () => {
        const { _id } = this.props.comment;
        if(window.confirm('정말로 삭제하시겠습니까?')) {
            return this.props.commentStore.deleteComment({comment_id: _id});
        }
    }

    render() {
        const myComment = this.props.myComment;
        if (this.props.comment === undefined) {
            return <div>Loading...</div>
        }
        const {
            // case_id,
            // case_writer_id,
            commenter_id,
            // createdDate,
            diagnosis,
            prescription,
            fans,
            // status,
            // note,
            // _id
        } = this.props.comment;
        
        let countLikes = fans.length;
        const userId = window.localStorage.getItem('userid');
        let checked = fans.filter(fan => 
            fan === userId
        );
        const authControlTool = (userId === commenter_id) ? true : false;

        return (
            <div className={cx('CommentCard')}>
                <div className={cx('comment-item', {my_comment: myComment})}>
                    {
                        checked.length > 0 ?
                        <div className={cx('like')}>
                            <span className={cx('icon')}><FaThumbsUp /></span>
                            <span className={cx('count')}>{countLikes}</span>
                        </div>
                        : <div className={cx('like')}>
                            <span className={cx('icon')}><FaRegThumbsUp /></span>
                            <span className={cx('count')}>{countLikes}</span>
                        </div>
                    }
                    {
                        authControlTool &&
                        <div className={cx('edit-delete')}>
                            <button className={cx('edit')} onClick={() => {this.handleClickOnEdit(this.props.comment)}}>수정</button>
                            <button className={cx('delete')} onClick={this.handleClickOnDelete}>삭제</button>
                        </div>
                    }
                    <div className={cx('more-view')} onClick={() => {this.handleClick(this.props.comment)}}>상세보기</div>
                    <div className={cx('diagnosis')}>
                        <div className={cx('title')}>진단명</div>
                        <ul className={cx('diagnosis-list')}>
                            {
                                diagnosis.map((diagnosis, i) => {
                                    const { name } = diagnosis;
                                    return <li key={i} className={cx('diagnosis-name')}>{name}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className={cx('prescription')}>
                        <div className={cx('title')}>처방명</div>
                        <div className={cx('drug-name')}>{prescription.drug.name}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentCard;