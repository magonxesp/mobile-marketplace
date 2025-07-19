import './App.css'
import DefaultLayout from './layout/DefaultLayout'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
