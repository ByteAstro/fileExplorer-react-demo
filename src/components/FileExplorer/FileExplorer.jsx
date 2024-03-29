import React, { useState } from 'react'

import explorer from '../../data/folderData';
import './FileExplorer.css'
import Folder from './Folder';

export default function FileExplorer() {
    const [explorerData, setExplorerData] = useState(explorer);

    return (
        <div>
            <Folder explorer={explorerData} />
        </div>
    )
}