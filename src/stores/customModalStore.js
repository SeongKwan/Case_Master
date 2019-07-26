import { observable, action } from 'mobx';

class CustomModalStore {
    @observable isOpenModal = false;
    @observable content = '';
    @observable registry = {};

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

    @action setRegistry(data) {
        this.registry = data;
    }

    @action clear() {
        this.isOpenModal = false;
        this.content = '';
        this.registry = {};
    };
}

export default new CustomModalStore();