import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation'
import '../media.css'

const Conversation = ({conversation, lastIdx, emoji}) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

  return <>
        <div className={`media-conversation flex gap-2  items-center hover:bg-green-600 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-green-600": ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
        >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src={conversation.profilePic} alt="user avatar" className='media-user-image' />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200 media-user-name">{conversation.fullName}</p>
                    <span className="text-xl media-emoji">{emoji}</span>
                </div>
            </div>
        </div>
        
        {!lastIdx && <div className="chat-white-divider2" />}
    </>
}

export default Conversation;