import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './Comment.module.scss';
import { observer, inject } from 'mobx-react';
import CommentCard from '../CommentCard/CommentCard';
import Loader from '../../../Loader';

const cx = classNames.bind(styles);

@withRouter
@inject()
@observer
class Comment extends Component {
    render() {
        const { comments, isLoading } = this.props;

        if (isLoading || comments === undefined) {
            return <div className={cx('Comment', 'loading')}>
                <Loader />
            </div>
        }

        return (
            <div className={cx('Comment')}>
                {
                    comments.map((comment, i) => {
                        return <CommentCard comment={comment} key={i} />
                    })
                }
                <div className={cx('my-comment')}>
                    <h6>
                        <div className={cx('divider-horizontal')}></div>
                        <span>나의 처방</span>
                    </h6>
                    {/* <CommentCard myComment={true} /> */}
                    <div className={cx('comment-item', 'my-comment-item', 'no-comment')}>
                        <p>등록하신 처방이 없습니다</p>
                        <p>당신의 소중한 의견을 남겨주세요</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;