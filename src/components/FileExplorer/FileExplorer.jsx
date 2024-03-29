import React, { useEffect, useState } from 'react'

import explorer from '../../data/folderData';
import useTraverseTree from './hooks/use-traverse-tree';
import Folder from './Folder';

export default function FileExplorer() {

    const [explorerData, setExplorerData] = useState(explorer);

    const { insertNode, deleteNode, updateNode } = useTraverseTree();

    useEffect(() => {
        console.log(explorerData);
    }, [explorerData]);

    const handleInsertNode = (folderId, item, isFolder) => {
        const newTree = insertNode(explorerData, folderId, item, isFolder);
        setExplorerData(newTree);
    };

    const handleDeleteNode = (nodeId) => {
        const newTree = deleteNode(explorerData, nodeId);
        setExplorerData(newTree);
    }

    const handleUpdateNode = (nodeId, item) => {
        const newTree = updateNode(explorerData, nodeId, item);
        setExplorerData(newTree);
    }

    return (
        <div className='p-3 min-h-screen bg-slate-900 text-white'>
            <Folder
                explorer={explorerData}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleUpdateNode={handleUpdateNode}
            />
        </div>
    )
}