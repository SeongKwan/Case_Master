import { observable, action, computed } from 'mobx';

class WizardFormStore {
    @observable registry = [];
    @observable stepCount = 0;
    @observable currentStep = 0;
    @observable completeForm = false;

    @computed get stepTitles() {
        let stepTitles = [];
        this.registry.forEach((step) => {
            let { title } = step;
            stepTitles.push(title); 
        });
        return stepTitles;
    };

    @computed get stepComponents() {
        let stepComponent = [];
        this.registry.forEach((step) => {
            let { component } = step;
            stepComponent.push(component); 
        });
        return stepComponent;
    };

    @action initialize(stepCount, steps) {
        this.stepCount = stepCount;
        this.registry = steps;
    }

    @action prev() {
        if (this.stepCount > 0) {
            if (this.currentStep > 0) {
                return this.currentStep = this.currentStep - 1;
            }
        }
    }
    @action next() {
        if (this.currentStep === this.stepCount) {
            return false;
        }
        if (this.stepCount > 0) {
            if (this.currentStep > -1 && this.currentStep < this.stepCount - 1) {
                return this.currentStep = this.currentStep + 1;
            }
        }
    }

    @action toggleComplete() {
        this.completeForm = !this.completeForm;
    }

    @action clear() {
        this.registry = [];
        this.stepCount = 0;
        this.currentStep = 0;
    }
}

export default new WizardFormStore();