import { observable, action } from 'mobx';
import agent from '../util/agent';
import searchStore from './searchStore';

class CaseStore {
    @observable isLoading = false;
    @observable registry = [];
    @observable todaysCases = [];
    @observable myCases = [];
    @observable myComments = [];
    @observable theCase = {};
    @observable comments = [{}];
    @observable questions = [{}];
    @observable hasMore = true;
    @observable error = '';
    @observable lastCaseId = '';
    @observable myCaseOrNot = false;
    @observable fromWhere = '';

    @action setFromWhere(pageName) {
        this.fromWhere = pageName;
    }

    @action loadCases({lastCaseId}) {
        this.isLoading = true;
        return agent.loadCases({lastCaseId, filter: searchStore.filter})
            .then(action((response) => {
                this.isLoading = false;
                this.registry = [...this.registry, ...response.data.cases];
                this.hasMore = response.data.hasMore;
                this.lastCaseId = this.registry[this.registry.length - 1]._id;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                this.error = error;
                throw error;
            }));
    }

    @action loadTodaysCases({userid}) {
        this.isLoading = true;
        return agent.loadTodaysCases({userid})
        .then(action((response) => {
            this.isLoading = false;
            this.todaysCases = response.data;
        }))
        .catch(action((error) => {
            throw error;
        }))
    }
    @action loadMyCases({userid}) {
        this.isLoading = true;
        return agent.loadMyCases({userid})
        .then(action((response) => {
            this.myCases = response.data;
        }))
        .then(action(() => {
            this.isLoading = false;
        }))
        .catch(action((error) => {
            throw error;
        }))
    }
    @action loadMyComments({userid}) {
        this.isLoading = true;
        return agent.loadMyComments({userid})
        .then(action((response) => {
            this.isLoading = false;
            this.myComments = response.data;
        }))
        .catch(action((error) => {
            throw error;
        }))
    }

    @action loadCase({caseid}) {
        this.isLoading = true;
        return agent.loadCase({caseid})
            .then(action((response) => {
                const case_writer = response.data.case.user_id;
                const loggedUser = window.localStorage.getItem('userid');
                this.myCaseOrNot = case_writer === loggedUser ? true : false;
                this.isLoading = false;
                this.theCase = response.data;
                this.comments = response.data.comments;
                this.questions = response.data.questions;
            }))
            .catch(error => {
                throw error;
            })
    }

    @action clear() {
        this.todaysCases = [];
        this.myCases = [];
        this.myComments = [];
        this.theCase = {};
        this.comments = [];
    }
    @action clearRegistry() {
        this.registry = [];
        this.hasMore = true;
        this.lastCaseId = '';
    }
    @action clearLastCaseId() {
        this.lastCaseId = '';
    }
}

export default new CaseStore();