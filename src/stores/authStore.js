import { observable, action, computed } from 'mobx';
import agent from '../util/agent';

class AuthStore {
    @observable errors = null;
    @observable userInfo = {
        email: null,
        password: null
    }
    @observable logOn = {
        email: window.localStorage.getItem('email'),
        token: window.localStorage.getItem('token')
    }
    @observable token = null;
    @observable isLoading = false;
    @observable isLoggedIn = false;
    // @observable token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2QzNjNiMzc1MTQ4NzAwMDRhYmEyZTQiLCJpYXQiOjE1NjM5NDEzOTV9.dlIbVtJIJDD8Co4IJeGVuczk4wJg2xww2yazdtaGLq4';

    @computed get isLogged() {
        if (this.logOn.email !== null && this.logOn.email !== undefined) {
            return true;
        }
        if (this.isLoggedIn) {
            return true;
        }
        return false;
    }

    @action changeInput(key, value) {
        this.userInfo[key] = value;
    }

    @action login() {
        this.isLoading = true;
        this.errors = null;
        let { email, password } = this.userInfo;
        return agent.login({ email, password })
        .then(action((res) => {
            let { 
                token
            } = res.data;
            if (res.status === 200) {
                this.token = token;
                this.isLoading = false;
                this.isLoggedIn = true;
                this.setLocalStorage(token, this.userInfo.email);

                alert(res.data.message);
                window.location.href = '/main/updatedCase';
                return res.data;
            }
        }))
        .catch(action((err) => {
            this.errors = err.response && err.response.body && err.response.body.errors;
            this.isLoading = false;
            this.isLoggedIn = true;
            // const { email, password } = err.data.errors || {};
            // const { message } = err.data || {};

            // if (email && !password) {
            //     alert('이메일을 입력해 주세요');
            //     throw err;
            // } 
            // if (!email && password) {
            //     alert('비밀번호를 입력해 주세요');
            //     throw err;
            // } 
            // if (email && password) {
            //     alert(message);
            //     throw err;
            // }
            // if (message === "unregistered email") {
            //     this.clear();
            //     alert("등록되지 않은 이메일 입니다.");
            //     throw err;
            // } 
            // if (message === "Incorrect password") {
            //     this.userInfo.password = '';
            //     alert('틀린 비밀번호 입니다');
            //     throw err;
            // }
            console.log(err);
            alert(err);
        }));
    }

    @action setLocalStorage(token, email) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('email', email);
    }

    @action clearUserInfo() {
        this.userInfo.email = null;
        this.userInfo.password = null;
    }

    @action clearLocalStorage() {
        window.localStorage.clear();
    }

    @action clearIsLogged() {
        this.isLogged = false;
    }

    @action clear() {
        this.token = null;
        this.clearUserInfo();
        this.clearLocalStorage();
    };
}

export default new AuthStore();