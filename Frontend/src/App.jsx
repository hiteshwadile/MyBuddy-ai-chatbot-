
import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./MyContext.jsx";
import { useState } from "react";
import { v1 as uuid } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuid());

  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    isSidebarOpen, setIsSidebarOpen
  };

  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar />

        {isSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;




// import './App.css';
// import Sidebar from "./Sidebar.jsx";
// import ChatWindow from "./ChatWindow";
// import {MyContext} from "./MyContext.jsx";
// import {useState} from "react";
// import {v1 as uuid} from "uuid";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState(null);
//   const [currThreadId, setCurrThreadId] = useState(uuid());
 
//   const [prevChats, setPrevChats] = useState([]);
//   const [newChat, setNewChat] = useState(true);
//   const [allThreads, setAllThreads] = useState([]);
  
//   const providerValues = {
//     prompt, setPrompt,
//     reply, setReply,
//     currThreadId, setCurrThreadId,
//     newChat, setNewChat,
//     prevChats, setPrevChats,
//     allThreads, setAllThreads
//   }; 
//   return (
//     <div className="app">
//       <MyContext.Provider value = {providerValues}>
//       <Sidebar></Sidebar>
//       <ChatWindow></ChatWindow>
//       </MyContext.Provider>
//     </div>
//   )
// }

// export default App;
