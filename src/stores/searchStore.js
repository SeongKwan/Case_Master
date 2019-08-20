import { observable, action } from 'mobx';
import agent from '../util/agent';

class SearchStore {
    @observable registry = [];
    @observable keywords = [];
    @observable searchKeyword = '';
    @observable filter = 'date';
    @observable hasMore = false;
    @observable lastCaseId = '';
    @observable error = '';
    @action changeSearchKeyword(value) {
        this.searchKeyword = value;
    }

    @action searchCases() {
        let array, filteredArray = [];
        this.searchKeyword = this.searchKeyword.trim(); // 검색문자열 앞뒤 공백제거
        array = this.searchKeyword.split(' ');
        filteredArray = array.filter(arr => arr !== ''); // 검색문자배열의 공백요소 제거
        this.keywords = filteredArray;
        // let keywords = this.keywords;
        this.searchKeyword = filteredArray.join(' '); // 검색문자열 재정렬
        console.log(this.searchKeyword)
        if (this.lastCaseId === '') {
            this.lastCaseId = 'init';
        }
        return agent.searchCases({lastCaseId: this.lastCaseId, keyword: this.searchKeyword, filter: this.filter })
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

    @action setFilter(type) {
        this.filter = type;
    }

    @action clear() {
        this.searchKeyword = '';
        this.searchKeywords = [];
        this.filter = 'date';
    }
}

export default new SearchStore();