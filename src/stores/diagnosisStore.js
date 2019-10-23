import { observable, action } from 'mobx';
import diagnosisListItemStore from './diagnosisListItemStore';

class DiagnosisStore {
    @observable staticData = [];
    @observable editableData = [];

    @action setEditableData(editableData) {
        if (this.editableData.length > 0) {
            this.editableData = [];
        }
        JSON.parse(JSON.stringify(editableData)).forEach((editableData) => { 
            
            editableData.isPopoverOpen = false;
            this.editableData.push(editableData);
            
        });

    }

    @action handleChange(index, key, value = "") {
        this.editableData[index][key] = value;
    }

    @action setCategoryByAutoList(category, index) {
        this.editableData[index]['category'] = category;
    }

    @action addDiagnosis(data = null) {
        if (!data) {
            this.staticData = [...this.staticData, {
                category: '',
                name: '',
                description: '',
                strategy: '',
            }];
            return this.editableData = [...this.editableData, {
                category: '',
                name: '',
                description: '',
                strategy: '',
            }];
        }
        if (data) {
            if (this.staticData.filter(item => item.name === data.name).length > 0) {
                return alert('같은 진단이 이미 존재합니다');
            }
            diagnosisListItemStore.addCategory(data.category);
            diagnosisListItemStore.addSearchKeyword();
            this.staticData = [...this.staticData, {
                category: data.category,
                name: data.name,
                description: '',
                strategy: '',
            }];

            if (this.editableData.filter(item => item.name === data.name).length > 0) {
                return alert('같은 진단이 이미 존재합니다');
            }
            diagnosisListItemStore.addCategory(data.category);
            diagnosisListItemStore.addSearchKeyword();
            return this.editableData = [...this.editableData, {
                category: data.category,
                name: data.name,
                description: '',
                strategy: '',
            }];
        }
        
    }

    @action deleteDiagnosis(selectedIndex) {
        this.editableData.splice(selectedIndex, 1);
        this.staticData.splice(selectedIndex, 1);
        diagnosisListItemStore.deleteCategory(selectedIndex);
        diagnosisListItemStore.deleteSearchKeyword(selectedIndex);
    }





    // Sorting
    @observable conditionsForReadOnly = [];
    @observable sortingType = {
            category: 'up',
            testName: ''
    };

    @action _sorting(type = 'editable') {
        const { 
            category, 
            testName,
        } = this.sortingType;

        let items = [];

        if (type === 'editable') {
            this.editableData.forEach((item) => { items.push(item); });
    
            if (category === 'up') {
                items.sort(function (a, b) { 
                    return a.category < b.category ? -1 : a.category > b.category ? 1 : 0;  
                });
            }
            else if (category === 'down') {
                items.sort(function (a, b) { 
                    return a.category > b.category ? -1 : a.category < b.category ? 1 : 0;  
                });
            }
    
            else if (testName === 'up') {
                items.sort(function (a, b) { 
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;  
                });
            }
            else if (testName === 'down') {
                items.sort(function (a, b) { 
                    return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;  
                });
            }
    
            diagnosisListItemStore.reorder(items);
            return this.editableData = items;
        }

        if (type === 'readOnly') {
            this.conditionsForReadOnly.forEach((item) => { items.push(item); });
    
            if (category === 'up') {
                items.sort(function (a, b) { 
                    return a.category < b.category ? -1 : a.category > b.category ? 1 : 0;  
                });
            }
            else if (category === 'down') {
                items.sort(function (a, b) { 
                    return a.category > b.category ? -1 : a.category < b.category ? 1 : 0;  
                });
            }
    
            else if (testName === 'up') {
                items.sort(function (a, b) { 
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;  
                });
            }
            else if (testName === 'down') {
                items.sort(function (a, b) { 
                    return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;  
                });
            }
    
            diagnosisListItemStore.reorder(items);
            return this.conditionsForReadOnly = items;
        }
    }

    @action initializeConditionsForReadOnly(conditions) {
        this.conditionsForReadOnly = conditions;
    }

    @action setClassNameToTh(type) {
        if (type === 'category') {
            if ( this.sortingType.category === 'up') {
                return this.changeSortingType(type, 'down');
            } else if (this.sortingType.category === 'down' || this.sortingType.category === '') {
                return this.changeSortingType(type, 'up');
            }
        } else if (type === 'name') {
            if (this.sortingType.testName === 'up') {
                return this.changeSortingType(type, 'down');
            } 
            if (this.sortingType.testName === 'down' || this.sortingType.testName === '') {
                return this.changeSortingType(type, 'up');
            }
        }
    }

    @action changeSortingType(type, direction) {
        this.sortingType = {
            category: '',
            testName: ''
        };
        if (type === 'name') {
            return this.sortingType['testName'] = direction;
        }
        return this.sortingType[type] = direction;
    }

    @action clearSortingType() {
        this.sortingType = {
            category: 'up',
            testName: ''
        };
    }

    @action clear() {
        this.staticData = [];
        this.editableData = [];
    }

    @action deleteAllInputValue() {
        this.editableData = [];
    }
}

export default new DiagnosisStore()