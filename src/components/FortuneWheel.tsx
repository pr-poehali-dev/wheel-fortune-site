import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface WheelSegment {
  id: string;
  text: string;
  color: string;
  prize: string;
  coins: number;
}

const wheelSegments: WheelSegment[] = [
  { id: '1', text: '100', color: '#FF6B35', prize: '100 монет', coins: 100 },
  { id: '2', text: '50', color: '#F7931E', prize: '50 монет', coins: 50 },
  { id: '3', text: '200', color: '#06FFA5', prize: '200 монет', coins: 200 },
  { id: '4', text: '75', color: '#4361EE', prize: '75 монет', coins: 75 },
  { id: '5', text: '500', color: '#F72585', prize: '500 монет', coins: 500 },
  { id: '6', text: '25', color: '#9b87f5', prize: '25 монет', coins: 25 },
  { id: '7', text: '150', color: '#FF6B35', prize: '150 монет', coins: 150 },
  { id: '8', text: '300', color: '#06FFA5', prize: '300 монет', coins: 300 },
];

export default function FortuneWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);
    setResult(null);

    // Random rotation between 3-6 full spins plus random segment
    const spins = 3 + Math.random() * 3;
    const randomDegree = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + randomDegree;
    
    setRotation(totalRotation);

    // Calculate winning segment
    const segmentAngle = 360 / wheelSegments.length;
    const normalizedAngle = (360 - (totalRotation % 360)) % 360;
    const winningSegmentIndex = Math.floor(normalizedAngle / segmentAngle);
    const winner = wheelSegments[winningSegmentIndex];

    setTimeout(() => {
      setIsSpinning(false);
      setResult(winner);
      setShowResult(true);
    }, 4000);
  };

  const segmentAngle = 360 / wheelSegments.length;

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-white wheel-shadow"></div>
        </div>
        
        {/* Wheel */}
        <div
          ref={wheelRef}
          className={`w-80 h-80 rounded-full relative wheel-shadow transition-transform duration-[4000ms] ease-out ${
            isSpinning ? 'animate-spin-wheel' : ''
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(
              ${wheelSegments.map((segment, index) => {
                const startAngle = index * segmentAngle;
                const endAngle = (index + 1) * segmentAngle;
                return `${segment.color} ${startAngle}deg ${endAngle}deg`;
              }).join(', ')}
            )`
          }}
        >
          {/* Segments with text */}
          {wheelSegments.map((segment, index) => {
            const angle = index * segmentAngle + segmentAngle / 2;
            const textRadius = 110;
            const x = Math.cos((angle - 90) * (Math.PI / 180)) * textRadius;
            const y = Math.sin((angle - 90) * (Math.PI / 180)) * textRadius;
            
            return (
              <div
                key={segment.id}
                className="absolute text-white font-bold text-xl"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {segment.text}
              </div>
            );
          })}
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center">
            <Icon name="Zap" size={24} className="text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`px-8 py-4 text-xl font-bold bg-gradient-to-r from-wheel-orange to-wheel-blue text-white rounded-xl hover:scale-105 transition-all duration-200 ${
          isSpinning ? 'animate-pulse-glow' : ''
        }`}
      >
        {isSpinning ? (
          <div className="flex items-center space-x-2">
            <Icon name="RotateCw" size={24} className="animate-spin" />
            <span>Крутится...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Icon name="Play" size={24} />
            <span>КРУТИТЬ КОЛЕСО</span>
          </div>
        )}
      </Button>

      {/* Result Modal */}
      {showResult && result && (
        <Card className="p-6 bg-gradient-to-br from-wheel-orange/10 to-wheel-blue/10 border-2 border-wheel-orange/30 animate-bounce-in">
          <div className="text-center space-y-4">
            <Icon name="Trophy" size={48} className="text-yellow-500 mx-auto" />
            <h3 className="text-2xl font-bold gradient-text">Поздравляем!</h3>
            <p className="text-lg">Вы выиграли:</p>
            <div className="text-3xl font-bold text-wheel-orange">{result.prize}</div>
            <Button
              onClick={() => setShowResult(false)}
              className="bg-gradient-to-r from-wheel-green to-wheel-blue text-white"
            >
              Забрать приз
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}