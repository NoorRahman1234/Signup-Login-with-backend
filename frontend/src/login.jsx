
import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // --- REAL API CALL ---
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: credentials.email,
        password: credentials.password
      });

      // 1. If successful, save the token (just like in Postman)
      localStorage.setItem('token', response.data.token);
      
      alert("Login Successful! Welcome back.");
      
      // 2. Redirect the user (e.g., to your POS dashboard)
      window.location.href = '/dashboard'; 

    } catch (err) {
      // 3. If backend returns an error (e.g., "Invalid password")
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Please enter your details</p>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input 
              type="email" name="email" required
              value={credentials.email} onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black transition" 
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" name="password" required
              value={credentials.password} onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black transition" 
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input 
                type="checkbox" name="rememberMe" 
                checked={credentials.rememberMe} onChange={handleChange} 
                className="w-4 h-4 accent-black"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-600 font-medium hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 bg-black text-white rounded-lg font-bold text-lg transition ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <p className="text-center mt-8 text-gray-600 text-sm">
          Don't have an account? <a href="/signup" className="text-blue-600 font-bold hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;