import { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Professional Validation Logic
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    console.log("Form Submitted Successfully:", formData);
    alert("Welcome aboard!");
    // Here you would typically call your API (e.g., fetch or axios)
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>
        
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label>Username</label>
          <input 
            type="text" name="username" 
            value={formData.username} onChange={handleChange} 
            style={styles.input} placeholder="johndoe"
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Email Address</label>
          <input 
            type="email" name="email" 
            value={formData.email} onChange={handleChange} 
            style={styles.input} placeholder="name@company.com"
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password</label>
          <input 
            type="password" name="password" 
            value={formData.password} onChange={handleChange} 
            style={styles.input} placeholder="••••••••"
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Confirm Password</label>
          <input 
            type="password" name="confirmPassword" 
            value={formData.confirmPassword} onChange={handleChange} 
            style={styles.input} placeholder="••••••••"
          />
        </div>

        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

// Simple professional inline styles
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6' },
  form: { background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#333' },
  inputGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' },
  error: { color: 'red', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }
};

export default SignupForm;