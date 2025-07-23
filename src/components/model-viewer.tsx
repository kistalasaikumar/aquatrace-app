
'use client';
import React, { useRef, useEffect } from 'react';

// Make sure you have this import if you're using TypeScript
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'model-viewer': any;
//     }
//   }
// }

interface ModelViewerProps {
    src: string;
    alt: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ src, alt }) => {
  const modelViewerRef = useRef<any>(null);

  // Set a default scale, can be adjusted
  const modelScale = "1 1 1";

  useEffect(() => {
    // The model-viewer component might not be ready immediately.
    // We use a small timeout to ensure it's loaded before we try to access its properties.
    const timer = setTimeout(() => {
      if (modelViewerRef.current) {
        modelViewerRef.current.scale = modelScale;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [src, modelScale]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
       <model-viewer
        ref={modelViewerRef}
        src={src}
        alt={alt}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
    </div>
  );
};
