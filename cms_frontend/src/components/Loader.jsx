import React from 'react';

const Loader = () => (
  <div id="wifi-loader" style={{ position: 'relative', width: '86px', height: '86px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <svg className="circle-outer" viewBox="0 0 86 86" style={{ position: 'absolute', width: '86px', height: '86px' }}>
      <circle className="back" cx="43" cy="43" r="40" style={{ fill: 'none', stroke: '#ddd', strokeWidth: 2 }}></circle>
      <circle className="front" cx="43" cy="43" r="40" style={{ fill: 'none', stroke: '#aaa', strokeWidth: 2, strokeDasharray: 251.2, strokeDashoffset: 251.2, animation: 'rotate 1.5s linear infinite, dash 1.5s ease-in-out infinite' }}></circle>
      <circle className="new" cx="43" cy="43" r="40" style={{ fill: 'none', stroke: '#ff3d00', strokeWidth: 2, strokeDasharray: 251.2, strokeDashoffset: 251.2, animation: 'rotate 1.5s linear infinite reverse, dash 1.5s ease-in-out infinite reverse' }}></circle>
    </svg>
    <svg className="circle-middle" viewBox="0 0 60 60" style={{ position: 'absolute', width: '60px', height: '60px' }}>
      <circle className="back" cx="30" cy="30" r="27" style={{ fill: 'none', stroke: '#ddd', strokeWidth: 2 }}></circle>
      <circle className="front" cx="30" cy="30" r="27" style={{ fill: 'none', stroke: '#aaa', strokeWidth: 2, strokeDasharray: 169.6, strokeDashoffset: 169.6, animation: 'rotate 1.5s linear infinite, dash 1.5s ease-in-out infinite' }}></circle>
    </svg>
    <svg className="circle-inner" viewBox="0 0 34 34" style={{ position: 'absolute', width: '34px', height: '34px' }}>
      <circle className="back" cx="17" cy="17" r="14" style={{ fill: 'none', stroke: '#ddd', strokeWidth: 2 }}></circle>
      <circle className="front" cx="17" cy="17" r="14" style={{ fill: 'none', stroke: '#aaa', strokeWidth: 2, strokeDasharray: 87.92, strokeDashoffset: 87.92, animation: 'rotate 1.5s linear infinite, dash 1.5s ease-in-out infinite' }}></circle>
    </svg>
    <div className="text" data-text="Searching" style={{ position: 'absolute', top: '100px', fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#555' }}>Loading</div>
    <style>
      {`
      @keyframes rotate {
        100% { transform: rotate(360deg); }
      }

      @keyframes dash {
        0% { stroke-dasharray: 1, 251.2; stroke-dashoffset: 0; }
        50% { stroke-dasharray: 150.6, 100.6; stroke-dashoffset: -75.3; }
        100% { stroke-dasharray: 1, 251.2; stroke-dashoffset: -251.2; }
      }
      `}
    </style>
  </div>
);

export default Loader;
