import { useState } from 'react'
import './App.css'
import Ui from './component/Ui'
import Header from './component/Header'

function App() {

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col items-center">
        <Header />
        <Ui />
      </div>
    </>
  )
}

export default App
