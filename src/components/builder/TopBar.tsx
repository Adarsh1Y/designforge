'use client';

import { useBuilder } from './BuilderProvider';

export const TopBar = ({ className = '' }: { className?: string }) => {
  const { state } = useBuilder();
  
  return (
    <header className={`flex items-center justify-between px-4 py-3 ${className}`}>
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">Untitled Project</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded"></div>
            <span>Saved</span>
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded"></div>
            <span>Online</span>
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Breakpoint controls */}
        <div className="flex items-center gap-2 text-sm">
          <span>View:</span>
          <div className="flex items-center gap-1">
            <button 
              className={`p-2 rounded hover:bg-gray-100 ${state.canvasRef?.current ? '' : 'opacity-50 pointer-events-none'}`}
              onClick={() => alert('Desktop view')}
            >
              💻
            </button>
            <button 
              className={`p-2 rounded hover:bg-gray-100 ${state.canvasRef?.current ? '' : 'opacity-50 pointer-events-none'}`}
              onClick={() => alert('Tablet view')}
            >
              📱
            </button>
            <button 
              className={`p-2 rounded hover:bg-gray-100 ${state.canvasRef?.current ? '' : 'opacity-50 pointer-events-none'}`}
              onClick={() => alert('Mobile view')}
            >
              📞
            </button>
          </div>
        </div>
        
        {/* Zoom controls */}
        <div className="flex items-center gap-2 text-sm">
          <span>Zoom:</span>
          <div className="flex items-center gap-1">
            <button 
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => alert('Zoom out')}
            >
              −
            </button>
            <span className="w-8 text-center">100%</span>
            <button 
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => alert('Zoom in')}
            >
              +
            </button>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => alert('Undo')}
          >
            ↶
          </button>
          <button 
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => alert('Redo')}
          >
            ↷
          </button>
          <button 
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => alert('Copy')}
          >
            ▭
          </button>
          <button 
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => alert('Delete')}
          >
            ×
          </button>
        </div>
      </div>
    </header>
  );
};