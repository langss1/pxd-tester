import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Cpu,
    QrCode,
    Aperture,
    Fingerprint,
    Zap,
    Gem,
    Layers
} from 'lucide-react';

type Category = 'premium' | 'gold' | 'platinum';

interface CertificateProps {
    category: Category;
    name: string;
    isUnlocked: boolean;
    onUnlockRequest: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ category, name, isUnlocked, onUnlockRequest }) => {

    // DESIGN SYSTEM PER TIER
    const getDesign = () => {
        switch (category) {
            case 'premium': // "The Standard / Industrial"
                return {
                    bg: '#e8e8e8',
                    bgGradient: 'linear-gradient(160deg, #dce0e6 0%, #c4c9d4 100%)',
                    text: '#1a1a1a',
                    accent: '#000000',
                    border: '1px solid #999',
                    shadow: '0 20px 40px rgba(0,0,0,0.4)',
                    decor: 'industrial', // Custom flag for conditional rendering
                    icon: <Layers size={24} />,
                    label: "CERTIFIED STANDARD"
                };
            case 'gold': // "The Luxury / Heritage"
                return {
                    bg: '#000',
                    bgGradient: 'radial-gradient(circle at 100% 0%, #daa520 0%, #000 60%)',
                    text: '#FFD700',
                    accent: '#FFF',
                    border: '1px solid #FFD700',
                    shadow: '0 20px 50px rgba(255, 215, 0, 0.2)',
                    decor: 'luxury',
                    icon: <Gem size={24} />,
                    label: "GOLD RESERVE"
                };
            case 'platinum': // "The Future / Ethereal"
                return {
                    bg: '#000',
                    // A deep, dark base with a strong, magically colored gradient on top
                    bgGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                    text: '#ffffff',
                    accent: '#00f2ff', // Cyan Neon
                    border: '1px solid rgba(255,255,255,0.2)',
                    shadow: '0 20px 60px rgba(120, 80, 255, 0.3)', // Purple/Blue glow
                    decor: 'future',
                    icon: <Zap size={24} color="#00f2ff" />,
                    label: "PLATINUM INFINITY"
                };
        }
    };

    const style = getDesign();

    return (
        <div style={{ perspective: '1200px' }}>
            <motion.div
                animate={
                    category === 'platinum' ? { rotateY: [0, 5, 0, -5, 0], rotateX: [5, 0, -5, 0, 5] } :
                        category === 'gold' ? { y: [0, -8, 0] } :
                            {}
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    width: '100%',
                    maxWidth: '360px', // Slimmer, taller phone aspect ratio
                    minHeight: '620px',
                    background: style.bgGradient,
                    borderRadius: '24px',
                    padding: '0', // Full bleed
                    position: 'relative',
                    boxShadow: style.shadow,
                    border: style.border,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backdropFilter: category === 'platinum' ? 'blur(20px)' : 'none',
                }}
            >

                {/* --- ANIMATED OVERLAYS --- */}

                {/* Premium: Industrial Scan Line */}
                {category === 'premium' && (
                    <motion.div
                        animate={{ top: ['-10%', '110%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                        style={{
                            position: 'absolute', left: 0, width: '100%', height: '2px',
                            background: 'rgba(0,0,0,0.5)',
                            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}
                    />
                )}

                {/* Gold: Sparkles / Sheen */}
                {category === 'gold' && (
                    <motion.div
                        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute', inset: 0,
                            background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'rgba(255, 215, 0, 0.2)\'/%3E%3C/svg%3E")',
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />
                )}

                {/* Platinum: Holographic Mesh */}
                {category === 'platinum' && (
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.4) 0%, rgba(15, 23, 42, 0) 70%)',
                        mixBlendMode: 'screen',
                        pointerEvents: 'none'
                    }} />
                )}


                {/* --- CARD CONTENT CONTAINER --- */}
                <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', zIndex: 10, height: '100%' }}>

                    {/* 1. TOP HEADER */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `2px solid ${category === 'premium' ? 'black' : 'rgba(255,255,255,0.2)'}`, paddingBottom: '20px', marginBottom: 'auto' }}>
                        <div>
                            <h1 style={{
                                margin: 0,
                                fontFamily: "'Syncopate', sans-serif",
                                fontWeight: '700',
                                fontSize: '1.5rem',
                                color: style.text,
                                letterSpacing: '-1px'
                            }}>
                                PXD.<span style={{ fontSize: '0.5em', verticalAlign: 'top' }}>®</span>
                            </h1>
                            <div style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '0.65rem',
                                color: style.text,
                                opacity: 0.7,
                                letterSpacing: '1px',
                                marginTop: '4px'
                            }}>
                                AUTH. VERIFICATION UNIT
                            </div>
                        </div>
                        <div style={{
                            border: `1px solid ${style.text}`,
                            borderRadius: '50px',
                            padding: '6px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ color: style.text }}>
                                <Aperture size={14} />
                            </motion.div>
                            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: style.text }}>{category.slice(0, 3).toUpperCase()}</span>
                        </div>
                    </div>

                    {/* 2. MAIN PROOF (Chip & ID) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>

                        {/* Visual Chip */}
                        <div style={{
                            width: '80px', height: '80px',
                            borderRadius: '16px',
                            background: category === 'gold' ? 'linear-gradient(135deg, #FFD700, #FDB931)' : style.text,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '30px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            position: 'relative'
                        }}>
                            {/* Chip Lines */}
                            <Cpu size={40} color={category === 'gold' ? '#000' : (category === 'premium' ? '#fff' : '#000')} strokeWidth={1.5} />

                            {/* Scanning Animation Loop */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    position: 'absolute', inset: -5, borderRadius: '20px',
                                    border: `1px solid ${style.text}`,
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', letterSpacing: '2px', color: style.text, opacity: 0.7, marginBottom: '8px' }}>
                                SECURE ASSET OWNER
                            </div>

                            {/* INTERACTIVE NAME FIELD */}
                            <motion.div
                                onClick={!isUnlocked ? onUnlockRequest : undefined}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: isUnlocked ? 'transparent' : 'rgba(0,0,0,0.2)',
                                    cursor: isUnlocked ? 'default' : 'pointer',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {isUnlocked ? (
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="glitch-effect" // Placeholder for potential CSS class
                                        style={{
                                            fontFamily: "'Syncopate', sans-serif",
                                            fontWeight: '700',
                                            fontSize: '1.4rem',
                                            color: style.text,
                                            margin: 0,
                                            textTransform: 'uppercase',
                                            lineHeight: '1.2'
                                        }}
                                    >
                                        GILANG<br />WICAKSONO
                                    </motion.h2>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                        <div style={{
                                            fontFamily: "'Syncopate', sans-serif",
                                            fontWeight: '700',
                                            fontSize: '1.5rem',
                                            filter: 'blur(6px)',
                                            color: style.text,
                                            opacity: 0.5,
                                            userSelect: 'none'
                                        }}>
                                            ENCRYPTED
                                        </div>
                                        <div style={{
                                            background: '#ff3b30',
                                            color: 'white',
                                            fontSize: '0.6rem',
                                            fontWeight: 'bold',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            display: 'flex', alignItems: 'center', gap: '4px'
                                        }}>
                                            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ width: 4, height: 4, borderRadius: '50%', background: 'white' }} />
                                            LOCKED
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                    </div>

                    {/* 3. DETAILS GRID */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px',
                        borderTop: `1px dashed ${category === 'premium' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'}`,
                        paddingTop: '20px',
                        marginTop: 'auto'
                    }}>
                        <div>
                            <div style={{ fontSize: '0.6rem', fontWeight: 'bold', color: style.text, opacity: 0.6 }}>TIER CLASS</div>
                            <div style={{ fontSize: '0.9rem', fontFamily: "'Syncopate', sans-serif", fontWeight: '700', color: style.text }}>{category.toUpperCase()}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.6rem', fontWeight: 'bold', color: style.text, opacity: 0.6 }}>ORIGIN DATE</div>
                            <div style={{ fontSize: '0.9rem', fontFamily: "'Space Grotesk', sans-serif", color: style.text }}>29.01.2026</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.6rem', fontWeight: 'bold', color: style.text, opacity: 0.6 }}>VERIFIED BY</div>
                            <div style={{ fontSize: '0.9rem', fontFamily: "'Space Grotesk', sans-serif", color: style.text }}>PXD LABS</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.6rem', fontWeight: 'bold', color: style.text, opacity: 0.6 }}>SERIAL KEY</div>
                            <div style={{ fontSize: '0.9rem', fontFamily: "'Space Grotesk', sans-serif", color: style.text }}>#992-001</div>
                        </div>
                    </div>

                    {/* 4. FOOTER SEAL */}
                    <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} style={{ width: '4px', height: '24px', background: style.text, opacity: 0.3 + (i * 0.1) }} />
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ShieldCheck size={18} color={style.text} />
                            <span style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '0.7rem', fontWeight: '700', color: style.text }}>
                                AUTHENTIC
                            </span>
                        </div>
                    </div>

                </div>

            </motion.div>
        </div>
    );
};

export default Certificate;
