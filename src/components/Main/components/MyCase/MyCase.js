import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './MyCase.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';

const cx = classNames.bind(styles);

@inject()
@observer
class MyCase extends Component {
    render() {
        const { cases } = this.props;
        if (cases.myCaseWithQuestion === undefined) {
            return <div style={{display: 'none'}}>loading...</div>
        }
        return (
            <div className={cx('MyCase')}>
                {
                    cases.myCaseWithQuestion.map((Case, i) => {
                        return <CaseListItem type={'MyCase'} item={Case} key={i} />
                    })
                }
            </div>
        );
    }
}

export default MyCase;