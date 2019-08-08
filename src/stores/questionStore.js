import { observable, action } from 'mobx';
import agent from '../util/agent';

class questionStore {
    @observable content = '';

    @action handleChangeContent(value) {
        this.content = value;
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