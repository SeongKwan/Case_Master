import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Note.module.scss';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('commentStore')
@observer
class Note extends Component {
    handleOnChange = (e) => {
        const { value } = e.target;
        this.props.commentStore.handleChangeNote(value);
    }
    render() {
        const { editableNote } = this.props.commentStore;
        return (
            <div className={cx('Note')}>
                <div>
                    <textarea 
                        name='note'
                        type='text'
                        rows='3'
                        value={editableNote || ""}
                        onChange={this.handleOnChange}
                        placeholder="메모"
                    />
                </div>
            </div>
        );
    }
}

export default Note;