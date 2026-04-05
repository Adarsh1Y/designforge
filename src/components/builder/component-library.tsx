'use client';

import { useBuilder } from './BuilderProvider';
import { ComponentType } from './BuilderProvider';

export const ComponentLibrary = () => {
  const { dispatch } = useBuilder();
  
  const components: Array<{
    id: ComponentType;
    label: string;
    icon: React.ReactNode;
    category: 'layout' | 'content' | 'interaction';
  }> = [
    // Layout
    { id: 'hero', label: 'Hero', icon: <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600"/>, category: 'layout' },
    { id: 'nav', label: 'Navigation', icon: <div className="w-4 h-4 bg-gray-800"/>, category: 'layout' },
    { id: 'grid', label: 'Grid', icon: <div className="w-4 h-4 bg-gray-100 grid grid-cols-2 gap-1 p-0.5"><div className="bg-gray-300"></div><div className="bg-gray-300"></div><div className="bg-gray-300"></div><div className="bg-gray-300"></div></div>, category: 'layout' },
    { id: 'footer', label: 'Footer', icon: <div className="w-4 h-4 bg-gray-900"/>, category: 'layout' },
    
    // Content
    { id: 'card', label: 'Card', icon: <div className="w-4 h-4 bg-white rounded shadow"><div className="w-2 h-2 bg-gray-300 rounded mx-auto my-1"/><div className="w-3 h-0.5 bg-gray-600 mx-auto my-1"/></div>, category: 'content' },
    { id: 'gallery', label: 'Gallery', icon: <div className="w-4 h-4 bg-gray-100 flex flex-wrap gap-0.5"><div className="w-2 h-2 bg-gray-300"/><div className="w-2 h-2 bg-gray-300"/><div className="w-2 h-2 bg-gray-300"/><div className="w-2 h-2 bg-gray-300"/></div>, category: 'content' },
    { id: 'text', label: 'Text', icon: <div className="w-4 h-4 flex items-center justify-center text-gray-500 text-xs">TXT</div>, category: 'content' },
    { id: 'image', label: 'Image', icon: <div className="w-4 h-4 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">IMG</div>, category: 'content' },
    
    // Interaction
    { id: 'cta', label: 'Call to Action', icon: <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs">CTA</div>, category: 'interaction' },
    { id: 'button', label: 'Button', icon: <div className="w-4 h-4 bg-blue-500 text-white flex items-center justify-center text-xs font-bold">BTN</div>, category: 'interaction' },
  ];
  
  const handleDragStart = (type: ComponentType) => (e: React.DragEvent) => {
    e.dataTransfer.setData(
      'application/component',
      JSON.stringify({
        type,
        props: {},
        style: {}
      })
    );
  };
  
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-4">Components</h3>
      <div className="space-y-2">
        {components.map(({ id, label, icon, category }) => (
          <div key={id} className={`flex items-center gap-3 p-3 bg-white rounded-lg shadow-hover border cursor-grab transition-all duration-200 hover:shadow-md hover:border-blue-300`}
            draggable={true}
            onDragStart={handleDragStart(id as ComponentType)}
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">{icon}</div>
            <div>
              <div className="font-medium">{label}</div>
              <div className="text-xs text-gray-500 capitalize">{category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};