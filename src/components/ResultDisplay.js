import React from 'react';

const ResultDisplay = ({ convertedAmount }) => {
  return (
    <div>
      <h2>Conversion Result:</h2>
      <p>{convertedAmount}</p>
    </div>
  );
};

export default ResultDisplay;
