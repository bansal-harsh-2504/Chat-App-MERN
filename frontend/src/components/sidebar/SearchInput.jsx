import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
import '../media.css'

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const [filteredConversations, setFilteredConversations] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    if (searchTerm.length >= 1) {
        const filtered = conversations.filter((conversation) =>
        conversation.fullName.toLowerCase().startsWith(searchTerm)
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations([]);
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setSearch("");
    setFilteredConversations([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = filteredConversations.find(
      (c) => c.fullName.toLowerCase() === search.toLowerCase()
    );

    if (conversation) {
      handleSelectConversation(conversation);
    } else {
      console.log("conversations in searchInput",conversations)
      toast.error('No such user found!');
    }
    setSearch("");
    setFilteredConversations([]);
  };

  return (
    <div className='search-input-container'>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Search.."
          className="input input-bordered rounded-full mr-2 bg-gray-800 media-input1"
          value={search}
          onChange={handleSearch}
        />
        <button type="submit" className="btn btn-circle media-btn1 bg-green-600 text-white">
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
      </form>

      <ul className='mt-3'>
        {filteredConversations.map((conversation) => (
           <li 
           key={conversation._id} 
           onClick={() => handleSelectConversation(conversation)}
           className="cursor-pointer flex items-center space-x-2"
         >
           <img 
             src={conversation.profilePic}
             alt={conversation.fullName}
             className="h-8 w-8 rounded-full mb-1 mt-3"
           />
           <span className='text-white'>{conversation.fullName}</span>
           <button type="button" className="media-chat-button text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Chat</button>
         </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchInput
