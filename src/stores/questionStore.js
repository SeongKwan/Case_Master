import { observable, action, computed } from 'mobx';
import momentHelper from '../util/momentHelper';
import agent from '../util/agent';

class questionStore {
    @observable content = '';
    @observable registry = [];
    @observable isLoading = false;

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
            console.log(response);
            return response;
        }))
        .catch(action((error) => {
            throw error;
        }))
    }

    @action deleteQuestion({question_id}) {
        this.isLoading = true;
        return agent.deleteQuestion({question_id})
        .then(action((response) => {
            this.isLoading = false;
            console.log(response);
        }))
        .catch(action((error) => {
            throw error;
        }))
    }

    @action clear() {
        this.content = '';
    }


}

export default new questionStore();