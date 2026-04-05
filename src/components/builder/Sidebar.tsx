'use client';

import { useState } from 'react';
import { ComponentLibrary } from './component-library';
import { AIChatPanel } from './AIChatPanel';
import { useBuilder } from './BuilderProvider';

export const Sidebar = ({ className = '' }: { className?: string }) => {
  const { state } = useBuilder();
  const [activeTab, setActiveTab] = useState<'components' | 'ai'>('components');
  
  const handleSave = () => {
    const projectData = JSON.stringify(state.components, null, 2);
    const blob = new Blob([projectData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'designforge-project.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleExport = () => {
    let code = `import React from 'react';\n\n`;
    
    state.components.forEach((comp, i) => {
      code += `// ${comp.type} component\n`;
      code += `const Component${i} = () => (\n`;
      code += `  <div style={{ ${Object.entries(comp.style).map(([k, v]) => `${k}: '${v}'`).join(', ')} }}>\n`;
      code += `    {/* ${comp.type} content */}\n`;
      code += `  </div>\n);\n\n`;
    });
    
    code += `export default function Page() {\n`;
    code += `  return (\n`;
    state.components.forEach((_, i) => {
      code += `    <Component${i} />\n`;
    });
    code += `  );\n}`;
    
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'designforge-export.jsx';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <aside className={`flex flex-col ${className}`}>
      <div className="flex-shrink-0 border-r border-gray-200 bg-white h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">DesignForge</h2>
          <p className="text-sm text-gray-500 mt-1">AI Website Builder</p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('components')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'components'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Components
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'ai'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🤖 AI
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'components' ? (
            <nav className="h-full overflow-y-auto">
              <ComponentLibrary />
            </nav>
          ) : (
            <div className="h-full p-2">
              <AIChatPanel />
            </div>
          )}
        </div>
        
        {/* Project Controls */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="space-y-2">
            <button 
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              onClick={handleSave}
            >
              💾 Save Project
            </button>
            
            <button 
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              onClick={handleExport}
            >
              📦 Export Code
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};