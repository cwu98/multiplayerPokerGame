import React, { useRef } from 'react';

function JoinLink(props) {
    const gid = props.gid
    const textAreaRef = useRef(null)
    
    function copy(){
        textAreaRef.current.select();
        document.execCommand("copy")
        let btn = document.getElementById("copyBtn")
        btn.textContent="Copied"
    }

    return (
            <div className="d-flex w-100 p-2 justify-content-center border border-warning rounded">
                <div className="d-flex pr-4 align-items-center">
                    <h5>Friends can join via this link: </h5>
                </div>
                <div className="d-flex col-4">
                    <input className="w-100 p-1 border border-info rounded" onClick={copy} ref={textAreaRef} rows={1} style={{overflow:"hidden"}}
                        value={`${window.location.origin}/game/${gid}`}
                        readOnly />
                </div>
                <button id="copyBtn" className="btn btn-outline-dark" onClick={copy}>Copy</button> 
            </div>
        
    )
}

export default JoinLink