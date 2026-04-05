import { BuilderCanvas } from '@/components/builder/BuilderCanvas';
import { Sidebar } from '@/components/builder/Sidebar';
import { PropertiesPanel } from '@/components/builder/PropertiesPanel';
import { TopBar } from '@/components/builder/TopBar';

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar className="w-64 border-r border-gray-200" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar className="h-16 border-b border-gray-200 bg-white shadow-sm" />
        
        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden relative">
          <BuilderCanvas className="flex-1" />
        </div>
      </div>
      
      {/* Properties Panel */}
      <PropertiesPanel className="w-80 border-l border-gray-200" />
    </div>
  );
}