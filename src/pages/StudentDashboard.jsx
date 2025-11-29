import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import AchievementShowcase from '../features/student/AchievementShowcase';
import DashboardStats from '../features/student/DashboardStats';
import ParticipationTimeline from '../features/student/ParticipationTimeline';
import AchievementChart from '../components/ui/AchievementChart';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('achievements');
  const { currentUser, setCurrentUser, achievementList, participationList } = useAppContext();
  const navigate = useNavigate();

  const myAchievements = achievementList.filter(a => a.studentId === currentUser?.id);
  const myParticipations = participationList.filter(p => p.studentId === currentUser?.id);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const menuItems = [
    { id: 'achievements', icon: '🏆', label: 'Achievements', color: '#667eea' },
    { id: 'participation', icon: '🎯', label: 'Participation', color: '#4ecdc4' }
  ];

  return (
    <div className="dashboard-container">
      {/* Animated Background */}
      <div className="dashboard-bg-elements">
        {['🏅', '⭐', '🥇', '✨', '🎖️'].map((icon, i) => (
          <motion.div
            key={i}
            className="bg-float-icon"
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0.1
            }}
            animate={{
              y: [null, Math.random() * 200, null],
              x: [null, Math.random() * 200, null],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Sidebar */}
      <motion.nav 
        className="sidebar"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>🎓 Student Portal</h2>
        </motion.div>
        
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="avatar"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(255, 215, 0, 0.5)',
                '0 0 40px rgba(255, 215, 0, 0.8)',
                '0 0 20px rgba(255, 215, 0, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentUser?.name?.charAt(0).toUpperCase()}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <strong>{currentUser?.name}</strong>
          </motion.p>
          <p className="roll-number">{currentUser?.rollNumber}</p>
          <motion.p 
            className="department"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {currentUser?.department}
          </motion.p>
        </motion.div>
        
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => setActiveTab(item.id)}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ x: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderLeft: activeTab === item.id ? `4px solid ${item.color}` : '4px solid transparent'
              }}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </motion.li>
          ))}
          
          <motion.li
            className="logout-btn"
            onClick={handleLogout}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ x: 10, backgroundColor: 'rgba(231, 76, 60, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="menu-icon">🚪</span>
            Logout
          </motion.li>
        </ul>

        {/* Achievement Summary in Sidebar */}
        <motion.div
          className="sidebar-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h4>📊 Quick Stats</h4>
          <div className="quick-stat">
            <span>🏆</span>
            <span>{myAchievements.length} Achievements</span>
          </div>
          <div className="quick-stat">
            <span>🎯</span>
            <span>{myParticipations.length} Participations</span>
          </div>
        </motion.div>
      </motion.nav>
      
      {/* Main Content */}
      <div className="main-content">
        <motion.header 
          className="dashboard-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="header-content">
            <div>
              <motion.h1
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.6 }}
              >
                My Achievements Dashboard
                <motion.span
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 0.5, delay: 1 }}
                  style={{ display: 'inline-block', marginLeft: '10px' }}
                >
                  🎉
                </motion.span>
              </motion.h1>
              <p>Track your extracurricular accomplishments</p>
            </div>
            <motion.div
              className="header-trophy"
              animate={{ 
                y: [-5, 5, -5],
                rotate: [-5, 5, -5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🏅
            </motion.div>
          </div>
        </motion.header>
        
        <DashboardStats 
          achievements={myAchievements} 
          participations={myParticipations}
        />

        {myAchievements.length > 0 && (
          <AchievementChart achievements={myAchievements} />
        )}
        
        <AnimatePresence mode="wait">
          <div className="content-area">
            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <AchievementShowcase achievements={myAchievements} />
              </motion.div>
            )}
            
            {activeTab === 'participation' && (
              <motion.div
                key="participation"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <ParticipationTimeline participations={myParticipations} />
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentDashboard;
