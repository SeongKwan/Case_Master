import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './BasicInfo.module.scss';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject()
@observer
class BasicInfo extends Component {
    render() {
        return (
            <div className={cx('BasicInfo')}>
                <div className={cx('PatientInfo')}>
                    <h6 className={cx('main-title')}>환자정보</h6>
                    <ul>
                        <li>
                            <div className={cx('sub-title', 'gender')}>성별</div>
                            <div className={cx('content')}>남</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'age')}>연령</div>
                            <div className={cx('content')}>만 24세</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'past')}>과거력</div>
                            <div className={cx('content')}>과거력별무</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'family')}>가족력</div>
                            <div className={cx('content')}>가족력별무</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'social')}>사회력</div>
                            <div className={cx('content')}>사회력별무</div>
                        </li>
                        <li>
                            <div className={cx('sub-title', 'note')}>환자메모</div>
                            <div className={cx('content')}>별무</div>
                        </li>
                    </ul>
                </div>
                <div className={cx('Symptom')}>
                    <h6 className={cx('main-title')}>증상</h6>
                    <ul>
                        <li>
                            <div className={cx('name')}>피로</div>
                            <div className={cx('value-unit')}>
                                <span className={cx('value')}>7</span>
                                <span className={cx('unit')}>NRS</span>
                            </div>
                            <div className={cx('description')}>증상상태</div>
                        </li>
                        <li>
                            <div className={cx('name')}>두통</div>
                            <div className={cx('value-unit')}>
                                <span className={cx('value')}>7</span>
                                <span className={cx('unit')}>NRS</span>
                            </div>
                            <div className={cx('description')}>증상상태</div>
                        </li>
                        <li>
                            <div className={cx('name')}>소화불량</div>
                            <div className={cx('value-unit')}>
                                <span className={cx('value')}>7</span>
                                <span className={cx('unit')}>NRS</span>
                            </div>
                            <div className={cx('description')}>증상상태</div>
                        </li>
                    </ul>
                </div>
                <div className={cx('Lab')}>
                    <h6 className={cx('main-title')}>혈액검사</h6>
                    <ul>
                        <li>
                            <div className={cx('name')}>검사명</div>
                            <div className={cx('value-unit')}>
                                <span className={cx('value')}>7</span>
                                <span className={cx('unit')}>UI</span>
                            </div>
                            <div className={cx('state')}>High or Low</div>
                        </li>
                        <li>
                            <div className={cx('name')}>검사명</div>
                            <div className={cx('value-unit')}>
                                <span className={cx('value')}>7</span>
                                <span className={cx('unit')}>UI</span>
                            </div>
                            <div className={cx('state')}>High or Low</div>
                        </li>
                        <li>
                            <div className={cx('name')}>검사명</div>
                            <div className={cx('value-unit')}>
                                <span className={cx('value')}>7</span>
                                <span className={cx('unit')}>UI</span>
                            </div>
                            <div className={cx('state')}>High or Low</div>
                        </li>
                    </ul>
                </div>
                <div className={cx('Exam')}>
                    <h6 className={cx('main-title')}>진찰</h6>
                    <ul>
                        <li>
                            <div className={cx('name')}>진찰명</div>
                            <div className={cx('value-unit')}>
                                <span className={cx('value')}>7</span>
                                <span className={cx('unit')}>도</span>
                            </div>
                            <div className={cx('description')}>진찰설명</div>
                        </li>
                        <li>
                            <div className={cx('name')}>진찰명</div>
                            <div className={cx('value-unit')}>
                                <span className={cx('value')}>7</span>
                                <span className={cx('unit')}>도</span>
                            </div>
                            <div className={cx('description')}>진찰설명</div>
                        </li>
                        <li>
                            <div className={cx('name')}>진찰명</div>
                            <div className={cx('value-unit')}>
                                <span className={cx('value')}>7</span>
                                <span className={cx('unit')}>도</span>
                            </div>
                            <div className={cx('description')}>진찰설명</div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default BasicInfo;