import { observable, action } from 'mobx';

class SidebarStore {
    @observable isOpen = false;

    @action toggleIsOpen() {
        this.isOpen = !this.isOpen;
    }

    @action clearIsOpen() {
        this.isOpen = false;
    }
}

export default new SidebarStore();