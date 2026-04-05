'use client';

import { useBuilder, ComponentType } from './BuilderProvider';

export const PropertiesPanel = ({ className = '' }: { className?: string }) => {
  const { state, dispatch } = useBuilder();
  
  const selectedComponent = state.components.find(c => c.id === state.selectedId);
  
  if (!selectedComponent) {
    return (
      <aside className={`flex flex-col bg-gray-50 ${className}`}>
        <div className="p-4 border-b border-gray-200 bg-white">
          <h3 className="font-semibold">Properties</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-gray-500 text-center text-sm">
            Select a component to edit its properties
          </p>
        </div>
      </aside>
    );
  }
  
  const updateProp = (key: string, value: any) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        id: selectedComponent.id,
        updates: {
          props: { ...selectedComponent.props, [key]: value }
        }
      }
    });
  };
  
  const updateStyle = (key: string, value: string) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        id: selectedComponent.id,
        updates: {
          style: { ...selectedComponent.style, [key]: value }
        }
      }
    });
  };
  
  const deleteComponent = () => {
    dispatch({
      type: 'DELETE_COMPONENT',
      payload: { id: selectedComponent.id }
    });
  };
  
  const getComponentFields = (type: ComponentType) => {
    const fields: Record<string, Array<{ name: string; label: string; type: string; default?: string }>> = {
      hero: [
        { name: 'title', label: 'Title', type: 'text', default: 'Welcome to Our Site' },
        { name: 'subtitle', label: 'Subtitle', type: 'text', default: 'Discover amazing content' },
        { name: 'ctaText', label: 'CTA Text', type: 'text', default: 'Get Started' },
        { name: 'bgGradient', label: 'Background', type: 'select', default: 'blue-purple' },
      ],
      nav: [
        { name: 'logo', label: 'Logo Text', type: 'text', default: 'Brand' },
        { name: 'links', label: 'Links (comma separated)', type: 'text', default: 'Home,About,Services,Contact' },
      ],
      grid: [
        { name: 'columns', label: 'Columns', type: 'number', default: '3' },
        { name: 'gap', label: 'Gap (px)', type: 'number', default: '16' },
        { name: 'items', label: 'Items', type: 'number', default: '6' },
      ],
      card: [
        { name: 'title', label: 'Title', type: 'text', default: 'Card Title' },
        { name: 'description', label: 'Description', type: 'textarea', default: 'Card description goes here' },
        { name: 'imageUrl', label: 'Image URL', type: 'text', default: '' },
      ],
      footer: [
        { name: 'companyName', label: 'Company Name', type: 'text', default: 'Company' },
        { name: 'links', label: 'Links', type: 'text', default: 'Privacy,Terms,Contact' },
      ],
      cta: [
        { name: 'title', label: 'Title', type: 'text', default: 'Ready to get started?' },
        { name: 'buttonText', label: 'Button Text', type: 'text', default: 'Sign Up Now' },
      ],
      gallery: [
        { name: 'columns', label: 'Columns', type: 'number', default: '3' },
        { name: 'images', label: 'Number of Images', type: 'number', default: '6' },
      ],
      text: [
        { name: 'content', label: 'Text Content', type: 'textarea', default: 'Enter your text here' },
        { name: 'size', label: 'Font Size', type: 'select', default: '16' },
        { name: 'align', label: 'Text Align', type: 'select', default: 'left' },
      ],
      image: [
        { name: 'src', label: 'Image URL', type: 'text', default: '' },
        { name: 'alt', label: 'Alt Text', type: 'text', default: 'Image' },
      ],
      button: [
        { name: 'text', label: 'Button Text', type: 'text', default: 'Click Me' },
        { name: 'variant', label: 'Variant', type: 'select', default: 'primary' },
      ],
    };
    return fields[type] || [];
  };
  
  const componentFields = getComponentFields(selectedComponent.type);
  
  return (
    <aside className={`flex flex-col bg-gray-50 ${className}`}>
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="font-semibold capitalize">{selectedComponent.type} Properties</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Component-specific properties */}
        <section>
          <h4 className="text-sm font-medium mb-3 text-gray-700">Content</h4>
          <div className="space-y-3">
            {componentFields.map(field => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={selectedComponent.props[field.name] || field.default}
                    onChange={e => updateProp(field.name, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={selectedComponent.props[field.name] || field.default}
                    onChange={e => updateProp(field.name, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {field.name === 'bgGradient' && (
                      <>
                        <option value="blue-purple">Blue to Purple</option>
                        <option value="green-emerald">Green to Emerald</option>
                        <option value="orange-red">Orange to Red</option>
                        <option value="pink-rose">Pink to Rose</option>
                      </>
                    )}
                    {field.name === 'variant' && (
                      <>
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="outline">Outline</option>
                      </>
                    )}
                    {field.name === 'size' && (
                      <>
                        <option value="14">Small</option>
                        <option value="16">Medium</option>
                        <option value="18">Large</option>
                        <option value="24">Extra Large</option>
                      </>
                    )}
                    {field.name === 'align' && (
                      <>
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </>
                    )}
                  </select>
                ) : field.type === 'number' ? (
                  <input
                    type="number"
                    value={selectedComponent.props[field.name] || field.default}
                    onChange={e => updateProp(field.name, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={selectedComponent.props[field.name] || field.default}
                    onChange={e => updateProp(field.name, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
        
        {/* Style properties */}
        <section>
          <h4 className="text-sm font-medium mb-3 text-gray-700">Style</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Width</label>
              <input
                type="text"
                value={selectedComponent.style.width || ''}
                onChange={e => updateStyle('width', e.target.value)}
                placeholder="e.g., 100% or 300px"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Height</label>
              <input
                type="text"
                value={selectedComponent.style.height || ''}
                onChange={e => updateStyle('height', e.target.value)}
                placeholder="e.g., 200px or auto"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Padding</label>
              <input
                type="text"
                value={selectedComponent.style.padding || ''}
                onChange={e => updateStyle('padding', e.target.value)}
                placeholder="e.g., 16px or 1rem 2rem"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Margin</label>
              <input
                type="text"
                value={selectedComponent.style.margin || ''}
                onChange={e => updateStyle('margin', e.target.value)}
                placeholder="e.g., 16px or 1rem 2rem"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedComponent.style.backgroundColor || '#ffffff'}
                  onChange={e => updateStyle('backgroundColor', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedComponent.style.backgroundColor || ''}
                  onChange={e => updateStyle('backgroundColor', e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Position */}
        <section>
          <h4 className="text-sm font-medium mb-3 text-gray-700">Position</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">X Position</label>
                <input
                  type="text"
                  value={selectedComponent.style.left || ''}
                  onChange={e => updateStyle('left', e.target.value)}
                  placeholder="e.g., 100px"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Y Position</label>
                <input
                  type="text"
                  value={selectedComponent.style.top || ''}
                  onChange={e => updateStyle('top', e.target.value)}
                  placeholder="e.g., 100px"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Delete button */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={deleteComponent}
          className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
        >
          Delete Component
        </button>
      </div>
    </aside>
  );
};