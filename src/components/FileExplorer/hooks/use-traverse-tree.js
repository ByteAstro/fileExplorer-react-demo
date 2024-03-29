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

    function deleteNode(tree, nodeId) {
        if (!tree || !nodeId) {
            return tree;
        }

        if (tree.id === nodeId) {
            return null;
        }
        const updatedItems = tree.items.map((item) => deleteNode(item, nodeId));
        const latestNode = updatedItems.filter((item) => item !== null);
        return { ...tree, items: latestNode };
    };

    const updateNode = (tree, nodeId, item) => {
        if (tree.id === nodeId) {
            return { ...tree, name: item };
        }
        // else if (tree.items && tree.items.length > 0) {}
        // Recursively traverse the items
        // const updatedItems = tree.items.map(updateNodeHelper);
        // return { ...tree, items: updatedItems };
        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return updateNode(ob, nodeId, item);
        });
        return { ...tree, items: latestNode };
    };

    return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;