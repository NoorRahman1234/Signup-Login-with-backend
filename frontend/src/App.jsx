import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './signup';
import Login from './login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to login by default */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Define our routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 404 Page (Optional) */}
        <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;