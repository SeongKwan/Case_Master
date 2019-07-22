import { observable, action } from 'mobx';

class CommonStore {
    @observable cover = false;

    @action coverApp() {
        this.cover = true;
    }

    @action uncoverApp() {
        this.cover = false;
    }

    @action clearCover() {
        this.cover = false;
    };
}

export default new CommonStore();