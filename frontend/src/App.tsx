import './App.css'
import Predict from './pages/predict'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
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
