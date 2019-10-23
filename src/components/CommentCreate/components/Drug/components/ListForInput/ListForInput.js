import React, { Component } from 'react';
import styles from './ListForInput.module.scss';
import classnames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';

const cx = classnames.bind(styles);

@inject(
    'drugListForInputStore', 
    'drugListItemStore',
    'commonStore',
    'commentStore'
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
            this.props.drugListForInputStore.clear();
        }
    }

    render() {
        const { isLoading } = this.props.drugListItemStore;
        const { top, left, inputHeight, opacity, width } = this.props.drugListForInputStore.position || {};
        const { status, selectedIndex } = this.props.drugListForInputStore || 'invisible';
        const { items } = this.props;

        return (
            <div 
                className={cx('ListForInput')} 
                data-form="list-container-for-drug"
                data-status={status}
                style={{width: width || 0, top: top + inputHeight || 0, left: left || 0, opacity: opacity}}
                onMouseLeave={() => {
                    
                    this.props.drugListForInputStore.clear();
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
                                    id={`drug-${i}`}
                                    key={i}
                                    onMouseEnter={() => {
                                        this.props.drugListForInputStore.setSelectedIndex(i);
                                    }}
                                    onMouseLeave={() => {
                                        this.props.drugListForInputStore.setSelectedIndex(-1);
                                    }}
                                    onClick={() => {
                                        const { currentIndex } = this.props.drugListForInputStore;
                                        
                                        this.props.drugListForInputStore.clear();
                                        this.props.drugListForInputStore.setSelectedListItem(item.name);
                                        this.props.setInputValue(item.name, currentIndex);
                                        this.props.commentStore.autoSetDrug(item);
                                        $(this.list).scrollTop(0);
                                    }}
                                >{item.name}</li>
                            );
                        })
                    }
                    {
                        isLoading &&
                        <li>처방목록 불러오는 중...</li>
                    }
                    {
                        !isLoading && items.length < 1 &&
                            <li 
                                onClick={() => {
                                    this.props.drugListForInputStore.clear();
                                }}
                            >검색어와 맞는 결과가 없습니다</li>
                    }
                </ul>
            </div>
        );
    }
}

export default ListForInput;