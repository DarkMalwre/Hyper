import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../../../react/src/controls/button/Button';

document.body.style.background = `var(--layerSolid1)`;

ReactDOM.render(
    <div style={{
        display: 'flex',
        gap: '10px',
        flexDirection: 'column'
    }}>
        <div>
            <Button size="small" margin={[0, 5]} type={'accent'}>Ok</Button>
            <Button size="small" margin={[0, 5]} type={'secondary'}>Ok</Button>
            <Button size="small" margin={[0, 5]} type={'outline'}>Ok</Button>
            <Button size="small" margin={[0, 5]} type={'text'}>Ok</Button>
            <Button size="small" margin={[0, 5]} type={'textAccent'}>Ok</Button>
        </div>

        <div>
            <Button size={'medium'} margin={[0, 5]} type={'accent'}>Ok</Button>
            <Button size={'medium'} margin={[0, 5]} type={'secondary'}>Ok</Button>
            <Button size={'medium'} margin={[0, 5]} type={'outline'}>Ok</Button>
            <Button size={'medium'} margin={[0, 5]} type={'text'}>Ok</Button>
            <Button size={'medium'} margin={[0, 5]} type={'textAccent'}>Ok</Button>
        </div>

        <div>
            <Button size={"large"} margin={[0, 5]} type={'accent'}>Ok</Button>
            <Button size={"large"} margin={[0, 5]} type={'secondary'}>Ok</Button>
            <Button size={"large"} margin={[0, 5]} type={'outline'}>Ok</Button>
            <Button size={"large"} margin={[0, 5]} type={'text'}>Ok</Button>
            <Button size={"large"} margin={[0, 5]} type={'textAccent'}>Ok</Button>
        </div>
    </div>,
    document.getElementById('app')
);
