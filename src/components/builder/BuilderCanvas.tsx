'use client';

import { useBuilder } from './BuilderProvider';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ComponentType } from './BuilderProvider';

export const BuilderCanvas = ({ className = '' }: { className?: string }) => {
  const { state, dispatch } = useBuilder();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState(-1);

  // Set canvas ref on mount
  useEffect(() => {
    dispatch({ type: 'SET_CANVAS_REF', payload: { ref: canvasRef } });
    return () => {
      dispatch({ type: 'SET_CANVAS_REF', payload: { ref: null } });
    };
  }, [dispatch]);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDragOverIndex(-1);
  }, []);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(-1);
    
    const data = JSON.parse(e.dataTransfer.getData('application/component'));
    if (!data) return;

    // Insert at the drop position
    dispatch({ 
      type: 'ADD_COMPONENT', 
      payload: {
        type: data.type,
        props: data.props,
        style: { 
          position: 'absolute',
          left: `${e.clientX - (canvasRef.current?.getBoundingClientRect()?.left ?? 0)}px`,
          top: `${e.clientY - (canvasRef.current?.getBoundingClientRect()?.top ?? 0)}px`,
          ...data.style
        }
      }
    });
  }, [dispatch]);

  // Handle component click for selection
  const handleComponentClick = useCallback((id: string) => {
    dispatch({ type: 'SELECT_COMPONENT', payload: { id } });
  }, [dispatch]);

  // Render components
  const renderedComponents = state.components.map((comp, index) => {
    const isSelected = state.selectedId === comp.id;
    
    return (
      <div
        key={comp.id}
        id={`comp-${comp.id}`}
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData(
            'application/component',
            JSON.stringify({
              type: comp.type,
              props: comp.props,
              style: comp.style
            })
          );
          setIsDragging(true);
        }}
        onDragEnd={() => setIsDragging(false)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
        onClick={() => handleComponentClick(comp.id)}
        className={`absolute select-none transition-transform duration-200 ${
          isSelected 
            ? 'border-2 border-blue-500 bg-blue-50/50'
            : 'border-dashed border-gray-300 bg-white/50'
        }`}
        style={{
          ...comp.style,
          zIndex: state.selectedId === comp.id ? 1000 : 10,
          opacity: isDragging && state.selectedId === comp.id ? 0.5 : 1,
        }}
      >
        {/* Component preview */}
        <div className="p-4">
          {renderComponentPreview(comp.type, comp.props)}
        </div>
        
        {/* Selection handles */}
        {isSelected && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded"/>
            <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded"/>
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-blue-500 rounded"/>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded"/>
          </div>
        )}
      </div>
    );
  });

  // Render component preview based on type
  const renderComponentPreview = (type: ComponentType, props: Record<string, any>) => {
    switch (type) {
      case 'hero':
        return (
          <div className="w-64 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
            Hero Section
          </div>
        );
      case 'nav':
        return (
          <div className="w-64 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white text-sm font-medium">
            Navigation
          </div>
        );
      case 'grid':
        return (
          <div className="w-64 h-32 bg-gray-100 rounded-lg grid grid-cols-2 gap-2 p-2">
            {[0,1,2,3].map(i => (
              <div key={i} className="bg-gray-300 rounded"></div>
            ))}
          </div>
        );
      case 'card':
        return (
          <div className="w-48 h-32 bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 bg-gray-300 rounded mb-2"></div>
            <div className="text-center text-gray-600 text-sm">
              Card Title
            </div>
          </div>
        );
      case 'footer':
        return (
          <div className="w-64 h-16 bg-gray-900 rounded-lg flex items-center justify-center text-white text-sm font-medium">
            Footer
          </div>
        );
      case 'cta':
        return (
          <div className="w-48 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
            Call to Action
          </div>
        );
      case 'gallery':
        return (
          <div className="w-64 h-32 bg-gray-100 rounded-lg flex flex-wrap gap-2 p-2">
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="w-1/3 h-8 bg-gray-300 rounded"></div>
            ))}
          </div>
        );
      case 'text':
        return (
          <div className="w-64 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-2 text-gray-600 text-sm">
            Lorem ipsum dolor sit amet
          </div>
        );
      case 'image':
        return (
          <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="w-32 h-24 bg-gray-400 rounded flex items-center justify-center text-gray-600 text-xs">
              Image
            </div>
          </div>
        );
      case 'button':
        return (
          <div className="w-32 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-medium">
            Button
          </div>
        );
      default:
        return <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">Unknown</div>;
    }
  };

  return (
    <div
      ref={canvasRef}
      className={`relative flex-1 min-h-0 bg-white ${className} overflow-hidden`}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        setDragOverIndex(-1);
        // Handle dropping onto empty canvas
        const data = JSON.parse(e.dataTransfer.getData('application/component'));
        if (data) {
          dispatch({ 
            type: 'ADD_COMPONENT', 
            payload: {
              type: data.type,
              props: data.props,
              style: { 
                position: 'absolute',
                left: `${e.clientX - (canvasRef.current?.getBoundingClientRect()?.left ?? 0)}px`,
                top: `${e.clientY - (canvasRef.current?.getBoundingClientRect()?.top ?? 0)}px`,
                ...data.style
              }
            }
          });
        }
      }}
    >
      {/* Drop indicator */}
      {dragOverIndex >= 0 && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-500 bg-blue-50/50 pointer-events-none" />
      )}
      
      {/* Components */}
      {renderedComponents}
      
      {/* Selection box for multiple selection (future feature) */}
      {isDragging && (
        <div className="absolute inset-0 pointer-events-none" />
      )}
    </div>
  );
};