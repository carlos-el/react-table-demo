import React from 'react'
import Circle from './Circle'

function Status({ progress }) {
    let color = "green"
    if (progress > 50) color = "blue"
    if (progress > 70) color = "red"

    return (
        <Circle color={color} />
    )
}

export default Status;