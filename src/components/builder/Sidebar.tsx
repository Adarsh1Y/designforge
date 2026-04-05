'use client';

import { ComponentLibrary } from './component-library';
import { useBuilder } from './BuilderProvider';

export const Sidebar = ({ className = '' }: { className?: string }) => {
  const { state } = useBuilder();
  
  return (
    <aside className={`flex flex-col ${className}`}>
      <div className="flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">DesignForge</h2>
          <p className="text-sm text-gray-500 mt-1">AI Website Builder</p>
        </div>
        
        {/* Component Library */}
        <nav className="flex-1 overflow-y-auto">
          <ComponentLibrary />
        </nav>
        
        {/* Project Controls */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="space-y-3">
            <button 
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => alert('Save project feature coming soon!')}
            >
              Save Project
            </button>
            
            <button 
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => alert('Export code feature coming soon!')}
            >
              Export Code
            </button>
            
            <button 
              className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={() => alert('AI Design Assistant feature coming soon!')}
            >
              AI Assistant
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};