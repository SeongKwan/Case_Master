import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './Comment.module.scss';
import { observer, inject } from 'mobx-react';
import CommentCard from '../CommentCard/CommentCard';
import Loader from '../../../Loader';
import { action } from 'mobx';

const cx = classNames.bind(styles);

@withRouter
@inject('caseStore')
@observer
class Comment extends Component {
    renderMyComment(comments) {
        const loggedUserId = window.localStorage.getItem('userid');
        let myCommentIndex = comments.findIndex(comment => 
            loggedUserId === comment.commenter_id
        )
        if (myCommentIndex > -1) {
            return <CommentCard myComment={true} comment={comments[myCommentIndex]} />
        }
        return <div className={cx('comment-item', 'my-comment-item', 'no-comment')}>
            <p>등록하신 처방이 없습니다</p>
            <p>당신의 소중한 의견을 남겨주세요</p>
        </div>
    }
    @action renderComments(cms) {
        const loggedUserId = window.localStorage.getItem('userid');
        let myCommentIndex = cms.findIndex(comment => 
            loggedUserId === comment.commenter_id
        )
        return cms.map((comment, i) => {
            if (myCommentIndex === i) {
                return false;
            } else {
                return <CommentCard comment={comment} key={i} />
            }
        })
    }

    render() {
        const { comments, isLoading } = this.props;
        if (isLoading || comments === undefined ) {
            return <div className={cx('Comment', 'loading')}>
                <Loader />
            </div>
        }
        
        return (
            <div className={cx('Comment')}>
                {this.renderComments(comments)}
                <div className={cx('my-comment')}>
                    <h6>
                        <div className={cx('divider-horizontal')}></div>
                        <span>나의 처방</span>
                    </h6>
                    {this.renderMyComment(comments)}
                </div>
            </div>
        );
    }
}

export default Comment;