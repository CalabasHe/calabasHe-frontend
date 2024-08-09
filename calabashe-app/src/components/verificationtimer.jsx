import { useState, useEffect } from 'react';

const Countdown = ({ duration }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsFinished(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className={`text-sm md:text-base ${isFinished ? 'text-red-500' : 'text-orange-600'}`}>
      {isFinished ? "Time's up! Please restart sign up process" : `Your verification code expires in: ${formatTime(timeRemaining)}`}
    </div>
  );
};

export default Countdown;
