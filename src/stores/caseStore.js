import { observable, action, computed } from 'mobx';
import agent from '../util/agent';

class CaseStore {
    @observable isLoading = false;
    @observable registry = [];
    @observable theCase = {};

    @computed get updatedCases() {
        return this.registry;
    }

    @action loadCases() {
        this.isLoading = true;
        return agent.loadCases()
            .then(action((response) => {
                this.isLoading = false;
                this.registry = response.data;
            }))
            .catch(error => {
                throw error;
            });
    }

    @action loadCase({caseid}) {
        this.isLoading = true;
        return agent.loadCase({caseid})
            .then(action((response) => {
                this.isLoading = false;
                this.theCase = response.data;
            }))
            .catch(error => {
                throw error;
            })
    }
}

export default new CaseStore();