import { observable, action, computed } from 'mobx';
import agent from '../util/agent';
import Hangul from 'hangul-js';
import diagnosisListForInputStore from './diagnosisListForInputStore';
import _ from 'lodash';

class DiagnosisListItemStore {
    @observable isLoading = false;
    @observable category = [""];
    @observable registry = [];

    @computed get diagnosises() {
        if (this.registry.length > -1) {
            diagnosisListForInputStore.setMaxIndex(this._sorting(this._search(this.searchKeyword[diagnosisListForInputStore.currentIndex], this.registry)).length - 1);
            return this._sorting(this._search(this.searchKeyword[diagnosisListForInputStore.currentIndex], this.registry));
        }
        return [];
    }

    @computed get diagnosisesForReference() {
        return this._sorting(this._search(this.searchKeyword[diagnosisListForInputStore.currentIndex], this.registry));
    }

    @action _sorting(registry) {
        registry.sort(function (a, b) { 
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;  
        });

        return registry;
    }

    // 불러온 데이터의 특정 property에 keyword가 포함되어있는지 검색하는 필터입니다.
    @observable searchKeyword = [""]; //사용자가 검색창에 검색한 키워드
    @action setSearchKeyword = (index, searchKeyword) => { this.searchKeyword[index] = searchKeyword; }

    _search = (searchKeyword, items) => {

        items.forEach(action((item) => {
            var dis = Hangul.disassemble(item.name, true);
            var cho = dis.reduce(function (prev, elem) {
                elem = elem[0] ? elem[0] : elem;
                return prev + elem;
            }, "");
            item.diassembled = cho;
        }));

        if (!searchKeyword) return [...items];

        let searchKeywordSpacer = Hangul.disassemble(searchKeyword).join("");
        const searcher = new Hangul.Searcher(searchKeyword.toLowerCase());
        return items.filter(action((item) => {
            return searcher.search(item.name.toLowerCase()) >= 0 ? true : false
                || item.diassembled.includes(searchKeywordSpacer);
            }));
    }

    @action loadConditions() {
        this.isLoading = true;
        return agent.loadConditions()
            .then(action((response) => {
                this.registry = response.data || [];
                this.isLoading = false;
                return response.data;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    };

    @action initSearchKeyword(conditions) {
        if (this.searchKeyword.length > 0) {
            this.searchKeyword = [];
        }
        conditions.forEach(() => { this.searchKeyword.push('') });
    }

    @action setUpCategory(conditions) {
        conditions.forEach(condition => this.category.push(condition.category));
    };

    @action setCategory(category, i) {
        this.category[i] = category;
    };

    @action addCategory(category = '') {
        if (category === '') {
            return this.category = [...this.category, ''];
        }
        if (category !== '') {
            return this.category = [...this.category, category];
        }
    }

    @action addSearchKeyword(searchKeyword = '') {
        if (searchKeyword === '') {
            return this.searchKeyword = [...this.searchKeyword, ''];
        }
        if (searchKeyword !== '') {
            return this.searchKeyword = [...this.searchKeyword, searchKeyword];
        }
    }

    @action reorder(newOrderedDatas) {
        this.category = [];
        this.searchKeyword = [];
        newOrderedDatas.forEach((item) => {
            this.category.push(item.category);
            this.searchKeyword.push('');
        })
    }

    @computed get categoryForRender() {
        let filterdArray;
        filterdArray = _.uniqBy(this.registry, "category")
        return filterdArray;
    }

    @action deleteCategory(selectedIndex) {
        this.category.splice(selectedIndex, 1);
    }
    @action deleteSearchKeyword(selectedIndex) {
        this.searchKeyword.splice(selectedIndex, 1);
    }

    @action clear() {
        this.isLoading = false;
        this.category = [""];
        this.registry = [];
        this.clearSearchKeyword();
    }

    @action clearSearchKeyword() {
        this.searchKeyword = [""];
    }

    @action clearCategory() {
        this.category = [""];
    }

    @action clearRegistry() {
        this.registry = [];
        
    }
}

export default new DiagnosisListItemStore()