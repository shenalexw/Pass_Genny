import React from 'react';
import "./Tooltip.css";

export default function Tooltip({ icon, text }) {
    return (
        <div className="tooltip">{icon}
            <span className="tooltiptext">{text}</span>
        </div>
    )
}
