import React, { useState } from 'react'

import explorer from '../../data/folderData';
import Folder from './Folder';

export default function FileExplorer() {
    const [explorerData, setExplorerData] = useState(explorer);

    return (
        <div className='p-3 min-h-screen bg-slate-900 text-white'>
            <Folder explorer={explorerData} />
        </div>
    )
}