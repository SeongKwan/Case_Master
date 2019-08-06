import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import styles from './CommentDetail.module.scss';
import { observer, inject } from 'mobx-react';
import Close from '../../../../styles/img/close.png';
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";

const cx = classNames.bind(styles);

@withRouter
@inject('commonStore', 'customModalStore', 'commentStore', 'caseStore')
@observer
class CommentDetail extends Component {
    componentWillUnmount() {
        this.props.commentStore.clearCurrentComment();
        this.props.commentStore.clearEditableData();
    }
    handleClickOnClose = () => {
        const { commentStore, customModalStore, commonStore } = this.props;
        commentStore.clearEditableData();
        commentStore.clearCurrentComment();
        customModalStore.clear();
        commonStore.clearCover();
    }

    handleClickOnLike = (checked) => {
        const { _id, commenter_id } = this.props.comment;
        const userId = window.localStorage.getItem('userid');
        let status = checked.length > 0 ? 0 : 1;
        if (userId !== commenter_id) {
            return this.props.commentStore.patchLike({comment_id: _id, user_id: userId, status});
        }
        alert('본인의 처방에 좋아요를 할 수 없습니다');
    }

    handleClickAddDiagnosis = () => {
        this.props.commentStore.addDiagnosis();
    }
    handleClickDeleteDiagnosis = (index) => {
        const { editableDiagnosis } = this.props.commentStore;

        if (editableDiagnosis.length > 1) {
            return this.props.commentStore.deleteDiagnosis(index);
        }
    }

    handleOnChangeDiagnosis = (e) => {
        const { dataset, name, value } = e.target;
        this.props.commentStore.handleChangeDiagnosis(dataset.index, name, value);
    }

    handleClickAddFormula = () => {
        this.props.commentStore.addFormula();
    }
    handleClickDeleteDrug = (index) => {
        const { editableFormula } = this.props.commentStore;
        if (editableFormula.length > 1) {
            return this.props.commentStore.deleteFormula(index);
        }
    }
    handleOnChangeDrug = (e) => {
        const { name, value } = e.target;
        this.props.commentStore.handleChangeDrug(name, value);
    }
    handleOnChangeFormula = (e) => {
        const { dataset, name, value } = e.target;
        this.props.commentStore.handleChangeFormula(dataset.index, name, value);
    }

    handleOnChangeNote = (e) => {
        const { value } = e.target;
        this.props.commentStore.handleChangeNote(value);
    }

    handleUpdateComment = () => {
        const { _id } = this.props.comment;
        const userId = window.localStorage.getItem('userid');
        if (window.confirm('수정하시겠습니까?')) {
            this.props.commentStore.patchComment({comment_id: _id, user_id: userId});
        }
    }

    render() {
        const { 
            currentComment,
            editableDiagnosis,
            editableDrug,
            editableFormula,
            editableNote
        } = this.props.commentStore;
        
        if (currentComment._id === undefined) {
            return <div style={{display: 'none'}}>Loading...</div>
        }

        const { isEditing } = this.props;
        
        const disabledDelete = editableDiagnosis.length === 1 ? true : false;
        const disabledDeleteDrug = editableFormula.length === 1 ? true : false;

        const {
            // case_id,
            // case_writer_id,
            // commenter_id,
            // createdDate,
            diagnosis,
            prescription,
            fans,
            // status,
            note,
            // _id
        } = currentComment;
        let countLikes = fans.length || 0;
        const userId = window.localStorage.getItem('userid');
        let checked = fans.filter(fan => 
            fan === userId
        );
        

        return (
            <>
                {
                    !isEditing ?
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
                        <div className={cx('detail-item-box', 'diagnosis')}>
                            <h6 className={cx('main-title')}>진단</h6>
                            <ul>
                                {
                                    diagnosis.map((diagnosis, i) => {
                                        const { name, rationale, reference } = diagnosis;
                                        return <li key={i} className={cx('content')}>
                                            <div>{name}</div>
                                            <div>{rationale}</div>
                                            <div>{reference}</div>
                                        </li>
                                    })
                                }
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
                                        {prescription.rationale}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('detail-item-box', 'drug-reference')}>
                            <h6 className={cx('main-title')}>진단-참고문헌</h6>
                            <ul>
                                <li>
                                    <div className={cx('content')}>
                                        {prescription.reference}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('detail-item-box', 'teaching')}>
                            <h6 className={cx('main-title')}>환자지도</h6>
                            <ul>
                                <li>
                                    <div className={cx('content')}>
                                        {prescription.teaching}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('detail-item-box', 'note')}>
                            <h6 className={cx('main-title')}>메모</h6>
                            <ul>
                                <li>
                                    <div className={cx('content')}>
                                        {note}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('detail-item-box', 'like-box')}>
                            <p>도움이 되셨다면 눌러주세요^^</p>
                            {
                                checked.length > 0 ?
                                <div className={cx('like')} onClick={() => this.handleClickOnLike(checked)}>
                                    <span className={cx('icon')}><FaThumbsUp /></span>
                                    <span className={cx('count')}>{countLikes}</span>
                                </div>
                                : <div className={cx('like')} onClick={() => this.handleClickOnLike(checked)}>
                                    <span className={cx('icon')}><FaRegThumbsUp /></span>
                                    <span className={cx('count')}>{countLikes}</span>
                                </div>
                            }
                        </div>
                    </div>
                    : <div className={cx('CommentDetail', 'isEditing')}>
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
                            <span>진단-처방 편집화면</span>
                        </h6>
                        <div className={cx('detail-item-box', 'diagnosis')}>
                            <h6 className={cx('main-title')}>진단</h6>
                            <ul>
                                
                                {
                                    editableDiagnosis.map((diagnosis, i) => {
                                        const {
                                            name,
                                            rationale,
                                            reference
                                        } = diagnosis;
                                        return <li data-index={i} key={i}>
                                            <div className={cx('list-item-header')}>
                                                {/* <div>#{i + 1}</div> */}
                                                <button 
                                                    disabled={disabledDelete}
                                                    data-index={i} 
                                                    className={cx('delete-diagnosis')} 
                                                    onClick={() => {this.handleClickDeleteDiagnosis(i)}}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                            <div>
                                                <input 
                                                    autoComplete="off"  
                                                    name='name'
                                                    data-index={i}
                                                    type='text'
                                                    value={name || ""}
                                                    onChange={this.handleOnChangeDiagnosis}
                                                    placeholder="진단명"
                                                />
                                            </div>
                                            <div>
                                                <textarea 
                                                    name='rationale'
                                                    rows='3'
                                                    data-index={i}
                                                    value={rationale || ""}
                                                    onChange={this.handleOnChangeDiagnosis}
                                                    placeholder="진단근거"
                                                />
                                            </div>
                                            <div>
                                                <textarea 
                                                    name='reference'
                                                    rows='3'
                                                    data-index={i}
                                                    value={reference || ""}
                                                    onChange={this.handleOnChangeDiagnosis}
                                                    placeholder="참고문헌"
                                                />
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                            <button className={cx('add-diagnosis')} onClick={this.handleClickAddDiagnosis}>
                                <TiPlus />
                            </button>
                        </div>
                        <div className={cx('detail-item-box', 'drug-name')}>
                            <h6 className={cx('main-title')}>처방명</h6>
                            <ul>
                                <li>
                                    <div className={cx('content')}>
                                        <input 
                                            autoComplete="off"  
                                            name='name'
                                            type='text'
                                            value={editableDrug.drug.name || ""}
                                            onChange={this.handleOnChangeDrug}
                                            placeholder="처방명"
                                        />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('detail-item-box', 'drug-formula')}>
                            <h6 className={cx('main-title')}>처방구성</h6>
                            <ul>
                                {/* <li>
                                    <div className={cx('name')}>약재명</div>
                                    <div className={cx('value')}>수량</div>
                                    <div className={cx('unit')}>단위</div>
                                </li> */}
                                {
                                    editableFormula.map((formula, i) => {
                                        const {
                                            herb,
                                            dose,
                                            unit
                                        } = formula;
                                        return <li className={cx('formula-list-item')} data-index={i} key={i}>
                                            
                                            <div className={cx('herb')}>
                                                <input 
                                                    autoComplete="off"  
                                                    name='herb'
                                                    data-index={i}
                                                    type='text'
                                                    value={herb || ""}
                                                    onChange={this.handleOnChangeFormula}
                                                    placeholder="약초명"
                                                />
                                            </div>
                                            <div className={cx('dose')}>
                                                <input 
                                                    autoComplete="off"  
                                                    name='dose'
                                                    data-index={i}
                                                    type='number'
                                                    value={dose || 0}
                                                    onChange={this.handleOnChangeFormula}
                                                    placeholder="수량"
                                                />
                                            </div>
                                            <div className={cx('unit')}>
                                                <input 
                                                    autoComplete="off"  
                                                    name='unit'
                                                    data-index={i}
                                                    type='text'
                                                    value={unit || ''}
                                                    onChange={this.handleOnChangeFormula}
                                                    placeholder="단위"
                                                />
                                            </div>
                                            <div className={cx('list-item-header')}>
                                                <button 
                                                    disabled={disabledDeleteDrug}
                                                    className={cx('delete-formula')} 
                                                    onClick={() => {this.handleClickDeleteDrug(i)}}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                            <button className={cx('add-formula')} onClick={this.handleClickAddFormula}>
                                <TiPlus />
                            </button>
                        </div>
                        <div className={cx('detail-item-box', 'drug-rationale')}>
                            <h6 className={cx('main-title')}>처방근거</h6>
                            <ul>
                                <li>
                                    <textarea 
                                        className={cx('content')}
                                        name='rationale'
                                        rows='3'
                                        value={editableDrug.rationale || ""}
                                        onChange={this.handleOnChangeDrug || ''}
                                        placeholder="처방근거"
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className={cx('detail-item-box', 'drug-reference')}>
                            <h6 className={cx('main-title')}>진단-참고문헌</h6>
                            <ul>
                                <li>
                                    <textarea 
                                        className={cx('content')}
                                        name='reference'
                                        rows='3'
                                        value={editableDrug.reference || ""}
                                        onChange={this.handleOnChangeDrug || ''}
                                        placeholder="참고문헌"
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className={cx('detail-item-box', 'teaching')}>
                            <h6 className={cx('main-title')}>환자지도</h6>
                            <ul>
                                <li>
                                    <textarea 
                                        className={cx('content')}
                                        name='teaching'
                                        rows='3'
                                        value={editableDrug.teaching || ""}
                                        onChange={this.handleOnChangeDrug || ''}
                                        placeholder="생활지도"
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className={cx('detail-item-box', 'note')}>
                            <h6 className={cx('main-title')}>메모</h6>
                            <ul>
                                <li>
                                    <textarea 
                                        className={cx('content')}
                                        name='note'
                                        type='text'
                                        rows='3'
                                        value={editableNote || ""}
                                        onChange={this.handleOnChangeNote}
                                        placeholder="메모"
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className={cx('bottom')} onClick={this.handleUpdateComment}>수정완료</div>
                    </div>
                }
            </>
        );
    }
}

export default CommentDetail;