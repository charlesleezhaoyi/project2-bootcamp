import React, { useEffect, useState } from 'react';

const Hourglass = ({ duration, onComplete }) => {
  const [filledPercentage, setFilledPercentage] = useState(0);

  useEffect(() => {
    let startTime;

    const animationFrame = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const percentage = Math.min((elapsed / duration) * 100, 100);
      setFilledPercentage(percentage);

      if (percentage < 100) {
        requestAnimationFrame(animationFrame);
      } else {
        // Animation complete, trigger onComplete callback
        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
      }
    };

    requestAnimationFrame(animationFrame);

    return () => {
      // Cleanup function if needed
    };
  }, [duration, onComplete]);

  return (
    <div className="hourglass-container">
      <div className="hourglass" style={{ height: `${filledPercentage}%` }} />
    </div>
  );
};

export default Hourglass;
