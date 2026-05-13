// import { useState } from 'react';

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     // Professional Validation Logic
//     if (!formData.username || !formData.email || !formData.password) {
//       setError("All fields are required.");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (formData.password.length < 8) {
//       setError("Password must be at least 8 characters.");
//       return;
//     }

//     console.log("Form Submitted Successfully:", formData);
//     alert("Welcome aboard!");
//     // Here you would typically call your API (e.g., fetch or axios)
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <h2 style={styles.title}>Create Account</h2>
        
//         {error && <p style={styles.error}>{error}</p>}

//         <div style={styles.inputGroup}>
//           <label>Username</label>
//           <input 
//             type="text" name="username" 
//             value={formData.username} onChange={handleChange} 
//             style={styles.input} placeholder="johndoe"
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Email Address</label>
//           <input 
//             type="email" name="email" 
//             value={formData.email} onChange={handleChange} 
//             style={styles.input} placeholder="name@company.com"
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Password</label>
//           <input 
//             type="password" name="password" 
//             value={formData.password} onChange={handleChange} 
//             style={styles.input} placeholder="••••••••"
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Confirm Password</label>
//           <input 
//             type="password" name="confirmPassword" 
//             value={formData.confirmPassword} onChange={handleChange} 
//             style={styles.input} placeholder="••••••••"
//           />
//         </div>

//         <button type="submit" style={styles.button}>Sign Up</button>
//       </form>
//     </div>
//   );
// };

// // Simple professional inline styles
// const styles = {
//   container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6' },
//   form: { background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' },
//   title: { textAlign: 'center', marginBottom: '20px', color: '#333' },
//   inputGroup: { marginBottom: '15px' },
//   input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' },
//   button: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' },
//   error: { color: 'red', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }
// };

// export default SignupForm;









import { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // 2. API Call to Backend
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // 3. Handle Success
      console.log("Success:", response.data);
      alert("Registration Successful!");
      
      // Save token to localStorage (just like we did in Postman)
      localStorage.setItem('token', response.data.token);

    } catch (err) {
      // Handle Error from Backend (e.g., "User already exists")
      setError(err.response?.data?.message || "Server Error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        
        {error && <p className="bg-red-100 text-red-600 p-2 rounded text-sm mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" name="username" value={formData.username} onChange={handleChange} 
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="noor_rahman"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange} 
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="noor@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange} 
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} 
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </div>

          <p className="text-center mt-8 text-gray-600 text-sm">
          If you have already register go to login page <a href="/login" className="text-blue-600 font-bold hover:underline">Login</a>
        </p>

      </form>
    </div>
  );
};

export default SignupForm;