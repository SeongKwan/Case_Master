import React, { Component } from 'react';
import styles from './ListForInput.module.scss';
import classnames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';

const cx = classnames.bind(styles);

@inject(
    'diagnosisListForInputStore', 
    'diagnosisListItemStore',
    'commonStore'
)
@observer
class ListForInput extends Component {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.listForInput && !this.listForInput.contains(event.target)) {
            $(this.list).scrollTop(0);
            this.props.diagnosisListForInputStore.clear();
        }
    }

    render() {
        const { isLoading } = this.props.diagnosisListItemStore;
        const { top, left, inputHeight, opacity, width } = this.props.diagnosisListForInputStore.position || {};
        const { status, selectedIndex } = this.props.diagnosisListForInputStore || 'invisible'; 
        const { items } = this.props;

        return (
            <div 
                className={cx('ListForInput')} 
                data-form="list-container-for-diagnosis"
                data-status={status}
                style={{width: width || 0, top: top + inputHeight || 0, left: left || 0, opacity: opacity}}
                onMouseLeave={() => {
                    this.props.diagnosisListForInputStore.clear();
                }}
                ref={(ref) => {
                    this.listForInput = ref;
                }}
            >
                <ul ref={(ref) => {
                    this.list = ref;
                }}>
                    {
                        items.map((item, i) =>{
                            return ( 
                                <li 
                                    className={cx({active: i === selectedIndex})}
                                    id={`diagnosis-${i}`}
                                    key={i}
                                    onMouseEnter={() => {
                                        this.props.diagnosisListForInputStore.setSelectedIndex(i);
                                    }}
                                    onMouseLeave={() => {
                                        this.props.diagnosisListForInputStore.setSelectedIndex(-1);
                                    }}
                                    onClick={() => {
                                        const { currentIndex } = this.props.diagnosisListForInputStore;
                                        this.props.diagnosisListForInputStore.clear();
                                        this.props.diagnosisListForInputStore.setSelectedListItem(item.name);
                                        this.props.setInputValue(item.name, item.category, currentIndex);
                                        this.props.diagnosisListItemStore.setCategory(item.category, currentIndex);
                                        $(this.list).scrollTop(0);
                                    }}
                                >{item.name}</li>
                            );
                        })
                    }
                    {
                        isLoading &&
                        <li>진단목록 불러오는 중...</li>
                    }
                    {
                        !isLoading && items.length < 1 &&
                            <li 
                                onClick={() => {
                                    this.props.diagnosisListForInputStore.clear();
                                }}
                            >검색어와 맞는 결과가 없습니다</li>
                    }
                </ul>
            </div>
        );
    }
}

export default ListForInput;