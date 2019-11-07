import { observable, action, computed, runInAction } from 'mobx';
import agent from '../util/agent';

class AuthStore {
    @observable errors = null;
    @observable isRefreshing = false;
    @observable userInfo = {
        email: null,
        password: null
    }
    @observable logOn = {
        email: window.localStorage.getItem('email'),
        username: window.localStorage.getItem('username'),
        userId: window.localStorage.getItem('userid'),
        token: window.localStorage.getItem('token'),
        refreshToken: window.localStorage.getItem('refreshToken')
    }
    @observable token = null;
    @observable refreshToken = null;
    @observable isLoading = false;
    @observable isLoggedIn = false;
    @observable signupInfo = {
        email: null,
        password: null
    }

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
    @action changeInputSignup(key, value) {
        this.signupInfo[key] = value;
    }

    @action signup() {
        this.isLoading = true;
        this.errors = null;
        const { email, password } = this.signupInfo;
        return agent.signup({email, password})
            .then(action((response) => {
                this.isLoading = false;
                console.log(response);
                const { success, message } = response.data;
                if (!success || success === undefined || success === null) {
                    return alert('이메일 또는 비밀번호가 틀립니다.')
                }
                if (success) {
                    return alert(message);
                }
                return response.data;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }))
    }

    @action login() {
        this.isLoading = true;
        this.errors = null;
        let { email, password } = this.userInfo;
        return agent.login({ email, password })
        .then(action((res) => {
            let { 
                token,
                refreshToken,
                user
            } = res.data;
            
            if (res.data.success) {
                this.token = token;
                this.refreshToken = refreshToken;
                this.isLoading = false;
                this.isLoggedIn = true;
                this.setLocalStorage(refreshToken, token, this.userInfo.email, user.user_id, user.name);
                
                window.location.href = '/main';
                return res.data;
            } else {
                this.isLoading = false;
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
            throw err;
        }));
    }

    @action setLocalStorage(refreshToken, token, email, userid, username) {
        window.localStorage.setItem('refreshToken', refreshToken);
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

    @action clearSignup() {
        this.signupInfo = {
            email: null,
            password: null
        }
    }

    @action clear() {
        this.token = null;
        this.refreshToken = null;
        this.clearUserInfo();
        this.clearLocalStorage();
    };

    @action async errorHelper(error) {
        const { type } = error;
        if (type === "refresh") {
            window.localStorage.clear();
            this.clearLocalStorage();
            this.clearUserInfo();
            return window.location.replace("http://localhost:3001/login");
        }
        if (type === "expired") {
            this.isRefreshing = true;
            return agent.refreshToken()
            .then(action( async (response) => {
                    const { token } = response.data;
                    this.token = token;
                    await window.localStorage.setItem('token', token);
                    runInAction(() => {
                        this.isRefreshing = false;
                    })
                    await window.location.reload(true);
                }))
                .catch((error) => {
                    throw error
                })
        }
    }
}

export default new AuthStore();