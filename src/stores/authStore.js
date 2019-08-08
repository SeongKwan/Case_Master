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
        username: window.localStorage.getItem('username'),
        userId: window.localStorage.getItem('userid'),
        token: window.localStorage.getItem('token')
    }
    @observable token = null;
    @observable isLoading = false;
    @observable isLoggedIn = false;

    @computed get isLogged() {
        if (this.logOn.email !== null && this.logOn.email !== undefined && this.logOn.token !== null) {
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
                token,
                user
            } = res.data;
            if (res.status === 200) {
                this.token = token;
                this.isLoading = false;
                this.isLoggedIn = true;
                this.setLocalStorage(token, this.userInfo.email, user.user_id, user.name);

                window.location.href = '/main';
                return res.data;
            }
        }))
        .catch(action((err) => {
            this.errors = err.response && err.response.body && err.response.body.errors;
            this.isLoading = false;
            this.isLoggedIn = false;
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
            return alert(err);
        }));
    }

    @action setLocalStorage(token, email, userid, username) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('userid', userid);
        window.localStorage.setItem('username', username);
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