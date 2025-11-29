import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ui/ParticleBackground';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const { setCurrentUser, students } = useAppContext();
  const navigate = useNavigate();

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(captcha);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Verify captcha
    if (captchaInput !== captchaCode) {
      alert('❌ Invalid captcha! Please try again.');
      generateCaptcha();
      return;
    }
    
    if (role === 'student') {
      const student = students.find(s => s.email === email && s.password === password);
      if (student) {
        setCurrentUser({ ...student, role: 'student' });
        navigate('/student');
      } else {
        alert('❌ Invalid email or password!');
        generateCaptcha();
      }
    } else {
      setCurrentUser({ email, role: 'admin', name: 'Admin User' });
      navigate('/admin');
    }
  };

  return (
    <div className="login-container">
      <ParticleBackground />
      
      <motion.button
        className="back-home-btn"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        ← Back to Home
      </motion.button>

      <motion.div
        className="login-trophy"
        animate={{
          y: [-20, 20, -20],
          rotate: [-10, 10, -10]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        🏆
      </motion.div>

      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <motion.div
          className="login-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="login-icon-group">
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>🏅</motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>🎓</motion.span>
            <motion.span animate={{ rotate: [0, -360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>⭐</motion.span>
          </div>
          <h1>Welcome Back!</h1>
          <p>Login to access your achievement portal</p>
        </motion.div>
        
        <form onSubmit={handleLogin}>
          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <label>📧 Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35, type: 'spring' }}
          >
            <label>🔒 Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <label>👤 Login As</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">🎓 Student</option>
              <option value="admin">⚙️ Admin</option>
            </select>
          </motion.div>

          <motion.div 
            className="form-group captcha-group"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.45, type: 'spring' }}
          >
            <label>🔐 Captcha Verification</label>
            <div className="captcha-container">
              <div className="captcha-display">
                <span className="captcha-text">{captchaCode}</span>
              </div>
              <motion.button
                type="button"
                className="captcha-refresh"
                onClick={generateCaptcha}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                title="Refresh Captcha"
              >
                🔄
              </motion.button>
            </div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter the captcha above"
              required
              maxLength={6}
            />
          </motion.div>
          
          <motion.button 
            type="submit" 
            className="login-btn"
            whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span>Login Now</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </form>

        <motion.div 
          className="register-link"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Don't have an account? 
          <button onClick={() => navigate('/register')}>Register here</button>
        </motion.div>
        
        <motion.div 
          className="demo-credentials"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="demo-header">
            <span className="demo-icon">🔑</span>
            <strong>Demo Credentials</strong>
          </div>
          <div className="demo-list">
            <div className="demo-item">
              <span className="role-badge student-badge">Student</span>
              <span className="email">rahul@student.com</span>
              <span className="password-hint">• password123</span>
            </div>
            <div className="demo-item">
              <span className="role-badge student-badge">Student</span>
              <span className="email">priya@student.com</span>
              <span className="password-hint">• password123</span>
            </div>
            <div className="demo-item">
              <span className="role-badge admin-badge">Admin</span>
              <span className="email">Any email/password works</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="login-floating-icons">
        {['🥇', '🥈', '🥉', '🏅', '🎖️', '⚡', '✨'].map((icon, i) => (
          <motion.div
            key={i}
            className="floating-login-icon"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Login;
