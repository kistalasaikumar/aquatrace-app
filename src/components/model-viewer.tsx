
'use client';
import React from 'react';

interface ModelViewerProps {
    src: string;
    alt: string;
    itemScale: number; // This prop is no longer used for scaling but kept for compatibility
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ src, alt }) => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <iframe
        title={alt}
        src={src}
        allow="autoplay; fullscreen; vr"
        allowFullScreen
        style={{ width: '100%', height: '100%', border: 'none' }}
      ></iframe>
    </div>
  );
};

    