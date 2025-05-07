import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEnvelope, FaIdBadge } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error)
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>
        {error}
      </div>
    );

  if (!profile)
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</div>
    );

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e9d5ff, #fdf4ff)',
    padding: '20px',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(128, 90, 213, 0.2)',
    padding: '30px',
    width: '100%',
    maxWidth: '480px',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
  };

  const iconStyle = {
    fontSize: '80px',
    color: '#9333ea',
    marginBottom: '20px',
  };

  const headingStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px',
  };

  const valueStyle = {
    fontSize: '18px',
    fontWeight: '500',
    color: '#374151',
  };

  const detailBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#f3e8ff',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '16px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
  };

  const detailIconStyle = {
    fontSize: '20px',
    color: '#a855f7',
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={cardStyle}
      >
        <FaUserCircle style={iconStyle} />
        <h2 style={headingStyle}>Hello, {profile.username}!</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          Here’s your account info:
        </p>

        <div>
          <div style={detailBoxStyle}>
            <FaIdBadge style={detailIconStyle} />
            <div>
              <div style={labelStyle}>Username</div>
              <div style={valueStyle}>{profile.username}</div>
            </div>
          </div>

          <div style={detailBoxStyle}>
            <FaEnvelope style={detailIconStyle} />
            <div>
              <div style={labelStyle}>Email</div>
              <div style={valueStyle}>{profile.email}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
