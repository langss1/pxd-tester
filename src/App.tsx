import React, { useState } from 'react';
import Certificate from './components/Certificate';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Delete, Grip } from 'lucide-react';

type Category = 'premium' | 'gold' | 'platinum';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [category, setCategory] = useState<Category>('premium');

  // Handle 3D Tilt for background potentially? 
  // For now keeping it simple but responsive.

  const handleUnlockRequest = () => {
    setShowModal(true);
    setPassword('');
    setError(false);
  };

  const handlePinInput = (digit: string) => {
    if (password.length < 4) {
      const newPass = password + digit;
      setPassword(newPass);
      if (newPass.length === 4) {
        if (newPass === '1234') {
          setIsUnlocked(true);
          setShowModal(false);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
            setPassword('');
          }, 500);
        }
      }
    }
  };

  return (
    <div className="app-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      fontFamily: "'Space Grotesk', sans-serif",
      color: 'white',
      overflow: 'hidden'
    }}>

      {/* --- FULL SCREEN IMMERSIVE BACKGROUNDS --- */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <AnimatePresence mode="wait">

          {/* PLATINUM: The "1 Layar" Immersive Experience */}
          {category === 'platinum' && (
            <motion.div
              key="platinum-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ position: 'absolute', inset: 0, background: '#050510' }}
            >
              {/* Deep Space Gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, #1a1a40 0%, #000000 100%)' }} />

              {/* Moving Nebula/Aurora Effect (CSS-based) */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%'],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                style={{
                  position: 'absolute', inset: -100,
                  background: 'linear-gradient(45deg, rgba(0,255,255,0.1), rgba(120,50,255,0.2), rgba(0,255,255,0.1))',
                  filter: 'blur(60px)',
                  transform: 'skewY(-5deg)'
                }}
              />

              {/* Diamond Rain Effect */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`diamond-${i}`}
                  initial={{ y: -100, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), opacity: 0, rotate: 45 }}
                  animate={{
                    y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                    opacity: [0, 1, 0],
                    rotate: [45, 225] // Spin while falling
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2, // Faster fall for rain
                    repeat: Infinity,
                    ease: 'linear',
                    delay: Math.random() * 5
                  }}
                  style={{
                    position: 'absolute',
                    left: 0, // Controlled by x in initial/animate or just set here
                    top: 0,
                    width: Math.random() * 8 + 4,
                    height: Math.random() * 8 + 4,
                    background: 'linear-gradient(135deg, #fff, #00f2ff)',
                    boxShadow: '0 0 10px rgba(0, 242, 255, 0.8)',
                    borderRadius: '2px', // Slight rounding
                    zIndex: 1
                  }}
                />
              ))}

              {/* Grid Floor */}
              <div style={{
                position: 'absolute', bottom: -100, left: -500, right: -500, height: 400,
                background: 'repeating-linear-gradient(90deg, rgba(0,255,255,0.1) 0px, rgba(0,255,255,0.1) 1px, transparent 1px, transparent 100px), repeating-linear-gradient(0deg, rgba(0,255,255,0.1) 0px, rgba(0,255,255,0.1) 1px, transparent 1px, transparent 50px)',
                transform: 'perspective(500px) rotateX(60deg)',
                opacity: 0.3,
                maskImage: 'linear-gradient(to top, black, transparent)'
              }} />

            </motion.div>
          )}

          {/* GOLD: Luxurious Radial Glow & Golden Dust */}
          {category === 'gold' && (
            <motion.div
              key="gold-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ position: 'absolute', inset: 0, background: '#050505' }}
            >
              {/* Ambient Pulse Center */}
              <motion.div
                animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  width: '80vw', height: '80vw',
                  background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
                  filter: 'blur(50px)'
                }}
              />

              {/* Golden Blur Particles (Dust) - INTENSIFIED */}
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`gold-dust-${i}`}
                  animate={{
                    y: [Math.random() * -150, Math.random() * 150],
                    x: [Math.random() * -100, Math.random() * 100],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: Math.random() * 5 + 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: Math.random() * 120 + 60,
                    height: Math.random() * 120 + 60,
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 60%)', // BRIGHTER GOLD
                    filter: 'blur(20px)',
                    mixBlendMode: 'screen'
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* PREMIUM: Clean Industrial Gray */}
          {category === 'premium' && (
            <motion.div
              key="premium-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ position: 'absolute', inset: 0, background: '#e0e0e0' }}
            >
              <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* --- CONTENT Z-INDEX 10 --- */}
      <div style={{
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center vertically
        width: '100%',
        height: '100vh', // Take full height
        paddingBottom: '80px', // Space for bottom nav
        boxSizing: 'border-box'
      }}>

        {/* Header Branding */}
        <div style={{
          position: 'absolute', top: '20px', left: '25px',
          color: category === 'premium' ? 'black' : 'white',
          fontFamily: "'Syncopate', sans-serif", fontWeight: 'bold',
          zIndex: 20
        }}>
          PXD.
        </div>

        {/* Scaled Certificate Container */}
        <div style={{
          transform: 'scale(0.85)', // Slight scale down for mobile safety
          transformOrigin: 'center center',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Certificate
            category={category}
            name="Gilang Wasis Wicaksono"
            isUnlocked={isUnlocked}
            onUnlockRequest={handleUnlockRequest}
          />
        </div>

        {/* Floating Dock Tier Selection - FIXED BOTTOM */}
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          width: '90%',
          maxWidth: '350px'
        }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            background: 'rgba(20,20,20,0.9)',
            padding: '5px',
            borderRadius: '100px', // Pill shape
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            {(['premium', 'gold', 'platinum'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  background: category === cat ? (cat === 'premium' ? '#fff' : cat === 'gold' ? '#FFD700' : '#00ffff') : 'transparent',
                  color: category === cat ? (cat === 'premium' ? 'black' : 'black') : '#888',
                  border: 'none',
                  padding: '12px 0',
                  width: '100%',
                  borderRadius: '100px',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                }}
              >
                {category === cat && <motion.div layoutId="active-dot" style={{ width: 4, height: 4, background: 'black', borderRadius: '50%' }} />}
                {cat.slice(0, 4)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- PIN MODAL (Full Screen Overlay) --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(5,5,5,0.85)',
              zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              style={{ width: '100%', maxWidth: '320px', padding: '20px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '60px', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Grip size={20} />
                  <span style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '0.9rem' }}>SECURITY CHECK</span>
                </div>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
              </div>

              {/* Input Visualizer */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '60px' }}>
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                    style={{
                      width: '30px', height: '2px',
                      background: i < password.length ? '#fff' : '#333',
                      transition: 'background 0.2s'
                    }}
                  />
                ))}
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', rowGap: '30px',
                justifyItems: 'center'
              }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePinInput(num.toString())}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      cursor: 'pointer',
                      width: '70px', height: '70px',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gridColumn: num === 0 ? '2' : 'auto' // Position 0 correctly
                    }}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => setPassword(p => p.slice(0, -1))}
                  style={{
                    background: 'transparent', border: 'none', color: '#666',
                    gridColumn: '3', gridRow: '4', // Place Delete button
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Delete />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
