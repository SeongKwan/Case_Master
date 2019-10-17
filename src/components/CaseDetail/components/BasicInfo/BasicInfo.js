import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './BasicInfo.module.scss';
import { observer, inject } from 'mobx-react';
import Loader from '../../../Loader';
import Comment from '../Comment';
import Question from '../Question';
const cx = classNames.bind(styles);

@inject('sortStore')
@observer
class BasicInfo extends Component {
    _onChange = (e) => {
        const { value } = e.target;
        this.props.sortStore.handleChange(value);
    }

    render() {
        const { direction } = this.props.sortStore;
        const { Case, isLoading } = this.props;
        if (isLoading || Case === undefined || Case.case.lab.length < 0) {
            return <div className={cx('BasicInfo', 'loading')}>
                <Loader />
            </div>
        }
        
        const {
            patient,
            symptom,
            exam,
            lab
        } = Case.case;
        let sortedLabs;

        sortedLabs = this.props.sortStore.sorting(lab, direction);

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
                            <div className={cx('content')}>만 {patient.age}세</div>
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
                                        <div className={cx('name')}>{name || '-'}</div>
                                        <div className={cx('value-unit')}>
                                            <span className={cx('value')}>{degree || 
                                                '-'}</span>
                                            <span className={cx('unit')}>&nbsp;[{unit || '-'}]</span>
                                        </div>
                                        <div className={cx('description')}>{description || '-'}</div>
                                    </li>
                                })
                        }
                    </ul>
                </div>
                <div className={cx('Lab')}>
                    <h6 className={cx('main-title')}>혈액검사</h6>
                    <div className={cx('sorting-box')}>
                        <select 
                            name="sort"
                            value={direction || "default"}
                            onChange={this._onChange}
                        >
                            <option value="default">분류별</option>
                            <option value="asc">상태 - 오름차순</option>
                            <option value="desc">상태 - 내림차순</option>
                        </select>
                    </div>
                    <ul>
                        {
                            sortedLabs.map((lab, i) => {
                                const {
                                    name,
                                    unit,
                                    value,
                                    state
                                } = lab;
                                let color;
                                if (state === '높음' || state === '매우 높음') {
                                    color = 'red';
                                } else if (state === '낮음' || state === '매우 낮음') {
                                    color = 'blue';
                                } else {
                                    color = 'normal';
                                }
                                return <li key={i}>
                                    <div className={cx('name')}>{name || '-'}</div>
                                    <div className={cx('value-unit')}>
                                        <span className={cx('value')}>{value || '-'}</span>
                                        <span className={cx('unit')}>[{unit || '-'}]</span>
                                    </div>
                                    <div className={cx('state', {red: color === 'red'}, {blue: color === 'blue'})}>{state || '-'}</div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className={cx('Exam')}>
                    <h6 className={cx('main-title')}>진찰</h6>
                    <ul>
                        {
                            exam.length === 0 ? 
                            <div className={cx('empty-exam')}>진찰 내용이 없습니다</div>
                            : exam.map((exam, i) => {
                                const {
                                    name,
                                    unit,
                                    value,
                                    description
                                } = exam;

                                return <li key={i}>
                                    <div className={cx('name')}>{name || '-'}</div>
                                    <div className={cx('value-unit')}>
                                        <span className={cx('value')}>{value || '-'}</span>
                                        <span className={cx('unit')}>[{unit || '-'}]</span>
                                    </div>
                                    <div className={cx('description')}>{description || '-'}</div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className={cx('drug')}>
                    <h6 className={cx('main-title')}>진단-처방</h6>
                    <Comment comments={this.props.comments} isLoading={this.props.isLoading} />
                </div>
                <div className={cx('question')}>
                    <h6 className={cx('main-title')}>질의응답</h6>
                    <Question where='basicInfo' questions={this.props.questions} isLoading={this.props.isLoading} />
                </div>
            </div>
        );
    }
}


export default BasicInfo;

