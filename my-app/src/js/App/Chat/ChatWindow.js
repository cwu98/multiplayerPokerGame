import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import ChatItem from "./ChatItem";
const Chat = require('twilio-chat');

function ChatWindow(props) {
    const room = props.room || "someroom"
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [channel, setChannel] = useState(null);
    const [text, setText] = useState("");

    let scrollDiv = useRef(null);

    const playerName = props.playerName || "Josh";
    const updateText = e => setText(e);
    const getToken = async (playerName) => {
        const response = await axios.get(`http://localhost:8080/token/${playerName}`);
        const { data } = response;
        return data.token;
    }
    const joinChannel = async (channel) => {
        if(channel.channelState.status !== 'joined'){
            await channel.join();
        }
        setChannel(channel);
        setLoading(false);
        channel.on('messageAdded', function(message) {
            handleMessageAdded(message);
        });
        scrollToBottom();
    };
    const handleMessageAdded = message => {
        setMessages(messages => [...messages, message]);
        scrollToBottom();
    }
    const scrollToBottom = () => {
        const scrollHeight = scrollDiv.current.scrollHeight;
        const height = scrollDiv.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;

    };

    const sendMessage = () => {
        if(text) {
            console.log(String(text).trim());
            setLoading(true);
            channel.sendMessage(String(text).trim());
            setText('');
            setLoading(false);
        }
    }

    useEffect( async () => {
        let token = "";
        if (!playerName) {
            playerName = "John Doe"
        }
        setLoading(true)
        try {
            token = await getToken(playerName);

        } catch {
            throw new Error("unable to get token, please reload page");
        }
        console.log('token',token);
        Chat.Client.create(token).then(function(client) {
            client.on("tokenAboutToExpire", async () => {
                const token = await getToken(playerName);
                client.updateToken(token);
            });
            client.on("tokenExpired", async () => {
                const token = await getToken(playerName);
                client.updateToken(token);
            });
            client.on("channelJoined", async (channel) => {
                const newMessages = await channel.getMessages();
                console.log(newMessages)
                setMessages(newMessages.items || []);
                scrollToBottom();
              });
    
              try {
                const channel = client.getChannelByUniqueName(room);
                  console.log(channel)
                  joinChannel(channel);
                  setChannel(channel)
              } catch(err) {
                try {
                  const channel = client.createChannel({
                    uniqueName: room,
                    friendlyName: room,
                  });
                  console.log("chn", channel);
                  joinChannel(channel);
                } catch {
                  throw new Error("Unable to create channel, please reload this page");
                }
              } 
        }

        )

        

    });
    const handleToggleChatWidget = () => {
        var chatWidget = document.querySelector('.chat-widget');
        var chatWidgetContent = chatWidget.querySelector('.chat-content');
        var frame = document.getElementById('frame');
        var expanded = chatWidget.getAttribute('aria-expanded');
    
        if (expanded === 'true') {
          chatWidget.classList.remove('show');
          chatWidget.setAttribute('aria-expanded', false);
        } else {
    
    
            if (!frame) {
    
                frame = document.createElement('div');
                frame.setAttribute('id', 'frame');
    
                /*
                frame.innerHTML += "<ul className="list-group">"
                {messages && messages.map((message) => {
                    <ChatItem key={message.index}
                    message={message}
                uername={props.playerName} />
                })}
                </ul>" */
                chatWidgetContent.appendChild(frame);
            }
            chatWidget.classList.add('show');
            chatWidget.setAttribute('aria-expanded', true);
        }   
    };
    
    return (
        <div className="chat-widget">
            <div className="chat-content">
                <ul>

                </ul>
                <div className="chat-footer" id="bottom-right">
                    <input type="text" placeholder="Type Message" onChange={(e) =>updateText(e.target.value)} value={text} />
                    <button className="btn btn-secondary mb-2"onClick={sendMessage}>Send</button>
                </div>
            </div>
            <button className="msg-button" onClick={() => handleToggleChatWidget()}><i className="fa fa-comments-o" aria-hidden="true"></i>

            </button>
        </div>
    )



}   

export default ChatWindow

