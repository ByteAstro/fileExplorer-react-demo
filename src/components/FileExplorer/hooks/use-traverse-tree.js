const useTraverseTree = () => {
    function insertNode(tree, folderId, item, isFolder) {
        if (tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items: []
            });
            return tree;
        }
        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return insertNode(ob, folderId, item, isFolder);
        });
        return { ...tree, items: latestNode };
    }

    function deleteNode(explorerData, nodeId) {
        return explorerData.map(tree => {
            if (tree.id === nodeId) {
                // If the current object matches the nodeId, filter it out
                return null;
            } else if (tree.items && tree.items.length > 0) {
                // If the current object has nested items, recursively filter them
                const filteredItems = deleteNode(tree.items, nodeId);
                return {
                    ...tree,
                    items: filteredItems.filter(item => item !== null)
                };
            } else {
                // If the current object doesn't have nested items, keep it
                return tree;
            }
        }).filter(tree => tree !== null);
    }


    // const updateObjectById = (arr, nodeId, newTree) => {
    //     return arr.map(item => {
    //         if (item.id === nodeId) {
    //             return newTree;
    //         }
    //         const updatedItems = updateObjectById(item.items, nodeId, newTree);
    //         return { ...item, items: updatedItems };
    //         return item;
    //     });
    // };

    const updateNode = (tree, nodeId, item) => {
        if (tree.id === nodeId) {
            return { ...tree, name: item };
        }
        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return updateNode(ob, nodeId, item);
        });
        return { ...tree, items: latestNode };
    };

    return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;