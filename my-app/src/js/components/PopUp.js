function PopUp(props) {
    const handleClose = () => {
        props.toggle();
    }
    return ( 
        <div className="cover">
            <div className="modal_popup">   
                <span className="close" onClick={()=>handleClose()}>&times;
                </span>
                <div className="message">
                    <h4>{props.winner} won!</h4>
                    <h4>Host can start a new game.</h4> 
                </div>
            </div>
        </div>
        
    )
}

export default PopUp;