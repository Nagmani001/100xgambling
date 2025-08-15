//TODO: polish the UI 
import { useEffect, useRef } from 'react';
import { rouletteNumbers } from '../config/utils';

interface RouletteWheelProps {
  isSpinning: boolean;
  finalNumber: number;
  onSpinComplete: () => void;
}


const RouletteWheel: React.FC<RouletteWheelProps> = ({
  isSpinning,
  finalNumber,
  onSpinComplete
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSpinning && wheelRef.current && ballRef.current) {
      // Calculate the angle for the final number
      const finalIndex = rouletteNumbers.findIndex(n => n.number === finalNumber);
      const anglePerSegment = 360 / rouletteNumbers.length;
      const finalAngle = -finalIndex * anglePerSegment;

      // Add multiple rotations for realistic effect
      const totalRotation = finalAngle + (360 * 5); // 5 full rotations plus final position

      // Apply wheel animation
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
      wheelRef.current.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';

      // Apply ball animation (opposite direction)
      ballRef.current.style.transform = `rotate(${-totalRotation + 180}deg)`;
      ballRef.current.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';

      // Reset after animation
      const timer = setTimeout(() => {
        if (wheelRef.current && ballRef.current) {
          wheelRef.current.style.transition = 'none';
          ballRef.current.style.transition = 'none';
          wheelRef.current.style.transform = `rotate(${finalAngle}deg)`;
          ballRef.current.style.transform = `rotate(${-finalAngle + 180}deg)`;
        }
        onSpinComplete();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isSpinning, finalNumber, onSpinComplete]);

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      {/* Outer rim */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-2xl">
        {/* Inner wheel */}
        <div
          ref={wheelRef}
          className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-inner"
        >
          {/* Number segments */}
          {rouletteNumbers.map((item, index) => {
            const angle = (index * 360) / rouletteNumbers.length;
            const isGreen = item.color === 'green';
            const isRed = item.color === 'red';

            return (
              <div
                key={`${item.number}-${index}`}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center'
                }}
              >
                <div
                  className={`absolute top-2 left-1/2 w-6 h-8 -ml-3 flex items-center justify-center text-white text-xs font-bold transform -rotate-90 ${isGreen
                    ? 'bg-green-600'
                    : isRed
                      ? 'bg-red-600'
                      : 'bg-gray-900'
                    }`}
                  style={{
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
                  }}
                >
                  {item.number === 0 && index === rouletteNumbers.length - 1 ? '00' : item.number}
                </div>
              </div>
            );
          })}

          {/* Center hub */}
          <div className="absolute inset-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg border-2 border-amber-300"></div>
        </div>

        {/* Ball */}
        <div
          ref={ballRef}
          className="absolute inset-0"
        >
          <div className="absolute top-1 left-1/2 w-3 h-3 -ml-1.5 bg-white rounded-full shadow-lg transform -translate-y-1"></div>
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400 transform -translate-x-1/2 -translate-y-1 z-10"></div>
      </div>
    </div>
  );
};

export default RouletteWheel;
