import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Diagnosis.module.scss';
import { observer, inject } from 'mobx-react';
import { FaTrashAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";

const cx = classNames.bind(styles);

@inject('commentStore')
@observer
class Diagnosis extends Component {
    handleClickAddButton = () => {
        this.props.commentStore.addDiagnosis();
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
        const { editableDiagnosis } = this.props.commentStore;
        const disabledDelete = editableDiagnosis.length === 1 ? true : false;
        return (
            <div className={cx('Diagnosis')}>
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
                                <div>
                                    <input 
                                        autoComplete="off"  
                                        name='name'
                                        data-index={i}
                                        type='text'
                                        value={name || ""}
                                        onChange={this.handleOnChange}
                                        placeholder="진단명"
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
                    <TiPlus />
                </button>
            </div>
        );
    }
}

export default Diagnosis;