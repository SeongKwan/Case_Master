import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Diagnosis.module.scss';
import { observer, inject } from 'mobx-react';
import { FaTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import $ from 'jquery';
import { action } from 'mobx';
import ListForInput from './components/ListForInput';

const cx = classNames.bind(styles);

@inject(
    'commentStore',
    'diagnosisListForInputStore',
    'diagnosisListItemStore',
)
@observer
class Diagnosis extends Component {
    componentDidMount() {
        let store = this.props.diagnosisListForInputStore;
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
            let listContainer = $("div[data-form='list-container-for-diagnosis'] ul");
            listContainer.scrollTop(offTop);
            listContainer.on("scroll", () => {})
        })
    }

    @action _setInputValue = async (value, category, index) => {
        if (this.props.commentStore.editableDiagnosis.filter(item => item.name === value).length > 0) {
            this.props.commentStore.editableDiagnosis[index]['name'] = '';
            return alert('같은 진단이 이미 존재합니다');
        }
        this.props.diagnosisListItemStore.setSearchKeyword(index, '');
        await this.props.commentStore.handleChangeDiagnosis(index, 'name', value);
        await this.props.commentStore.setCategoryByAutoList(category, index);
        await this.props.diagnosisListForInputStore.clear();
    }

    handleClickAddButton = async () => {
        await this.props.commentStore.addDiagnosis();
        await this.props.diagnosisListItemStore.addCategory();
        await this.props.diagnosisListItemStore.addSearchKeyword();
    }
    handleClickDeleteButton = (e) => {
        const { editableDiagnosis } = this.props.commentStore;
        const { dataset } = e.target;
        if (editableDiagnosis.length > 1) {
            return this.props.commentStore.deleteDiagnosis(dataset.index);
        }
    }
    handleOnChange = (e) => {
        const { dataset, name, value } = e.target;
        this.props.commentStore.handleChangeDiagnosis(dataset.index, name, value);
    }
    render() {
        const diagnosises = this.props.diagnosisListItemStore.diagnosises || [];
        const { editableDiagnosis } = this.props.commentStore;
        const disabledDelete = editableDiagnosis.length === 1 ? true : false;
        return (
            <div className={cx('Diagnosis')}>
                <h6>
                    <div className={cx('divider-horizontal')}></div>
                    <span>진단</span>
                </h6>
                <ul className={cx('diagnosis-list')}>
                    {
                        editableDiagnosis.map((diagnosis, i) => {
                            const {
                                rationale,
                                reference
                            } = diagnosis;
                            return <li data-index={i} key={i}>
                                <div className={cx('list-item-header')}>
                                    <div>#{i + 1}</div>
                                    <button 
                                        disabled={disabledDelete}
                                        data-index={i} 
                                        className={cx('delete-diagnosis')} 
                                        onClick={this.handleClickDeleteButton}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                                <div id={`diagnosis-name-input-${i}`} data-type="input-list" data-form="input-with-list-for-diagnosis" className={cx("input-list-wrapper")}>
                                    <input 
                                        placeholder="진단명"
                                        
                                        autoComplete="off"  
                                        name='name'
                                        data-index={i}
                                        value={diagnosis.name || ""}
                                        onChange={(e) => {
                                            const { dataset, name, value } = e.target;
                                            if(value === '') {
                                                this.props.diagnosisListItemStore.setCategory('', dataset.index);
                                                this.props.commentStore.handleChangeDiagnosis(dataset.index, 'category', '');
                                            }
                                            this.props.diagnosisListItemStore.setSearchKeyword(dataset.index, value);
                                            return this.props.commentStore.handleChangeDiagnosis(dataset.index, name, value);
                                        }}
                                        onKeyDown={(e) => {
                                            const { status, selectedIndex, maxIndex } = this.props.diagnosisListForInputStore;
                                            const diagnosises = this.props.diagnosisListItemStore.diagnosises || [];
                                            let index;
                                            if (e.keyCode === 27) {
                                                e.preventDefault();
                                                return this.props.diagnosisListForInputStore.clear();
                                            }
                                            if(e.keyCode === 13) {
                                                const { currentIndex } = this.props.diagnosisListForInputStore;
                                                
                                                const { selectedIndex } = this.props.diagnosisListForInputStore;
                                                if(selectedIndex > -1) {
                                                    this.props.diagnosisListForInputStore.clearForList();
                                                    this.props.diagnosisListForInputStore.setSelectedListItem(diagnosises[selectedIndex].name);
                                                    this._setInputValue(diagnosises[selectedIndex].name, diagnosises[selectedIndex].category, currentIndex);
                                                    this.props.diagnosisListItemStore.setCategory(diagnosises[selectedIndex].category, currentIndex);
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
                                                        return this.props.diagnosisListForInputStore.setSelectedIndex(index);
                                                    }
                                                }
                                                return;
                                            }
                                            if(e.keyCode === 40) {
                                                e.preventDefault();
                                                if(status === 'invisible') {
                                                    const height = $(e.target).outerHeight();
                                                    const width = $(e.target).outerWidth();
                                                    const { top, left } = $(e.target).offset();

                                                    this.props.diagnosisListForInputStore.clear();
                                                    this.props.diagnosisListForInputStore.setPosition({top, left, height, width});
                                                    this.props.diagnosisListForInputStore.setCurrentIndex(i);
                                                    return  this.props.diagnosisListForInputStore.setCurrentSection('symptom');
                                                }
                                                if(status === 'visible') {
                                                    if (selectedIndex < 0) {
                                                        index = 0;
                                                        this._scroll(index);
                                                        return this.props.diagnosisListForInputStore.setSelectedIndex(index);
                                                    }
                                                    if (selectedIndex >= 0 && selectedIndex < maxIndex) {
                                                        index = selectedIndex + 1;
                                                        this._scroll(index);
                                                        return this.props.diagnosisListForInputStore.setSelectedIndex(index);
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
                                            this.props.diagnosisListForInputStore.setPosition({top, left, height, width});
                                            this.props.diagnosisListForInputStore.setCurrentIndex(i);
                                            
                                            this.props.diagnosisListForInputStore.setCurrentSection('condition');
                                        }}
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        name='rationale'
                                        rows='3'
                                        data-index={i}
                                        value={rationale || ""}
                                        onChange={this.handleOnChange}
                                        placeholder="진단근거"
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        name='reference'
                                        rows='3'
                                        data-index={i}
                                        value={reference || ""}
                                        onChange={this.handleOnChange}
                                        placeholder="참고문헌"
                                    />
                                </div>
                            </li>
                        })
                    }
                </ul>
                <button className={cx('add-diagnosis')} onClick={this.handleClickAddButton}>
                    <TiPlus /><span>진단 추가</span>
                </button>

                {
                    editableDiagnosis.length > 0 &&
                    <ListForInput 
                        items={diagnosises}
                        setInputValue={this._setInputValue}
                        resizeHeight={this.props.resizeHeight}
                    />
                }
            </div>
        );
    }
}

export default Diagnosis;