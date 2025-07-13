import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
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
                  </Route>
      </Routes>
    </Router>
</GlobalProvider>
    </>
  )
}

export default App
