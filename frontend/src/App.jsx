import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateCard from './pages/CreateCard';
import ViewCard from './pages/ViewCard';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateCard />} />
          <Route path="/card/:id" element={<ViewCard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
