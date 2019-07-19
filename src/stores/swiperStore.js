import { observable, action } from 'mobx';

class SwiperStore {
    @observable activeTab = 0;

    @action setCurrentSlide(index) {
        this.activeTab = Number(index);
    }

    @action clearActiveTab() {
        this.activeTab = 0;
    }
}

export default new SwiperStore();