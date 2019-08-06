import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './UpdatedCase.module.scss';
import { observer, inject } from 'mobx-react';
import CaseListItem from '../../../CaseListItem';
import { GoArrowRight } from "react-icons/go";

const cx = classNames.bind(styles);

@inject()
@observer
class UpdatedCase extends Component {
    render() {
        const { cases } = this.props;
        if (cases.todaysCase === undefined) {
            return <div style={{display: 'none'}}>loading...</div>
        }
        return (
            <div className={cx('UpdatedCase')}>
                {
                    cases.todaysCase.map((Case, i) => {
                        return <CaseListItem type={'TodayCase'} item={Case} key={i} />
                    })
                }
                <Link to='/search' onClick={this.handleClick}>
                    다른 증례 보러가기 &nbsp; <GoArrowRight />
                </Link>
            </div>
        );
    }
}

export default UpdatedCase;