import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './ProgressBar.module.scss';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('wizardFormStore')
@observer
class ProgressBar extends Component {
    render() {
        const { title } = this.props;
        const { currentStep, completeForm } = this.props.wizardFormStore;
        return (
            <div className={cx('ProgressBar')}>
                <ul>
                    {
                        title.map((title, i) => {
                            return <li key={i}>
                                <div className={cx('count-title-box', {active: currentStep === i}, {done: currentStep > i}, {complete: completeForm})}>
                                    <span className={cx('step-count')}>{i + 1}</span>
                                    <span className={cx('step-title')}>{title}</span>
                                </div>
                            </li>;
                        })
                    }
                    <div className={cx('progress')}>
                        <div className={cx('progress-bar', 'frame')}></div>
                        <div id='progressbar' className={cx('progress-bar', {active: currentStep > 0})}></div>
                    </div>
                </ul>
            </div>
        );
    }
}

export default ProgressBar;