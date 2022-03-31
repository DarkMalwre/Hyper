import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../../../react/src/controls/button/Button';

ReactDOM.render(
    <>
        <Button type={'accent'}>Ok</Button>
        <Button type={'secondary'}>Ok</Button>
        <Button type={'outline'}>Ok</Button>
        <Button type={'text'}>Ok</Button>
        <Button type={'textAccent'}>Ok</Button>
    </>,
    document.getElementById('app')
);
