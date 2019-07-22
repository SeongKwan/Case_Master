import { observable, action } from 'mobx';

class CaseDetailStore {
    @observable activeSlideKey = '0';

    @action setActiveSlideKey(key) {
        this.activeSlideKey = key;
    };

    @action clear() {
        this.activeSlideKey = '0';
    };
}

export default new CaseDetailStore();