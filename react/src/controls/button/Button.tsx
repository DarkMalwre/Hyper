import Props from "./Props";
import React from 'react';
import styles from './Button.module.scss';

export default function (props: Props) {
    const produceCSSMargin = (mg: Props['margin']) => {
        if (!mg) return '0px';

        if (typeof mg === 'number') return `${mg}px`;
        if (mg.length === 1) return `${mg[0]}px`;

        if (mg.length === 2) {
            return `${mg[0]}px ${mg[1]}px`;
        }

        if (mg.length === 3) {
            return `${mg[0]}px ${mg[1]}px ${mg[2]}px`;
        }

        if (mg.length === 4) {
            return `${mg[0]}px ${mg[1]}px ${mg[2]}px ${mg[3]}px`;
        }
    };

    return (
        <button style={{
            margin: produceCSSMargin(props.margin)
        }} onClick={props.onClick} className={`${styles._} ${styles[`_${(props.type ?? 'secondary')}`]} ${styles[`_${(props.size ?? 'medium')}`]}`}>{props.children}</button>
    );
}

// ヾ(≧▽≦*)o
