import { observable, action } from 'mobx';
import agent from '../util/agent';

class SearchStore {
    @observable keywords = [];
    @observable searchKeyword = '';
    @observable filter = 'date';

    @action changeSearchKeyword(value) {
        this.searchKeyword = value;
    }

    @action searchCases() {
        let array, filteredArray = [];
        this.searchKeyword = this.searchKeyword.trim(); // 검색문자열 앞뒤 공백제거
        array = this.searchKeyword.split(' ');
        filteredArray = array.filter(arr => arr !== ''); // 검색문자배열의 공백요소 제거
        this.keywords = filteredArray;
        let keywords = this.keywords;
        this.searchKeyword = filteredArray.join(' '); // 검색문자열 재정렬

        return agent.searchCases({keywords, filter: this.filter });
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