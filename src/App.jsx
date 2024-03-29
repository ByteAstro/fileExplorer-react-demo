import { useState } from 'react'
import './App.css'
import FileExplorer from './components/FileExplorer/FileExplorer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FileExplorer />
    </>
  )
}

export default App
