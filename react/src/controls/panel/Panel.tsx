import React from 'react';
import Props from './Props';

export default function Panel(props: Props) {
    const generateCSS = (data: number | string | undefined, defaultValue: any) => {
        if (typeof data === 'number') {
            return data + 'px';
        }

        if (typeof data === 'string') {
            return data;
        }

        return defaultValue;
    }

    return (
        <div style={{
            display: 'flex',
            width: generateCSS(props.width, '100%'),
            height: generateCSS(props.height, '100%'),
            minWidth: generateCSS(props.minWidth, '100%'),
            minHeight: generateCSS(props.minHeight, '100%'),
            maxWidth: generateCSS(props.maxWidth, '100%'),
            maxHeight: generateCSS(props.maxHeight, '100%'),
            flexDirection: props.flowDirection || 'column',
            gap: generateCSS(props.spacing, '0'),
            padding: generateCSS(props.padding, '0'),
            margin: generateCSS(props.margin, '0'),
            color: props.forgroundColor,
            backgroundColor: props.backgroundColor,
        }}>
            {props.children}
        </div>
    );
}
