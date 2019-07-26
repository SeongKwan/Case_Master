import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './BasicInfo.module.scss';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject()
@observer
class BasicInfo extends Component {
    render() {
        const { Case, isLoading } = this.props;
        if (isLoading || Case === undefined) {
            return <div>Loading...</div>
        }
        const {
            patient,
            record,
            user_id,
            _id
        } = Case;
        let lengthOfRecord = record.length - 1;

        const {
            symptom,
            exam,
            lab
        } = record[lengthOfRecord];

        return (
            <div className={cx('BasicInfo')}>
                <div className={cx('PatientInfo')}>
                    <h6 className={cx('main-title')}>환자정보</h6>
                    <ul>
                        <li>
                            <div className={cx('sub-title', 'gender')}>성별</div>
                            <div className={cx('content')}>{patient.gender}</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'age')}>연령</div>
                            <div className={cx('content')}>만 {patient.age}</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'past')}>과거력</div>
                            <div className={cx('content')}>{patient.pastHistory}</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'family')}>가족력</div>
                            <div className={cx('content')}>{patient.familyHistory}</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'social')}>사회력</div>
                            <div className={cx('content')}>{patient.socialHistory}</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'note')}>환자메모</div>
                            <div className={cx('content')}>{patient.memo}</div>
                        </li>
                    </ul>
                </div>
                <div className={cx('Symptom')}>
                    <h6 className={cx('main-title')}>증상</h6>
                    <ul>
                        {
                            symptom.map((symptom, i) => {
                                const {
                                    name,
                                    degree,
                                    unit,
                                    description
                                } = symptom;
                                return <li key={i}>
                                        <div className={cx('name')}>{name}</div>
                                        <div className={cx('value-unit')}>
                                            <span className={cx('value')}>{degree}</span>
                                            <span className={cx('unit')}>&nbsp;[{unit}]</span>
                                        </div>
                                        <div className={cx('description')}>{description}</div>
                                    </li>
                                })
                        }
                    </ul>
                </div>
                <div className={cx('Lab')}>
                    <h6 className={cx('main-title')}>혈액검사</h6>
                    <ul>
                        {
                            lab.map((lab, i) => {
                                const {
                                    name,
                                    unit,
                                    value,
                                    state
                                } = lab;
                                return <li key={i}>
                                    <div className={cx('name')}>{name}</div>
                                    <div className={cx('value-unit')}>
                                        <span className={cx('value')}>{value}</span>
                                        <span className={cx('unit')}>{unit}</span>
                                    </div>
                                    <div className={cx('state')}>{state}</div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className={cx('Exam')}>
                    <h6 className={cx('main-title')}>진찰</h6>
                    <ul>
                        {
                            exam.map((exam, i) => {
                                const {
                                    name,
                                    unit,
                                    value,
                                    description
                                } = exam;

                                return <li key={i}>
                                    <div className={cx('name')}>{name}</div>
                                    <div className={cx('value-unit')}>
                                        <span className={cx('value')}>{value}</span>
                                        <span className={cx('unit')}>{unit}</span>
                                    </div>
                                    <div className={cx('description')}>{description}</div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default BasicInfo;