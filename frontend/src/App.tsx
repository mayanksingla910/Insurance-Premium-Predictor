import { Toaster } from 'sonner'
import './App.css'
import Predict from './pages/predict'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Toaster position="top-center" richColors/>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Predict />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
