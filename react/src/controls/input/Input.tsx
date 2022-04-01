import styles from './Input.module.scss';
import Props from "./Props";
import React from 'react';

export default function Input(props: Props) {
    return (
        <div className={styles._}>
            <label>
                <input />
            </label>
        </div>
    );
}
