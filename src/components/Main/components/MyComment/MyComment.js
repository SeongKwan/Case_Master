import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './MyComment.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';

const cx = classNames.bind(styles);

@inject()
@observer
class MyComment extends Component {
    render() {
        const { cases } = this.props;
        if (cases.caseWithMyComment === undefined) {
            return <div style={{display: 'none'}}>loading...</div>
        }
        return (
            <div className={cx('MyComment')}>
                {
                    cases.caseWithMyComment.map((Case, i) => {
                        return <CaseListItem type="MyComment" item={Case} key={i} />
                    })
                }
            </div>
        );
    }
}

export default MyComment;