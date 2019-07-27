import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loader.module.scss';

const cx = classNames.bind(styles);

const Loader = () => {
    return (
        <div className={cx('Loader')}>
            <div className={cx('box')}>
                <div className={cx('loader-38')}></div>
            </div>
        </div>
    );
};

export default Loader;