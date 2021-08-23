import React, { Component } from 'react'
import CountDown from 'react-countdown-clock'

export default function CountDownTest (props) {
    const {callback, timeout, size} = props;
    const [completions, setCompletions] = React.useState(0);

    const onComplete = () => {
        callback();
        setCompletions(completions+1);
    }

    return (
        <div>
            <CountDown
            key={completions}
            seconds={timeout}
            color="#2c8de2"
            alpha={0.9}
            size={size}
            onComplete={onComplete}
            />
        </div>
    )
}