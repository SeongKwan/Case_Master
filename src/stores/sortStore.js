import { observable, action } from 'mobx';

class SortStore {
    @observable direction = '';

    @action handleChange(value) {
        this.direction = value;
    }

    @action sorting(labs, direction) {
        if (direction === 'asc') {
            return labs.sort(function (a, b) { 
                let first, second;
                first = preset(a.state);
                second = preset(b.state);
                return first < second ? -1 : first > second ? 1 : 0;
            });
        }
        else if (direction === 'desc') {
            return labs.sort(function (a, b) { 
                let first, second;
                first = preset(a.state);
                second = preset(b.state);
                return first > second ? -1 : first < second ? 1 : 0;
            });
        } else {
            labs.sort(function (a, b) { 
                let first, second;
                first = a.name;
                second = b.name;
                return first > second ? -1 : first < second ? 1 : 0;
            });

            return labs.sort(function (a, b) { 
                let first, second;
                first = a.category;
                second = b.category;
                return first > second ? -1 : first < second ? 1 : 0;
            });
        }
    }

    @action clear() {
        this.direction = '';
    }

}

function preset(value) {
    if (value === '매우 낮음') return -2;
    if (value === '낮음') return -1;
    if (value === '최적') return 0;
    if (value === '높음') return 1;
    if (value === '매우 높음') return 2;
}

export default new SortStore();