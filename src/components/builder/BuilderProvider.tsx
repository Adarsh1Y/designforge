import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type ComponentType = 
  | 'hero'
  | 'nav'
  | 'grid'
  | 'card'
  | 'footer'
  | 'cta'
  | 'gallery'
  | 'text'
  | 'image'
  | 'button';

export type ComponentProps = {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  style: Record<string, string>;
};

export type BuilderState = {
  components: ComponentProps[];
  selectedId: string | null;
  canvasRef: React.RefObject<HTMLDivElement> | null;
};

// Context
const BuilderContext = createContext<{
  state: BuilderState;
  dispatch: React.Dispatch<any>;
}>({
  state: {
    components: [],
    selectedId: null,
    canvasRef: null,
  },
  dispatch: () => null,
});

export const BuilderProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BuilderState>({
    components: [],
    selectedId: null,
    canvasRef: null,
  });

  const dispatch = (action: { type: string; payload?: any }) => {
    switch (action.type) {
      case 'ADD_COMPONENT':
        setState(prev => ({
          ...prev,
          components: [
            ...prev.components,
            {
              id: Math.random().toString(36).substr(2, 9),
              type: action.payload.type,
              props: action.payload.props || {},
              style: action.payload.style || {},
            },
          ],
        }));
        break;
      
      case 'SELECT_COMPONENT':
        setState(prev => ({
          ...prev,
          selectedId: action.payload.id,
        }));
        break;
      
      case 'UPDATE_COMPONENT':
        setState(prev => ({
          ...prev,
          components: prev.components.map(comp =>
            comp.id === action.payload.id
              ? { ...comp, ...action.payload.updates }
              : comp
          ),
        }));
        break;
      
      case 'DELETE_COMPONENT':
        setState(prev => ({
          ...prev,
          components: prev.components.filter(comp => comp.id !== action.payload.id),
          selectedId: prev.selectedId === action.payload.id ? null : prev.selectedId,
        }));
        break;
      
      case 'SET_CANVAS_REF':
        setState(prev => ({
          ...prev,
          canvasRef: action.payload.ref,
        }));
        break;
      
      default:
        break;
    }
  };

  return (
    <BuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};