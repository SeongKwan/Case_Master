import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './WizardForm.module.scss';
import { observer, inject } from 'mobx-react';
import ProgressBar from './components/ProgressBar';
import ControlButton from './components/ControlButton';
import ConfirmComment from './components/ConfirmComment';
const cx = classNames.bind(styles);

@inject('wizardFormStore', 'commentStore')
@observer
class WizardForm extends Component {
    componentDidMount() {
        const { stepCount, steps } = this.props;
        this.props.wizardFormStore.initialize(stepCount, steps);
    }
    handleClickOnConfirm = () => {
        this.props.completeAction();
    }
    render() {
        const { stepCount } = this.props;
        const { stepTitles, stepComponents, currentStep, completeForm } = this.props.wizardFormStore;
        
        return (
            <div className={cx('WizardForm')}>
                <ProgressBar stepCount={stepCount} title={stepTitles} />
                {
                    !completeForm &&
                    stepComponents.map((component, i) => {
                        return <div className={cx('step-component', {active: currentStep === i})} key={i}>
                            {component}
                        </div>
                    })
                }
                {
                    completeForm && 
                    <div className={cx('confirm-submit-container')}>
                        <ConfirmComment />
                    </div>
                }
                <ControlButton confirm={this.handleClickOnConfirm} />
            </div>
        );
    }
}

export default WizardForm;