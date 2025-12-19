// src/pages/Login.jsx
import './Signup.css'; // reuse same layout styles
import { useNavigate } from 'react-router-dom';
function Login() {
      const navigate = useNavigate();
  return (
    <div className="signup-layout">
      <div className="signup-left">
        <header className="signup-header">
          <div className="signup-logo">
            <div className="flex items-center gap-2">
            <img src="src/Logo.jpg" alt="Aimpay logo" className="w-8 h-9 rounded-md object-contain" />
            <span className="text-lg font-bold tracking-tight"> Pay </span>
            </div>
          </div>
          <button className="lang-btn">EN</button>
        </header>

        <h1 className="signup-title">Sign In</h1>

        <form className="signup-form">
          <label>
            Email
            <input type="email" placeholder="Email" />
          </label>

          <label>
            Password
            <input type="password" placeholder="Password" />
          </label>

          <div style={{ marginTop: '0.4rem', marginBottom: '1.2rem' }}>
            <a href="#" style={{ color: '#ff4b2b', fontSize: '0.85rem' }}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn-signup">
            Log in
          </button>
        </form>

        <p className="login-text">
          Don&apos;t have an account? <a href="/signup"  onClick={() => navigate('/login')}>Sign up</a>
        </p>
      </div>

      <div className="signup-right">
        <div className="signup-hero">
          <h1>One wallet for all needs</h1>
          <p>Single account for all your payments.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
