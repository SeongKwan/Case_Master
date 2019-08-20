import { observable, action, computed } from 'mobx';
import momentHelper from '../util/momentHelper';
import agent from '../util/agent';
import swiperStore from './swiperStore';

class questionStore {
    @observable content = '';
    @observable registry = [];
    @observable isLoading = false;
    @observable currentQuestion = {};
    @observable initQuestion = {};
    @observable answering = false;
    @observable answerContent = '';

    @action handleChangeContent(value) {
        this.content = value;
    }

    @computed get questions() {
        let questions = [];
        questions = this.registry.slice().sort((a, b) => {
            let prev, next
            prev = momentHelper.toUnix(a.createdDate);
            next = momentHelper.toUnix(b.createdDate);
            return prev > next ? -1 : prev < next ? 1 : 0;
        })
        
        return questions;
    }

    @action loadQuestions({userid}) {
        this.isLoading = true;
        return agent.loadQuestions({userid})
            .then(action((response) => {
                const { questionByUser, questionFromUser } = response.data;
                this.registry = [...this.registry, ...questionByUser];
                this.registry = [...this.registry, ...questionFromUser];
            }))
            .catch(action((error) => {
                throw error;
            }))
    }

    @action loadQuestion({questionid}) {
        this.isLoading = true;
        return agent.loadQuestion({questionid})
            .then(action((response) => {
                this.isLoading = false;
                this.currentQuestion = response.data;
            }))
            .catch(action((error) => {
                throw error;
            }))
    }

    @action createQuestion({case_id, questioner_id, questioner_name}) {
        this.isLoading = true;
        let newQuestion = {
            case_id: case_id,
            questioner_id: questioner_id,
            questioner_name: questioner_name,
            content: ''
        };
        newQuestion.content = this.content;

        return agent.createQuestion(newQuestion)
        .then(action((response) => {
            this.isLoading = false;
            return response;
        }))
        .catch(action((error) => {
            throw error;
        }))
    }

    @action answerQuestion({questionid}) {
        this.isLoading = true;
        return agent.answerQuestion({questionid, content: this.answerContent})
            .then(action((response) => {
                this.isLoading = false;
                this.currentQuestion = response.data.updatedQuestion;
                alert('답변이 완료되었습니다');
            }))
            .catch(action((error) => {
                throw error;
            }))
    }

    @action deleteQuestion({questionid}) {
        this.isLoading = true;
        return agent.deleteQuestion({questionid})
        .then(action((response) => {
            this.isLoading = false;
            swiperStore.setCurrentSlide(2);
        }))
        .catch(action((error) => {
            throw error;
        }))
    }

    @action toggleAnswering() {
        this.answering = !this.answering;
    }

    @action changeAnswer(value) {
        this.answerContent = value;
    }

    @action clear() {
        this.content = '';
        this.currentQuestion = {};
        this.initQuestion = {};
        this.answerContent = '';
        this.registry = [];
        this.answering = false;
    }

    @action clearAnswer() {
        this.answerContent = '';
    }

}

export default new questionStore();