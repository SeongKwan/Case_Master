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
    handleClickOnAddComment = () => {
        const { params: { caseid }  } = this.props.match;
        const userId = window.localStorage.getItem('userid');
        const { comments } = this.props.caseStore;
        let check = comments.filter(comment => comment.commenter_id === userId);
        if (check.length <= 0) {
            return this.props.history.push(`/create/comment/${caseid}`);
        }
        window.alert('이미 작성하신 처방이 있습니다.');
    }

    renderMyComment(comments) {
        const loggedUserId = window.localStorage.getItem('userid');
        let myCommentIndex = comments.findIndex(comment => 
            loggedUserId === comment.commenter_id
        )
        if (myCommentIndex > -1) {
            return <CommentCard myComment={true} comment={comments[myCommentIndex]} />
        }
        return <div className={cx('comment-item', 'my-comment-item', 'no-comment', 'leave-comment')}>
            <p>당신의 소중한 의견을 남겨주세요</p>
            <button onClick={this.handleClickOnAddComment}>처방하기</button>
        </div>
    }
    @action renderComments(cms) {
        const loggedUserId = window.localStorage.getItem('userid');
        let myCommentIndex = cms.findIndex(comment => 
            loggedUserId === comment.commenter_id
        )
        if (cms.length === 0) {
            return <div className={cx('empty-comment')}>
                <p>현재 등록된 다른 분들의 처방이 없습니다</p>
            </div>
        }
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