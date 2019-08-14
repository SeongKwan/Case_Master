import axios from 'axios';
import { computed } from 'mobx';
// import commonStore from '../stores/commonStore';
import authStore from '../stores/authStore';

// import commonStore from '../stores/commonStore';
// import errorStore from '../stores/errorStore';
// import errorHelper from './errorHelper';
// const API_ROOT = `${process.env.REACT_APP_API_ENDPOINT}`;
const API_ROOT = `http://3.113.76.136:3000`;
const API_ROOT_EDITOR = `https://cloudoc-api.herokuapp.com`;

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


/* ------------------------ */
    // ClouDoc - Case
    loadCases({lastCaseId}) {
        if (lastCaseId === '') {
            return this.get(`/case/search/init`);
        }
        return this.get(`/case/search/${lastCaseId}`);
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

    createQuestion(newQuestion) {
        return this.post(`/question`, newQuestion);
    }
    
    /**
     * 
     * Search API
     */

    searchCases({keywords, filter}) {
        return this.get(`/case/search/${filter}`, {keywords})
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
        if (!error.response) {
            // 서버 꺼져있을때 에러 핸들링
            throw error;
        }
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
