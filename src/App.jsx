import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import GameDetail from './Pages/GameDetail'
import DefaultLayout from './layout/DefaultLayout'
import { GlobalProvider } from './Context/GlobalContext'

function App() {

  return (
    <>
    <GlobalProvider>
    <Router>
      <Routes>
                  <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/game/:id" element={<GameDetail />} />
                  </Route>
      </Routes>
    </Router>
</GlobalProvider>
    </>
  )
}

export default App
