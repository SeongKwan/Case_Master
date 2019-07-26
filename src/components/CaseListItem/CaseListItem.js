import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './CaseListItem.module.scss';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import { FiHash } from "react-icons/fi";
import { TiEye } from "react-icons/ti";
import { FaNotesMedical } from "react-icons/fa";

const cx = classNames.bind(styles);

@withRouter
@inject()
@observer
class CaseListItem extends Component {
    handleClick = (_id) => {
        let caseid = _id; 
        this.props.history.push(`/caseDetail/${caseid}`);
    }

    render() {
        const {
            _id,
            case: {
                patient,
                record,
                // user_id
            }
        } = JSON.parse(JSON.stringify(this.props.item))
        let updatedRecordIndex = record.length - 1;
        let updatedSymptom = record[updatedRecordIndex].symptom;

        return (
            <li className={cx('CaseListItem')} onClick={() => {this.handleClick(_id)}}>
                <div className={cx('list-item-container')}>
                    <div className={cx('status-bar')}>
                        {/* <div className={cx('case-id')}>
                            <span><FiHash /></span>{_id}
                        </div> */}
                        <div className={cx('view-count')}>
                            <span><TiEye /></span>28
                        </div>
                        <div className={cx('comment-count')}>
                            <span><FaNotesMedical /></span>7
                        </div>
                    </div>
                    <div className={cx('basic-info')}>
                        <div className={cx('gender')}>{patient.gender}</div>
                        <div className={cx('divider-vertical')}></div>
                        <div className={cx('age')}>{patient.age}</div>
                    </div>
                    <div className={cx('symptom')}>
                        <div className={cx('title')}>증상</div>
                        <ul className={cx('symptom-list')}>
                            {
                                updatedSymptom.map((symptom, i) => {
                                    return <li key={i} className={cx('symptom-item')}>&bull;&nbsp;{symptom.name}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </li>
        );
    }
}

export default CaseListItem;