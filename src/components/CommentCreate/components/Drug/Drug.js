import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Drug.module.scss';
import { observer, inject } from 'mobx-react';
import { FaTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import $ from 'jquery';
import ListForInput from './components/ListForInput';

const cx = classNames.bind(styles);

@inject(
    'commentStore',
    'drugListForInputStore',
    'drugListItemStore',
)
@observer
class Drug extends Component {
    componentDidMount() {
        let store = this.props.drugListForInputStore;
        $(function() {
            $(window).on("scroll", () => {
                store.clear();
            })
        });
    }

    _scroll = (index) => {
        let offTop;
        if (index <= 3 && index >= 0) {
            offTop = 0;
        }
        if (index > 3) {
            offTop = (index - 2.5) * 40;
        }
        $(function() {
            let listContainer = $("div[data-form='list-container-for-drug'] ul");
            listContainer.scrollTop(offTop);
            listContainer.on("scroll", () => {})
        })
    }

    _setInputValue = (value) => {
        this.props.commentStore.handleChangeDrug("name", value);
    }

    handleClickAddButton = async () => {
        await this.props.commentStore.addFormula();
        await this.props.drugListItemStore.addSearchKeyword();
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
        const drugs = this.props.drugListItemStore.drugs || [];
        const { editableDrug, editableFormula } = this.props.commentStore;
        const disabledDelete = editableFormula.length === 1 ? true : false;
        const {
            rationale,
            reference,
            teaching
        } = editableDrug;

        return (
            <div className={cx('Drug')}>
                <h6>
                    <div className={cx('divider-horizontal')}></div>
                    <span>처방</span>
                </h6>
                <div id={`drug-name-input`} data-type="input-list" data-form="input-with-list-for-drug" className={cx("input-list-wrapper", "drug-name")}>
                    <input 
                        placeholder="처방명"
                        autoComplete="off"  
                        className={cx('input-prescription-name')} 
                        type="text" 
                        name="name"
                        value={editableDrug.drug.name || ""}
                        onChange={(e) => {
                            this.props.drugListItemStore.setSearchKeywordForCase(e.target.value);
                            return this.handleOnChangeDrug(e);
                        }}
                        onKeyDown={(e) => {
                        const { status, selectedIndex, maxIndex } = this.props.drugListForInputStore;
                        const drugs = this.props.drugListItemStore.drugs || [];
                        let index;
                        if (e.keyCode === 27) {
                            e.preventDefault();
                            return this.props.drugListForInputStore.clear();
                        }
                        if(e.keyCode === 13) {
                            
                            const { selectedIndex } = this.props.drugListForInputStore;
                            if(selectedIndex > -1) {
                                this.props.drugListForInputStore.clearForList();
                                
                                this.props.commentStore.autoSetDrug(drugs[selectedIndex]);
                                this.props.drugListForInputStore.setSelectedListItem(drugs[selectedIndex].name);
                                this._setInputValue(drugs[selectedIndex].name);
                            }
                            return;
                        }
                        if(e.keyCode === 38) {
                            e.preventDefault();
                            if(status === 'visible') {
                                if (selectedIndex <= 0) {
                                    this._scroll(0);
                                    return;
                                }
                                if (selectedIndex > 0) {
                                    index = selectedIndex - 1;
                                    this._scroll(index);
                                    return this.props.drugListForInputStore.setSelectedIndex(index);
                                }
                            }
                            return;
                        }
                        if(e.keyCode === 40) {
                            e.preventDefault();
                            if(status === 'invisible') {
                                const height = $(e.target).outerHeight();
                                const width = $(e.target).outerWidth();
                                const { top, left } = $(e.target).position();

                                this.props.drugListForInputStore.clear();
                                this.props.drugListForInputStore.setPosition({top, left, height, width});
                                
                                return  this.props.drugListForInputStore.setCurrentSection('symptom');
                            }
                            if(status === 'visible') {
                                if (selectedIndex < 0) {
                                    index = 0;
                                    this._scroll(index);
                                    return this.props.drugListForInputStore.setSelectedIndex(index);
                                }
                                if (selectedIndex >= 0 && selectedIndex < maxIndex) {
                                    index = selectedIndex + 1;
                                    this._scroll(index);
                                    return this.props.drugListForInputStore.setSelectedIndex(index);
                                }
                                if (selectedIndex === maxIndex) {
                                    this._scroll(maxIndex);
                                    return;
                                }
                            }
                        }
                    }}
                        onClick={(e) => {
                            const height = $(e.target).outerHeight();
                            const width = $(e.target).outerWidth();
                            const { top, left } = $(e.target).position();
                            this.props.drugListForInputStore.setPosition({top, left, height, width});
                            
                            this.props.drugListForInputStore.setCurrentSection('drug');
                        }}
                        onFocus={(e) => {
                            const height = $(e.target).outerHeight();
                            const width = $(e.target).outerWidth();
                            const { top, left } = $(e.target).position();
                            this.props.drugListForInputStore.setPosition({top, left, height, width});
                            
                            this.props.drugListForInputStore.setCurrentSection('drug');
                        }}
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
                    <TiPlus /><span>약재 추가</span>
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

                <ListForInput 
                    items={drugs}
                    setInputValue={this._setInputValue}
                />
            </div>
        );
    }
}

export default Drug;