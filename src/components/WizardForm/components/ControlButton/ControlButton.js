import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './ControlButton.module.scss';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

const cx = classNames.bind(styles);

@withRouter
@inject('wizardFormStore')
@observer
class ControlButton extends Component {
    handleClickPrev = () => {
        if (this.props.wizardFormStore.currentStep === this.props.wizardFormStore.stepCount - 1 && this.props.wizardFormStore.completeForm === true) {
            return this.props.wizardFormStore.toggleComplete();
        }
        this.props.wizardFormStore.prev();
        const { currentStep, stepCount } = this.props.wizardFormStore;
        let p = currentStep * (100 / (stepCount - 1));
        $("#progressbar").width(p + '%');
    }
    handleClickNext = () => {
        if (this.props.wizardFormStore.currentStep === this.props.wizardFormStore.stepCount - 1) {
            return this.props.wizardFormStore.toggleComplete();
        }
        this.props.wizardFormStore.next();
        const { currentStep, stepCount } = this.props.wizardFormStore;
        let p = currentStep * (100 / (stepCount - 1));
        $("#progressbar").width(p + '%');
    }
    handleClickComplete = () => {
        this.props.confirm()
    }
    render() {
        const { 
            currentStep,
            stepCount,
            completeForm 
        } = this.props.wizardFormStore;
        return (
            <div className={cx('ControlButton', {start: currentStep === 0})}>
                {
                    (currentStep > 0 && currentStep < stepCount) &&
                    <button onClick={this.handleClickPrev}>이전</button>
                }
                {
                    (currentStep >= 0 && currentStep < stepCount && !completeForm) &&
                    <button disabled={completeForm} onClick={this.handleClickNext}>다음</button>
                }
                {
                    completeForm && 
                    <button onClick={this.handleClickComplete}>완료</button>
                }
            </div>
        );
    }
}

export default ControlButton;