import React from 'react';
import styles from './Page404.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Page404 = () => {
    return (
        <div className={cx('Page404')}>
            <h1>404 Error</h1>
            <p>Go back to previous page &rarr;</p>
        </div>
    );
};

export default Page404;