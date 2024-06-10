import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './components/Layout';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signature-forgery-detection/" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route index element={<Navigate to="about" />} />
          <Route path='/signature-forgery-detection/home' element={<Home />}/>
          <Route path='/signature-forgery-detection/about' element={<About />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
