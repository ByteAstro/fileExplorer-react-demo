import React, { useState } from 'react'
import { AiFillFolderAdd } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function Folder({ explorer, handleInsertNode, handleDeleteNode, handleUpdateNode }) {
    const [nodeName, setNodeName] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    });

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpanded(true)
        setShowInput({
            visible: true,
            isFolder
        });
    };

    const onAddFolder = (e) => {
        // console.log(typeof explorer);
        if (e.keyCode === 13 && e.target.value) {
            if (editMode) {
                handleUpdateNode(explorer, explorer.id, e.target.value);
                setEditMode(false);
            } else {
                handleInsertNode(explorer, explorer.id, e.target.value, showInput.isFolder);
            }
            setShowInput({ ...showInput, visible: false })
        }
    }

    const onEditClick = (e) => {
        e.stopPropagation();
        setShowInput({
            visible: true,
            isFolder: explorer.isFolder
        });
        setEditMode(true);
        setNodeName(explorer.name);
    }

    const onDeleteNode = (e) => {
        e.stopPropagation();
        handleDeleteNode(explorer.id)
    }

    if (explorer.isFolder && !editMode) {
        return (<div className='my-2'>
            <div
                className={`p-1 flex justify-start cursor-crosshair 
                hover:bg-slate-800 ${expanded ? '' : ''}`}
                onClick={() => { setExpanded(!expanded) }}>
                <span>📁 {explorer.name}</span>

                <div className='flex items-center ml-2 gap-1'>
                    <button className='border border-transparent 
                        hover:border-dotted hover:border-white'
                        onClick={e => { handleNewFolder(e, true) }}
                    ><AiFillFolderAdd color='#FFE4CF' size={20} />
                    </button>
                    <button className='border border-transparent 
                        hover:border-dotted hover:border-white'
                        onClick={e => { handleNewFolder(e, false) }}
                    ><AiFillFileAdd color='#FFFDD7' size={17} />
                    </button>
                    <button className='border border-transparent 
                        hover:border-dotted hover:border-white'
                        onClick={onEditClick}
                    ><FaRegEdit color='#FFFDD7' size={17} />
                    </button>
                    <button className='border border-transparent 
                        hover:border-dotted hover:border-white'
                        onClick={onDeleteNode}
                    ><MdDeleteSweep color='#FFFDD7' size={17} />
                    </button>
                </div>
            </div>

            <div className={`pl-4 ${expanded ? 'block' : 'hidden'}`}>
                {showInput.visible && (
                    <div className="flex items-center gap-2">
                        <span className='mt-1'>
                            {showInput.isFolder ? '📁' : '📄'}
                        </span>
                        <input
                            className='border rounded-md bg-transparent px-1 outline-none min-h-8'
                            type="text" autoFocus
                            value={nodeName}
                            onChange={e => setNodeName(e.target.value)}
                            onBlur={() => setShowInput({ ...showInput, visible: false })}
                            onKeyDown={onAddFolder}
                            {...(editMode ? {} : { value: undefined })}
                        />
                    </div>
                )}

                {explorer.items.map((exp) => (<>
                    {/* <span>{exp.name}</span> */}
                    <Folder
                        key={exp.id} explorer={exp}
                        handleInsertNode={handleInsertNode}
                        handleDeleteNode={handleDeleteNode}
                        handleUpdateNode={handleUpdateNode}
                    />
                </>))}
            </div>
        </div>
        )
    } else {
        return (
            <span
                className='p-1 flex items-center gap-2 cursor-pointer
                hover:bg-blue-600 hover:bg-opacity-30'>

                {showInput.visible ? (
                    <div className="flex items-center gap-2">
                        <span className='mt-1'>
                            {showInput.isFolder ? '📁' : '📄'}
                        </span>
                        <input
                            className='border rounded-md bg-transparent px-1 outline-none min-h-8'
                            type="text" autoFocus
                            value={nodeName}
                            onChange={e => setNodeName(e.target.value)}
                            onBlur={() => setShowInput({ ...showInput, visible: false })}
                            onKeyDown={onAddFolder}
                        />
                    </div>
                ) : (<>
                    📄 {explorer.name}
                    <button className='border border-transparent 
                        hover:border-dotted hover:border-white'
                        onClick={onEditClick}
                    ><FaRegEdit color='#FFFDD7' size={17} />
                    </button>
                    <button className='border border-transparent 
                        hover:border-dotted hover:border-white'
                        onClick={onDeleteNode}
                    ><MdDeleteSweep color='#FFFDD7' size={17} />
                    </button>
                </>)
                }
            </span>
        );
    }
}
