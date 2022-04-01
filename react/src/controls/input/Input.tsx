import styles from './Input.module.scss';
import Props from "./Props";
import React from 'react';
import {Icon} from '@iconify/react'
import Dismiss16Regular from '@iconify-icons/fluent/dismiss-16-regular';
import Search16Regular from '@iconify-icons/fluent/search-16-regular';

export default function Input(props: Props) {
    const [currValue, setCurrValue] = React.useState(props.defaultValue ?? '');
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className={styles._}>
            <label>
                <input onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                        props.onEnter?.(currValue);
                    }
                }} readOnly={typeof props.onChange !== 'function'} ref={inputRef} defaultValue={props.defaultValue} onInput={(event) => {
                    setCurrValue(event.currentTarget.value || '')
                }} />
            </label>

            { typeof props.onChange === 'function' && <button tabIndex={-1} className={currValue.length === 0 ? styles.buttonHide : ''} onClick={() => {
                setCurrValue('');

                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.value = '';
                }

                if (props.onClear) {
                    props.onClear();
                }

                if (props.onChange) {
                    props.onChange('');
                }
            }}>
                <Icon icon={Dismiss16Regular} />
            </button> }

            { typeof props.onEnter === 'function' && <button tabIndex={-1} className={currValue.length === 0 ? styles.buttonHide : ''} onClick={() => {
                if (props.onEnter) {
                    props.onEnter(currValue);
                }
            }}>
                <Icon style={{
                    fontSize: '14px'
                }} icon={Search16Regular} />
            </button> }
        </div>
    );
}
