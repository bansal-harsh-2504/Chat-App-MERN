import useConversation from "../../zustand/useConversation";
import {useAuthContext} from '../../context/AuthContext'
import { extractTime } from "../../utils/extractTime";
import '../media.css'

const Message = ({message}) => {
  const {authUser} = useAuthContext(); 
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-green-500' : "";
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? 'shake' : "";

  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full media-msgimage">
                <img src={profilePic} 
                />
            </div>
        </div>
        <div className={`media-msgbubble chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
        <div className="media-msgtime chat-footer text-xs flex gap-1 items-center text-white opacity-60">{formattedTime}</div>
    </div>
  )
}

export default Message;