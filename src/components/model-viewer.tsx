
'use client';
import type { ModelViewerElement } from '@google/model-viewer';
import React, { useEffect, useRef } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.AllHTMLAttributes<ModelViewerElement> & {
            "ar-status"?: string;
            "ar-tracking"?: string;
        },
        ModelViewerElement
      >;
    }
  }
}

interface ModelViewerProps {
    src: string;
    alt: string;
    itemScale: number;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ src, alt, itemScale }) => {
    const modelRef = useRef<ModelViewerElement>(null);
    
    // We can't declaratively map quantity to scale, so we use an effect.
    useEffect(() => {
        if(modelRef.current) {
             // Simple scaling logic: increase scale with quantity, but not linearly.
            const scale = 1 + Math.log10(Math.max(1, itemScale));
            modelRef.current.scale = `${scale} ${scale} ${scale}`;
        }
    }, [itemScale, src]); // Re-run if src changes too

  return (
    <model-viewer
      ref={modelRef}
      src={src}
      alt={alt}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      style={{ width: '100%', height: '400px' }}
    ></model-viewer>
  );
};
