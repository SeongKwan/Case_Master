import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './CommentDetail.module.scss';
import { observer, inject } from 'mobx-react';
import Close from '../../../../styles/img/close.png';
// import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";

const cx = classNames.bind(styles);

@withRouter
@inject('commonStore', 'customModalStore')
@observer
class CommentDetail extends Component {
    handleClickOnClose = () => {
        const { customModalStore, commonStore } = this.props;
        customModalStore.clear();
        commonStore.clearCover();
    }
    
    render() {
        if (this.props.comment === undefined) {
            return <div>Loading...</div>
        }
        const {
            case_id,
            user_id,
            diagnosis,
            prescription,
            fans,
            status,
            note
        } = this.props.comment;
        let countLikes = fans.length;

        return (
            <>
                <div className={cx('CommentDetail')}>
                    <div className={cx('close-modal')}>
                        <span 
                            className={cx('close-icon')}
                            onClick={this.handleClickOnClose}
                        >
                            <img src={Close} alt="close-icon-sidebar"/>
                        </span>
                    </div>
                    <h6>
                        <div className={cx('divider-horizontal')}></div>
                        <span>진단-처방 상세화면</span>
                    </h6>
                    <div className={cx('detail-item-box', 'diagnosis-name')}>
                        <h6 className={cx('main-title')}>진단명</h6>
                        <ul>
                            {
                                diagnosis.map((diagnosis, i) => {
                                    const { name } = diagnosis;
                                    return <li key={i} className={cx('content')}>{name}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'diagnosis-rationale')}>
                        <h6 className={cx('main-title')}>진단근거</h6>
                        <ul>
                            <li>
                                {
                                    diagnosis.map((diagnosis, i) => {
                                        const { rationale } = diagnosis;
                                        return <p key={i} className={cx('content')}>{rationale}</p>
                                    })
                                }
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'diagnosis-reference')}>
                        <h6 className={cx('main-title')}>진단-참고문헌</h6>
                        <ul>
                            <li>
                                {
                                    diagnosis.map((diagnosis, i) => {
                                        const { reference } = diagnosis;
                                        return <div key={i} className={cx('content')}>{reference}</div>
                                    })
                                }
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'drug-name')}>
                        <h6 className={cx('main-title')}>처방명</h6>
                        <ul>
                            <li>
                                <div className={cx('content')}>{prescription.drug.name}</div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'drug-formula')}>
                        <h6 className={cx('main-title')}>처방구성</h6>
                        <ul>
                            <li>
                                <div className={cx('name')}>약재명</div>
                                <div className={cx('herb-dose')}>
                                    <span className={cx('value')}></span>
                                    <span className={cx('unit')}>1첩-복용량</span>
                                </div>
                            </li>
                            {
                                prescription.drug.fomula.map((fomula, i) => {
                                    const {
                                        herb,
                                        dose
                                    } = fomula;

                                    return <li key={i}>
                                        <div className={cx('name')}>{herb}</div>
                                        <div className={cx('herb-dose')}>
                                            <span className={cx('value')}>{dose}</span>
                                            <span className={cx('unit')}>g/일</span>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'drug-rationale')}>
                        <h6 className={cx('main-title')}>처방근거</h6>
                        <ul>
                            <li>
                                <p className={cx('content')}>
                                    {prescription.drug.rationale}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'drug-reference')}>
                        <h6 className={cx('main-title')}>진단-참고문헌</h6>
                        <ul>
                            <li>
                                <div className={cx('content')}>
                                    {prescription.drug.reference}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'teaching')}>
                        <h6 className={cx('main-title')}>환자지도</h6>
                        <ul>
                            <li>
                                <div className={cx('content')}>
                                    {prescription.drug.teaching}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('detail-item-box', 'like-box')}>
                        <p>도움이 되셨다면 눌러주세요^^</p>
                        <div className={cx('like')}>
                            <span className={cx('icon')}><FaRegThumbsUp /></span>
                            <span className={cx('count')}>{countLikes}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CommentDetail;