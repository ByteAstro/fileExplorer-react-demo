import React, { useEffect, useState } from 'react'

import explorer from '../../data/folderData';
import useTraverseTree from './hooks/use-traverse-tree';
import Folder from './Folder';

export default function FileExplorer() {

    const [explorerData, setExplorerData] = useState(explorer);

    const { insertNode, deleteNode, updateNode } = useTraverseTree();

    // useEffect(() => {
    //     console.log(explorerData[1]);
    // }, [explorerData]);

    const updateObjectById = (arr, nodeId, newTree) => {
        return arr.map(item => {
            if (item.id === nodeId) {
                return newTree;
            }
            const updatedItems = updateObjectById(item.items, nodeId, newTree);
            return { ...item, items: updatedItems };
            return item;
        });
    };

    const handleInsertNode = (tree, nodeId, item, isFolder) => {
        const newTree = insertNode(tree, nodeId, item, isFolder);
        setExplorerData(updateObjectById(explorerData, nodeId, newTree));
        // console.log(updateObjectById(explorerData, nodeId, newTree));
    };

    const handleDeleteNode = (nodeId) => {
        const newTreeArrays = deleteNode(explorerData, nodeId);
        setExplorerData(newTreeArrays);
        // console.log(newTreeArrays);
    }

    const handleUpdateNode = (tree, nodeId, item) => {
        const newTree = updateNode(tree, nodeId, item);
        setExplorerData(updateObjectById(explorerData, nodeId, newTree))
        // console.log(updateObjectById(explorerData, nodeId, newTree));
    }

    return (
        <div className='p-3 min-h-screen bg-slate-900 text-white'>
            {explorerData.map((explorer, idx) => (
                <Folder
                    key={idx}
                    explorer={explorer}
                    handleInsertNode={handleInsertNode}
                    handleDeleteNode={handleDeleteNode}
                    handleUpdateNode={handleUpdateNode}
                />
            ))}
        </div>
    )
}