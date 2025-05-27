
import { useEffect, useState } from 'react';

interface ConfettiParticle {
  id: number;
  x: number;
  color: string;
  size: number;
  speed: number;
  delay: number;
}

const generateRandomParticles = (count: number): ConfettiParticle[] => {
  return Array.from({ length: count }).map((_, index) => ({
    id: index,
    x: Math.random() * 100,
    color: ['#9b87f5', '#D6BCFA', '#E5DEFF', '#7E69AB', '#6E59A5'][
      Math.floor(Math.random() * 5)
    ],
    size: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 3 + 2,
    delay: Math.random() * 5
  }));
};

const ConfettiEffect = () => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    setParticles(generateRandomParticles(50));
    
    // Add more particles after a small delay for a continuous effect
    const timer = setTimeout(() => {
      setParticles(prev => [...prev, ...generateRandomParticles(30)]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute animate-confetti"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            width: `${particle.size}rem`,
            height: `${particle.size / 2}rem`,
            backgroundColor: particle.color,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.8,
            borderRadius: '2px',
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
