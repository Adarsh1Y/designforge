import { useState, useCallback } from 'react';

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type AIModel = 'anthropic/claude-3.5-sonnet' | 'google/gemini-2.0-flash' | 'meta-llama/llama-3.3-70b-instruct';

export const useAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string, systemPrompt?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const allMessages: Message[] = [];
      
      if (systemPrompt) {
        allMessages.push({ role: 'system', content: systemPrompt });
      }
      
      allMessages.push(...messages);
      allMessages.push({ role: 'user', content });

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to get AI response');
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message;

      if (assistantMessage) {
        setMessages(prev => [...prev, { role: 'user', content }, assistantMessage]);
        return assistantMessage.content;
      }

      throw new Error('Invalid response format');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};

// Design-specific system prompts
export const DESIGN_SYSTEM_PROMPT = `You are DesignForge, an AI-powered website builder assistant. You help users design and build websites visually.

You can help with:
1. Suggesting layouts and components based on the user's needs
2. Recommending color palettes and typography
3. Generating component configurations
4. Providing design advice and best practices

When用户提供具体需求时, generate a JSON response with the appropriate component configuration.

Example responses:
- For "I want a hero section for a tech startup": Generate hero component with tech-oriented styling
- For "Make it more modern": Suggest design improvements`;

export const COMPONENT_SYSTEM_PROMPT = `You are a component generator for DesignForge website builder. Generate component configurations in JSON format.

Available components:
- hero: Full-width hero section with title, subtitle, and CTA
- nav: Navigation bar with logo and links
- grid: Grid layout for content cards
- card: Content card with image, title, description
- footer: Footer with links and copyright
- cta: Call-to-action section
- gallery: Image gallery grid
- text: Text block
- image: Image placeholder
- button: Interactive button

Respond with JSON object containing the component configuration. Example:
{"type": "hero", "props": {"title": "Welcome", "subtitle": "Description", "ctaText": "Get Started"}, "style": {"background": "linear-gradient(...)"}}`;