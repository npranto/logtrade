import React from 'react';
import styles from './styles.module.css';

const AnimatedBackground = () => {
  return (
    <div className={styles.area}>
      <ul className={styles.circles}>
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  );
};

export default AnimatedBackground;
