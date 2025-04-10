import { ThemeProvider } from '@hakit/components';
import { HassConnect } from '@hakit/core';
import { Button, Drawer } from '@mui/material';
import Dashboard from './Dashboard.tsx'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(3)
    const [open, setOpen] = useState<boolean>();
    const [word] = useState<string>('this is a word');

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='bg-#282c34 min-h-100vh flex flex-col items-center justify-center color-white'>Vite + React</h1>
        <HassConnect hassUrl={import.meta.env.VITE_HA_URL} hassToken={import.meta.env.VITE_HA_TOKEN}>
            <ThemeProvider/>
            <Button onClick={() => setOpen(!open)}>{word}</Button>
            <Drawer open={open}  onClose={() => setOpen(!open)}>
                <div>HELLO</div>
            </Drawer>
            <Dashboard/>
        </HassConnect>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
