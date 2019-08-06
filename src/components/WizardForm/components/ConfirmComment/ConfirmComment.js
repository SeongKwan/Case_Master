import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './ConfirmComment.module.scss';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('commentStore')
@observer
class ConfirmComment extends Component {
    render() {
        const {
            editableDiagnosis,
            editableDrug,
            editableFormula,
            editableNote
        } = this.props.commentStore;

        return (
            <div className={cx('ConfirmComment')}>
                <p>아래의 내용으로 진단&처방을 작성됩니다</p>
                <h6>
                    <div className={cx('divider-horizontal')}></div>
                    <span>진단</span>
                </h6>
                <ul className={cx('diagnosis')}>
                    {
                        editableDiagnosis.map((diagnosis, i) => {
                            const {
                                name,
                                rationale,
                                reference
                            } = diagnosis;
                            return <li data-index={i} key={i}>
                                <div className={cx('list-item-header')}>
                                    <div>#{i + 1}</div>
                                </div>
                                <div>
                                    <input 
                                        autoComplete="off"  
                                        name='name'
                                        data-index={i}
                                        type='text'
                                        value={name || ""}
                                        
                                        placeholder="진단명"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        name='rationale'
                                        rows='3'
                                        data-index={i}
                                        value={rationale || ""}
                                        
                                        placeholder="진단근거"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        name='reference'
                                        rows='3'
                                        data-index={i}
                                        value={reference || ""}
                                        
                                        placeholder="참고문헌"
                                        readOnly
                                    />
                                </div>
                            </li>
                        })
                    }
                </ul>
                <h6>
                    <div className={cx('divider-horizontal')}></div>
                    <span>처방</span>
                </h6>
                <div className={cx('drug-name')}>
                    <input 
                        autoComplete="off"  
                        name='name'
                        type='text'
                        value={editableDrug.drug.name || ""}
                        
                        placeholder="처방명"
                        readOnly
                    />
                </div>
                <ul className={cx('drug')}>
                    {
                        editableFormula.map((formula, i) => {
                            const {
                                herb,
                                dose,
                                unit
                            } = formula;
                            return <li data-index={i} key={i}>
                                
                                <div className={cx('herb')}>
                                    <input 
                                        autoComplete="off"  
                                        name='herb'
                                        data-index={i}
                                        type='text'
                                        value={herb || ""}
                                        
                                        placeholder="약초명"
                                        readOnly
                                    />
                                </div>
                                <div className={cx('dose')}>
                                    <input 
                                        autoComplete="off"  
                                        name='dose'
                                        data-index={i}
                                        type='number'
                                        value={dose || 0}
                                        
                                        placeholder="수량"
                                        readOnly
                                    />
                                </div>
                                <div className={cx('unit')}>
                                    <input 
                                        autoComplete="off"  
                                        name='unit'
                                        data-index={i}
                                        type='text'
                                        value={unit || ''}
                                        
                                        placeholder="단위"
                                        readOnly
                                    />
                                </div>
                            </li>
                        })
                    }
                </ul>

                <div className={cx('textarea-container')}>
                    <textarea 
                        name='rationale'
                        rows='3'
                        value={editableDrug.rationale || ""}
                        
                        placeholder="처방근거"
                        readOnly
                    />
                </div>
                <div className={cx('textarea-container')}>
                    <textarea 
                        name='reference'
                        rows='3'
                        value={editableDrug.reference || ""}
                        
                        placeholder="참고문헌"
                        readOnly
                    />
                </div>
                <div className={cx('textarea-container', 'teaching')}>
                    <textarea 
                        name='teaching'
                        rows='3'
                        value={editableDrug.teaching || ""}
                        
                        placeholder="생활지도"
                        readOnly
                    />
                </div>
                <h6>
                    <div className={cx('divider-horizontal')}></div>
                    <span>메모</span>
                </h6>
                <div className={cx('textarea-container')}>
                    <textarea 
                        name='note'
                        type='text'
                        rows='3'
                        value={editableNote || ""}
                        
                        placeholder="메모"
                        readOnly
                    />
                </div>
            </div>
        );
    }
}

export default ConfirmComment;