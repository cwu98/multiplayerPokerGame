import React from "react";
import { useHistory } from "react-router";
import { handleLeaveGame } from "../handlers";

function LeaveButton(props){
    const history = useHistory();
    return (
        <div>
        <button className="btn btn-outline-light btn-lg"
        onClick={()=>{
            if(props.gid){
                handleLeaveGame(props.clientId, props.gid);
            }
            history.push("/game")
        }} ><i className="fa fa-arrow-left mr-2"></i>Leave
        </button>
        </div>
    )
}
export default LeaveButton;