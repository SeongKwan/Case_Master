import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Drug.module.scss';
import { observer, inject } from 'mobx-react';
import { FaTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";

const cx = classNames.bind(styles);

@inject('commentStore')
@observer
class Drug extends Component {
    handleClickAddButton = () => {
        this.props.commentStore.addFormula();
    }
    handleClickDeleteButton = (index) => {
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
    render() {
        const { editableDrug, editableFormula } = this.props.commentStore;
        const disabledDelete = editableFormula.length === 1 ? true : false;
        const {
            drug,
            rationale,
            reference,
            teaching
        } = editableDrug;

        return (
            <div className={cx('Drug')}>
                <div className={cx('drug-name')}>
                    <input 
                        autoComplete="off"  
                        name='name'
                        type='text'
                        value={drug.name || ""}
                        onChange={this.handleOnChangeDrug}
                        placeholder="처방명"
                    />
                </div>
                <ul>
                    {
                        editableFormula.map((formula, i) => {
                            const {
                                herb,
                                dose,
                                unit
                            } = formula;
                            return <li data-index={i} key={i}>
                                <div className={cx('list-item-header')}>
                                    <button 
                                        disabled={disabledDelete}
                                        className={cx('delete-formula')} 
                                        onClick={() => {this.handleClickDeleteButton(i)}}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
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
                            </li>
                        })
                    }
                </ul>
                <button className={cx('add-formula')} onClick={this.handleClickAddButton}>
                    <TiPlus />
                </button>

                <div className={cx('textarea-container')}>
                    <textarea 
                        name='rationale'
                        rows='3'
                        value={rationale || ""}
                        onChange={this.handleOnChangeDrug || ''}
                        placeholder="처방근거"
                    />
                </div>
                <div className={cx('textarea-container')}>
                    <textarea 
                        name='reference'
                        rows='3'
                        value={reference || ""}
                        onChange={this.handleOnChangeDrug || ''}
                        placeholder="참고문헌"
                    />
                </div>
                <div className={cx('textarea-container')}>
                    <textarea 
                        name='teaching'
                        rows='3'
                        value={teaching || ""}
                        onChange={this.handleOnChangeDrug || ''}
                        placeholder="생활지도"
                    />
                </div>
            </div>
        );
    }
}

export default Drug;