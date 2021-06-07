import React from "react";

function ChatItem(props) {
    const message = props.message;
    const username = props.username;
    const isOwnMessage = message.author === username;
    return (
            <li className="list-group-item"><div>{message.author}</div>
                <div>{message.body}
                </div>
            </li>
  
    )
}

export default ChatItem;