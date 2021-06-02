import LeaveButton from "./LeaveButton"
import Collapsible from "./Collapsible"
function Navbar(props) {
    
    return (
        <nav className="navbar navbar-custom">
            <div className="leavebtn">
                <LeaveButton clientId={props.clientId} gid={props.gid}/>
            </div>
            <div className="collapseWrapper">
            <Collapsible />
            </div>
        </nav>
    )
}

export default Navbar