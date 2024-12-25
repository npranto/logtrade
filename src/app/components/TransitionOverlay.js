import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const TransitionOverlay = ({ onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const entryTimerRef = useRef(null);
  const exitTimerRef = useRef(null);

  useEffect(() => {
    entryTimerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => {
      if (entryTimerRef.current) {
        clearTimeout(entryTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    exitTimerRef.current = setTimeout(() => {
      onClose();
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Overlay background with smooth fade-in transition */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-end transition-opacity duration-150 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
      >
        {/* Sidebar modal itself, sliding in with smooth transition */}
        <div
          className={`bg-white p-8 rounded-lg shadow-lg max-w-md w-full overflow-y-auto h-screen max-h-[1200px] transform transition-transform duration-300 ease-in-out ${
            isVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="document"
          aria-describedby="overlay-description"
        >
          {React.cloneElement(children, { onClose: handleClose })}
        </div>
      </div>
    </>
  );
};

TransitionOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default TransitionOverlay;
