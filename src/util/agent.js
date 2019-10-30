import axios from 'axios';
import { computed } from 'mobx';
// import commonStore from '../stores/commonStore';
import authStore from '../stores/authStore';

// import commonStore from '../stores/commonStore';
// import errorStore from '../stores/errorStore';
// import errorHelper from './errorHelper';
// const API_ROOT = `${process.env.REACT_APP_API_ENDPOINT}`;
const API_ROOT = `http://3.113.76.136:3000`;
const API_ROOT_EDITOR = `http://18.176.133.8:5001`;
// const API_ROOT_EDITOR = `https://cloudoc-api.herokuapp.com`;
// const API_ROOT_EDITOR = `http://localhost:5001`;

class Agent {
    constructor(baseURL = null) {
        this.axios = axios.create({ baseURL });
    }

    /** 
     * 추후 자동으로 basic end points를 생성하는 로직이 필요하다고 여겨질 때 참고
     * https://codeburst.io/how-to-call-api-in-a-smart-way-2ca572c6fe86
     */
    /* APIs */


/* ------------------------ */
    // Login & SignUp

    // signup(userInfo) {
    //     return this.axios
    //         .post('/auth/signup', 
    //         {email: userInfo.email, password: userInfo.password, name: userInfo.name})
    //         .catch(this._handleError);
    // }

    login({email, password}) {
        return this.axios
                .post('/auth/login', {email, password}, { 
                    baseURL: API_ROOT,
                    headers: { 
                    }
                })
                .catch(this._handleError);
    }

    logout({email, password}) {
        return this.axios
                .post('/auth/logout', {email, password}, { 
                    baseURL: API_ROOT,
                    headers: { 
                        
                    }
                })
                .catch(this._handleError);
    }
    signup({email, password}) {
        return this.axios
            .post(`/auth/casemaster`, {email, password}, {
                baseURL: API_ROOT_EDITOR
            })
            .catch(this._handleError);
    }

    refreshToken() {
        let { refreshToken, userid } = authStore.logOn;
        let user_id = userid;
        
        return this.axios
                .post('/auth/token', {refreshToken, user_id}, { 
                    baseURL: API_ROOT_EDITOR,
                    headers: { 
                        
                    }
                })
                .catch(this._handleError);
    }


/* ------------------------ */
    // ClouDoc - Case
    loadCases({lastCaseId, filter}) {
        if (lastCaseId === '') {
            return this.get(`/case/search/${filter}/init`);
        }
        return this.get(`/case/search/${filter}/${lastCaseId}`);
    }

    loadCase({caseid}) {
        return this.get(`/case/${caseid}`);
    }

    loadTodaysCases({userid}) {
        return this.get(`/case/user/${userid}/todayscase`);
    }
    loadMyCases({userid}) {
        return this.get(`/case/user/${userid}/mycase`);
    }
    loadMyComments({userid}) {
        return this.get(`/case/user/${userid}/mycomment`);
    }

    patchLike({comment_id, user_id, status}) {
        return this.patch(`/comment/${comment_id}/like`, {comment_id, user_id, status});
    }

    loadComment({comment_id}) {
        return this.get(`/comment/${comment_id}`);
    }
    
    createComment(newComment) {
        return this.post(`/comment/`, newComment);
    }

    updateComment({comment_id}, updatedComment) {
        return this.patch(`/comment/${comment_id}`, updatedComment)
    }

    deleteComment({comment_id}) {
        return this.delete(`/comment/${comment_id}`);
    }

    loadQuestions({userid}) {
        return this.get(`/case/user/${userid}/myquestion`);
    }

    loadQuestion({questionid}) {
        return this.get(`/question/${questionid}`);
    }

    createQuestion(newQuestion) {
        return this.post(`/question`, newQuestion);
    }
    
    answerQuestion({questionid, content}) {
        return this.patch(`/question/${questionid}/answer`, {content})
    }

    deleteQuestion({questionid}) {
        return this.delete(`/question/${questionid}`);
    }

    /**
     * 
     * Search API
     */

    searchCases({lastCaseId, keyword, filter}) {
        return this.post(`/case/search/${filter}/${lastCaseId}`, {keyword})
    }

    /**
     * 
     * Condition API
     */
    // Condition
    loadConditions() {
        let { logOn: {email, token} } = authStore;
        return this.axios
            .get(`/api/v1/conditions`, {
                baseURL: API_ROOT_EDITOR,
                headers: {
                    'user-type': "ADMIN",
                    'Authorization': `bearer ${token}`,
                    'email': `${email}`
                }
            })
            .catch(this._handleError);
    }

    /**
     * 
     * Drug API
     */
    // Drug
    loadDrugs() {
        let { logOn: {email, token} } = authStore;
        return this.axios
            .get(`/api/v1/drugs`, {
                baseURL: API_ROOT_EDITOR,
                headers: {
                    'user-type': "ADMIN",
                    'Authorization': `bearer ${token}`,
                    'email': `${email}`
                }
            })
            .catch(this._handleError);
    }

    loadDrug(drugId) {
        let { logOn: {email, token} } = authStore;
        return this.axios
            .get(`/api/v1/drugs/${drugId}`, {
                baseURL: API_ROOT_EDITOR,
                headers: {
                    'user-type': "ADMIN",
                    'Authorization': `bearer ${token}`,
                    'email': `${email}`
                }
            })
            .catch(this._handleError);
    }


    // postCase(newCase) {
    //     return this.post(`/cases`, newCase);
    // }

    // updateCase(caseId, updatedCase) {
    //     return this.patch(`/cases/${caseId}`, updatedCase);
    // }

    // deleteCase(caseId) {
    //     return this.delete(`/cases/${caseId}`);
    // }


    // postExcel(file) {
    //     let { token, email } = commonStore;
        
    //     return this.axios
    //     .post(`/api/v1/cases/uploadxlsx`, file, { 
    //         baseURL: API_ROOT,
    //         headers: { 
    //             'content-type': 'multipart/form-data',
    //             'Authorization': `bearer ${token}`,
    //             'email': `${email}`
    //         }
    //     })
    //     .catch(this._handleError);
    // }
    // End of Cloudoc - Case
/* ------------------------ */



    /* Base REST API method */
    get(url) {
        return this.axios
            .get(`/api${url}`, this.requestConfig)
            .catch(this._handleError);
    }
    put(url, body) {
        return this.axios
            .put(`/api${url}`, body, this.requestConfig)
            .catch(this._handleError);
    }
    patch(url, body) {
        return this.axios
            .patch(`/api${url}`, body, this.requestConfig)
            .catch(this._handleError);
    }
    post(url, body) {
        return this.axios
            .post(`/api${url}`, body, this.requestConfig)
            .catch(this._handleError);
    }
    delete(url) {
        return this.axios
            .delete(`/api${url}`, this.requestConfig)
            .catch(this._handleError);
    }

    @computed get requestConfig() {
        let requestConfig = { 
            baseURL: API_ROOT,
            headers: {} 
        };
        let { logOn: {email, token} } = authStore;
        requestConfig.headers['user-type'] = "ADMIN";
        
        if (token) { requestConfig.headers['Authorization'] = `bearer ${token}`; }
        if (email) { requestConfig.headers['email'] = `${email}`; }

        return requestConfig;
    }


    _handleError(error) {
        authStore.errorHelper(error.response.data);
        // errorHelper.handleErrorCode(error.response);
        // console.log('handle error : ', error.response);
        // errorStore.setErrorInfo(error.response.data);
        // 로그아웃을 해야할 에러일때 처리.
        // if (error && error.response && error.response.status === 401) {
        //   authStore.logout();
        // }
        throw error.response;
    }
}

const agent = new Agent(API_ROOT);

export default agent;
