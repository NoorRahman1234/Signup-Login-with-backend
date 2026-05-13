import { useState } from 'react';

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

    // Mock API Call
    setTimeout(() => {
      if (credentials.email === "admin@example.com" && credentials.password === "password123") {
        alert("Login Successful! Redirecting...");
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Please enter your details</p>
        
        {error && <div style={styles.errorBanner}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input 
            type="email" name="email" required
            value={credentials.email} onChange={handleChange} 
            style={styles.input} placeholder="Enter your email"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input 
            type="password" name="password" required
            value={credentials.password} onChange={handleChange} 
            style={styles.input} placeholder="••••••••"
          />
        </div>

        <div style={styles.row}>
          <label style={styles.checkboxLabel}>
            <input 
              type="checkbox" name="rememberMe" 
              checked={credentials.rememberMe} onChange={handleChange} 
            />
            Remember me
          </label>
          <a href="#" style={styles.forgotPass}>Forgot password?</a>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{...styles.button, opacity: isLoading ? 0.7 : 1}}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <p style={styles.footerText}>
          Don't have an account? <a href="./Signup" style={styles.link}>Sign up</a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  form: { background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  title: { margin: '0 0 10px 0', textAlign: 'center', color: '#1a1a1a', fontSize: '24px' },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: '30px', fontSize: '14px' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333', fontSize: '14px' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', outline: 'none', transition: 'border 0.3s' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', fontSize: '13px' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  forgotPass: { color: '#007bff', textDecoration: 'none', fontWeight: '500' },
  button: { width: '100%', padding: '12px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' },
  errorBanner: { backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' },
  footerText: { textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#666' },
  link: { color: '#007bff', textDecoration: 'none', fontWeight: '600' }
};

export default LoginForm;