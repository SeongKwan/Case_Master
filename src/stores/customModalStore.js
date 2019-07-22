import { observable, action } from 'mobx';

class CustomModalStore {
    @observable isOpenModal = false;
    @observable content = '';

    @action openModal() {
        this.isOpenModal = true;
    }

    @action closeModal() {
        this.isOpenModal = false;
        this.content = '';
    }

    @action setContent(content) {
        this.content = content;
    }

    @action clear() {
        this.isOpenModal = false;
        this.content = '';
    };
}

export default new CustomModalStore();