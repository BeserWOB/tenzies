import React from "react"

export default function Die(props) {    
    const styles = {backgroundColor: props.isSelected? "#59E391" : "#FFFFFF"};

    return (
        <div 
            onClick={props.holdDice} 
            className="die-face" 
            style={styles}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}