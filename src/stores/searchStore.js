import { observable, action, reaction } from 'mobx';
import agent from '../util/agent';

class SearchStore {
    @observable registry = [];
    @observable searchRegistry = [];
    @observable keywords = [];
    @observable searchKeyword = '';
    @observable filter = 'date';
    @observable hasMore = false;
    @observable lastCaseId = '';
    @observable error = '';
    @observable noResult = false;
    @observable onSearching = false;
    @observable isLoading = false;

    constructor() {
        reaction(() => this.searchKeyword, async (v) => { 
            if (v === '') {
                await this.notSearching();
                await this.clearForSearch();
                await this.searchCases();
            }
        });
    }

    @action changeSearchKeyword(value) {
        this.searchKeyword = value;
    }

    @action searching() {
        this.onSearching = true;
    }
    @action notSearching() {
        this.onSearching = false;
    }

    @action searchCases() {
        this.isLoading = true;
        let array, filteredArray = [];
        this.searchKeyword = this.searchKeyword.trim(); // 검색문자열 앞뒤 공백제거
        array = this.searchKeyword.split(' ');
        filteredArray = array.filter(arr => arr !== ''); // 검색문자배열의 공백요소 제거
        this.keywords = filteredArray;
        // let keywords = this.keywords;
        this.searchKeyword = filteredArray.join(' '); // 검색문자열 재정렬
        if (this.lastCaseId === '') {
            this.lastCaseId = 'init';
        }

        if (this.searchRegistry.length === 0 && this.onSearching) {
            this.lastCaseId = 'init';
        }
        
        return agent.searchCases({lastCaseId: this.lastCaseId, keyword: this.searchKeyword, filter: this.filter })
            .then(action((response) => {
                this.isLoading = false;
                const {
                    cases,
                    hasMore,
                    searchResults,
                    init,
                    noResult
                } = response.data;
                if (searchResults) {
                    if (init && cases.length === 0) {
                        this.noResult = noResult || false;
                    }
                    if (init) {
                        this.searchRegistry = [];
                        this.searchRegistry = [...this.searchRegistry, ...cases];
                    } else if (!init) {
                        this.searchRegistry = [...this.searchRegistry, ...cases];
                    }
                    if (this.searchRegistry[this.searchRegistry.length - 1] !== undefined) {
                        this.lastCaseId = this.searchRegistry[this.searchRegistry.length - 1]._id;
                    } else {
                        this.lastCaseId = '';
                    }
                } else {
                    if (init) {
                        this.registry = []
                        this.registry = [...this.registry, ...cases];
                    } else {
                        this.registry = [...this.registry, ...cases];
                    }
                    this.lastCaseId = this.registry[this.registry.length - 1]._id;
                }
                this.hasMore = hasMore;
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
        this.registry = [];
        this.searchRegistry = [];
        this.hasMore = true;
        this.lastCaseId = '';
        this.searchKeyword = '';
        this.searchKeywords = [];
        this.onSearching = false;
        this.noResult = false;
    }
    @action clearForSearch() {
        this.registry = [];
        this.searchRegistry = [];
        this.hasMore = true;
        this.lastCaseId = '';
        this.noResult = false;
    }
}

export default new SearchStore();