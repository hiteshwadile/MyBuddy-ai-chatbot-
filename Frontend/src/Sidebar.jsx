import "./Sidebar.css";
import {useContext , useEffect} from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const {allThreads, 
        setAllThreads, 
        currThreadId, 
        setNewChat, 
        setPrompt, 
        setReply, 
        setCurrThreadId, 
        setPrevChats,
        isSidebarOpen,      //adding for responsiveness
        setIsSidebarOpen
    } = useContext(MyContext);
    
    const getAllThreads = async ()=> {
        try{
           const response = await fetch(`${import.meta.env.VITE_API_URL}/api/thread`);
            const res = await response.json();
            const filterData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            //console.log(filterData);
            setAllThreads(filterData);
        }catch(err){
            console.log(err);
        }
    }

    useEffect( () => {
        getAllThreads();

    }, [currThreadId])


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
        setIsSidebarOpen(false);     //for responsiveness
    }

    const changeThread =  async (newThreadId) => {
        setCurrThreadId(newThreadId);
        setReply(null);
        setIsSidebarOpen(false);     //for responsiveness

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/thread/${newThreadId}`);
            const res = await response.json();

             if (!response.ok) {
            throw new Error(res.error || "Failed to load thread");
             }

              console.log("Loaded messages:", res);
                setPrevChats(res);
                 setNewChat(false);


            // console.log(res);
            // setPrevChats(res);
            // setNewChat(false);
        }catch(err){
            console.log(err);
        }

    };


    // const deleteThread = async (threadId) => {

    //    try{
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {method: "DELETE" })
    //     const res = await response.json();
    //     console.log(res);

    //     //updated threads re-render
    //     setAllThreads(prev => prev.filter(thread => thread.threadId != threadId));
    //     if(threadId === currThreadId) {
    //         createNewChat();
    //     }

    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    const deleteThread = async (threadId) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/thread/${threadId}`,
            { method: "DELETE" }
        );

        const res = await response.json();

        if (!response.ok) {
            throw new Error(res.error || "Failed to delete thread");
        }

        setAllThreads(prev =>
            prev.filter(thread => thread.threadId !== threadId)
        );

        if (threadId === currThreadId) {
            createNewChat();
        }

    } catch (err) {
        console.log(err);
    }
};

    return (
        //  for responsiveness er take classname and other like this
        <section className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>   
            {/* {new chat button} */}
            <button onClick={createNewChat}>
            <img src="src/assets/blacklogo.png" alt="Gpt logo" className="logo"></img>
            <span><i className="fa-regular fa-pen-to-square button"></i></span>
            </button>

            {/* {History} */}
            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx}
                            onClick={(e) => changeThread(thread.threadId)}
                        > { thread.title } 
                        <i className="fa-solid fa-trash"
                            onClick={(e) => {
                                e.stopPropagation();  //stop event bubbling
                                deleteThread(thread.threadId);
                            }}
                        ></i>
                        </li>
                    ))
                }
            </ul>

            {/* {Sign} */}
            <div className="sign">
                <p>By Hitesh D. Wadile &hearts;</p>
            </div>
            


        </section>
    )
}

export default Sidebar;