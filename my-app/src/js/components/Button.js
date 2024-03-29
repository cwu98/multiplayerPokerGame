import React from "react";

function Button(props) {
    return (
        <button className={props.className ? props.className : "btn btn-outline-primary btn-block btn-lg"} onClick={props.onClick}
        disabled={props.disabled} > {props.children} </button>
    )
}

export default Button;