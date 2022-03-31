import Props from "./Props";
import React from 'react';
import styles from './Button.module.scss';

export default function (props: Props) {
    return (
        <button className={styles._}>{props.children}</button>
    );
}
 