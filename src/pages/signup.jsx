// src/pages/Signup.jsx
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import v1 from "../public/v1.mp4";

function Signup() {
  const navigate = useNavigate();
  return (
    <div className="signup-layout">
      <div className="signup-left">
        <header className="signup-header">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2"></a>
            <img src="src/public/Logo.jpg" alt="Aimpay logo" className="w-8 h-9 rounded-md object-contain" />
            <span className="text-lg font-bold tracking-tight"> Pay </span>
          </div>
        </header>

        <h1 className="signup-title">Sign up</h1>

        <form className="signup-form">

          <label>
            Email
            <input type="email" placeholder="Email" />
          </label>

          <label>
            Password
            <input type="password" placeholder="Password" />
          </label>

          <label>
            Name
            <input type="text" placeholder="Name" />
          </label>

          <label>
            Phone number
            <input type="tel" placeholder="Phone number" />
          </label>

          <label className="checkbox-row">
            <input type="checkbox" />
            <span>
              I confirm that I have read and agree with{' '}
              <a href="#">Terms and Conditions</a> and{' '}
              <a href="#">Privacy Policy</a>.
            </span>
          </label>

          <button type="submit" className="btn-signup">
            Sign up
          </button>
        </form>

        <p className="login-text" onClick={() => navigate('/login')}>
          You have an account? <a href="#" >Log in</a>
        </p>
      </div>

      <div className="signup-right">
        <div className="signup-hero">
          <h1>One wallet for all needs</h1>
          <p>Single account for all your payments.</p>

          {/* Put background image in CSS */}

        </div>

      </div>
    </div>
  );
}

export default Signup;
