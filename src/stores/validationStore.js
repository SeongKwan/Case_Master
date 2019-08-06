import { observable, action } from 'mobx';

class ValidationStore {
    @observable validation = false;
}




export default new ValidationStore();