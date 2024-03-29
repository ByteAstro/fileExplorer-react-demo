import React, { useState } from 'react'
import { AiFillFolderAdd } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";

export default function Folder({ explorer }) {
    const [expanded, setExpanded] = useState(false);
    // console.log(explorer);

    if (explorer.isFolder) {
        return (<div className='my-2'>
            <div
                className={`p-1 flex justify-start cursor-crosshair 
                hover:bg-slate-800 ${expanded ? '' : ''}`}
                onClick={() => setExpanded(!expanded)}>
                <span>📁 {explorer.name}</span>

                <div className='flex items-center ml-2 gap-1'>
                    <button>
                        <AiFillFolderAdd color='#FFE4CF' size={20} />
                    </button>
                    <button>
                        <AiFillFileAdd color='#FFFDD7' size={15} />
                    </button>
                </div>

            </div>

            <div className={`pl-4 ${expanded ? 'block' : 'hidden'}`}>
                {explorer.items.map((exp) => (<>
                    {/* <span>{exp.name}</span> */}
                    <Folder key={exp.id} explorer={exp} />
                </>))}
            </div>

        </div>
        )
    } else {
        return (
            <span
                className='p-1 flex flex-col cursor-pointer
                hover:bg-blue-600 hover:bg-opacity-30'>
                📄 {explorer.name}
            </span>
        );
    }
}
