import { observable, action } from 'mobx';
import caseStore from './caseStore';
import customModalStore from './customModalStore';
import commonStore from './commonStore';
import agent from '../util/agent';

class CommentStore {
    @observable registry = [];
    @observable testCount = 0;
    @observable isLoading = false;
    @observable currentComment = {};
    @observable initComment = {};
    @observable editableDiagnosis = [
        {
            name: '',
            rationale: '',
            reference: ''
        }
    ];
    @observable editableDrug = {
        drug: {
            name: ''
        },
        rationale: '',
        reference: '',
        teaching: ''
    };

    @observable editableFormula = [
        {
            herb: '',
            dose: 0,
            unit: 'g/일'
        }
    ];

    @observable editableNote = '';

    @action initEditComment() {
        this.editableDiagnosis = this.currentComment.diagnosis;
        this.editableDrug.drug.name = this.currentComment.prescription.drug.name;
        this.editableDrug.rationale = this.currentComment.prescription.rationale;
        this.editableDrug.reference = this.currentComment.prescription.reference;
        this.editableDrug.teaching = this.currentComment.prescription.teaching;
        this.editableFormula = this.currentComment.prescription.drug.fomula;
        this.editableNote = this.currentComment.note;
    }

    @action loadConditions() {
        this.isLoading = true;
        return agent.loadConditions()
            .then(action((response) => {
                this.registry = response.data || [];
                this.isLoading = false;
                console.log(response.data);
                return response.data;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    };

    @action loadComment({comment_id}) {
        this.isLoading = true;
        return agent.loadComment({comment_id})
        .then(action((response) => {
            this.isLoading = false;
            this.currentComment = response.data.comment;
            return response.data;
        }))
        .catch(action((error) => {
            throw error;
        }))
    }
    
    @action createComment({case_id, commenter_id}) {
        this.isLoading = true;
        let newComment = {
            case_id: case_id,
            commenter_id: commenter_id,
            diagnosis: [],
            prescription: {
                drug: {
                    name: '',
                    fomula: []
                },
                rationale: '',
                reference: '',
                teaching: ''
            },
            fans: [],
            status: '',
            note: ''
        };

        newComment.diagnosis = this.editableDiagnosis;
        newComment.prescription = this.editableDrug;
        newComment.prescription.drug.fomula = this.editableFormula;
        newComment.note = this.editableNote;
        newComment.status = 'posted';

        return agent.createComment(newComment)
        .then(action((response) => {
            this.isLoading = false;
            return response;
        }))
        .catch(action((error) => {
            throw error;
        }))
    }

    @action updateComment(updatedComment) {
        let replaceIndex = caseStore.comments.findIndex(item => item._id === updatedComment._id)
        caseStore.comments.splice(replaceIndex, 1, updatedComment);
    }

    @action patchComment({comment_id, user_id}) {
        this.isLoading = true;
        let updatedComment = {
            ...this.currentComment,
            user_id: user_id,
            comment_id: comment_id,
            diagnosis: [],
            prescription: {
                drug: {
                    name: '',
                    fomula: []
                },
                rationale: '',
                reference: '',
                teaching: ''
            },
            note: ''
        }
        updatedComment.diagnosis = this.editableDiagnosis;
        updatedComment.prescription = this.editableDrug;
        updatedComment.prescription.drug.fomula = this.editableFormula;
        updatedComment.note = this.editableNote;

        return agent.updateComment({comment_id}, updatedComment)
        .then(action((response) => {
            this.isLoading = false;
            this.updateComment(response.data.data);
        }))
        .then(() => {
            this.clearEditableData();
            this.clearCurrentComment();
            customModalStore.clear();
            commonStore.clearCover();
        })
        .catch(action((error) => {
            throw error;
        }))
    }

    @action deleteComment({comment_id}) {
        this.isLoading = true;
        return agent.deleteComment({comment_id})
        .then(action((response) => {
            this.isLoading = false;
            let replaceIndex = caseStore.comments.findIndex(item => item._id === comment_id);
            caseStore.comments.splice(replaceIndex, 1);
        }))
        .catch(action((error) => {
            throw error;
        }))
    }
    
    @action handleChangeDiagnosis(index, key, value = "") {
        this.editableDiagnosis[index][key] = value;
    }
    
    @action handleChangeDrug(key, value) {
        if (key === 'name') {
            return this.editableDrug['drug']['name'] = value;
        }
        this.editableDrug[key] = value;
    }
    @action handleChangeFormula(index, key, value) {
        this.editableFormula[index][key] = value;
    }

    @action handleChangeNote(value) {
        this.editableNote = value;
    }

    @action addDiagnosis() {
        this.editableDiagnosis = [...this.editableDiagnosis, {
            name: '',
            rationale: '',
            reference: ''
        }];
    }

    @action addFormula() {
        this.editableFormula = [...this.editableFormula, {
            herb: '',
            dose: 0,
            unit: 'g/일'
        }];
    }

    @action patchLike({comment_id, user_id, status}) {
        this.isLoading = true;
        return agent.patchLike({comment_id, user_id, status})
        .then(action((response) => {
            this.currentComment = response.data.updatedComment;
            this.updateComment(response.data.updatedComment)
            this.isLoading = false;
        }))
        .catch(action((error) => {
            throw error;
        }))
    }

    @action deleteDiagnosis(selectedIndex) {
        this.editableDiagnosis.splice(selectedIndex, 1);
    }

    @action deleteFormula(selectedIndex) {
        this.editableFormula.splice(selectedIndex, 1);
    }

    @action clearEditableDiagnosis() {
        this.editableDiagnosis = [{
            name: '',
            rationale: '',
            reference: ''
        }];
    }

    @action clearEditableFormula() {
        this.editableFormula = [{
            herb: '',
            dose: 0,
            unit: 'g/일'
        }];
    }

    @action clearEditableDrug() {
        this.editableDrug = {
            drug: {
                name: ''
            },
            rationale: '',
            reference: '',
            teaching: ''
        };
    }
    @action clearEditableNote() {
        this.editableNote = '';
    }
    @action clearCurrentComment() {
        this.currentComment = {};
    }

    @action clearEditableData() {
        this.clearEditableDiagnosis();
        this.clearEditableFormula();
        this.clearEditableDrug();
        this.clearEditableNote();
    }







    @action setCategoryByAutoList(category, index) {
        this.editableDiagnosis[index]['category'] = category;
    }



    @action autoSetDrug(drug) {
        agent.loadDrug(drug._id)
            .then(action((response) => {
                let { 
                    formula,
                    name
                } = response.data || [];
                this.editableDrug.drug.name = name || '';
                this.editableDrug.rationale = '';
                this.editableDrug.reference = '';
                this.editableDrug.teaching = '';

                
                if (formula.length === 0 || formula === undefined) {
                    return this.editableFormula = [];
                }
                if (formula.length > 0) {
                    this.editableFormula = [];
                    formula.forEach((formula) => { 
                        this.editableFormula.push({
                            herb: formula.herbName,
                            dose: formula.dose,
                            unit: 'g/일'
                        }) 
                    });
                }
            }))
            .catch(action((error) => {
                throw error;
            }));
    }

    @observable editableDrug = {
        drug: {
            name: ''
        },
        rationale: '',
        reference: '',
        teaching: ''
    };

    @observable editableFormula = [
        {
            herb: '',
            dose: 0,
            unit: 'g/일'
        }
    ];






}
export default new CommentStore();