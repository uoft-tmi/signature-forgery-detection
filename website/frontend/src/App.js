import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path='home' element={<Home />}/>
          <Route path='about' />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
