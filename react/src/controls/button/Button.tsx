import Props from "./Props";
import React from 'react';
import styles from './Button.module.scss';

export default function (props: Props) {
    return (
        <button className={`${styles._} ${styles[`_${(props.type ?? 'secondary')}`]}`}>{props.children}</button>
    );
}

// ヾ(≧▽≦*)o
