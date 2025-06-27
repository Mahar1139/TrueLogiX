'use client';

import { useState, useRef, useEffect } from 'react';
import { faqChatbot } from '@/ai/flows/faq-chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bot, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

const suggestedQuestions = [
  'What is TrueLogiX?',
  'What courses do you offer?',
  'Who created TrueLogiX?',
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-bot-message',
      text: "Hello! I'm the TrueLogiX assistant. How can I help you today?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (questionText: string) => {
    if (questionText.trim() === '') return;

    const userMessage: Message = { id: Date.now().toString(), text: questionText, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { answer } = await faqChatbot({ question: questionText });
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: answer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I am having trouble connecting. Please try again later.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };
  
  const handleSuggestedQuestionClick = (question: string) => {
    sendMessage(question);
  };


  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollableView = scrollAreaRef.current.querySelector('div');
        if (scrollableView) {
             scrollableView.scrollTop = scrollableView.scrollHeight;
        }
    }
  }, [messages]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
          size="icon"
          aria-label="Open Chatbot"
        >
          <Bot className="h-7 w-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-80 rounded-lg border-2 p-0 sm:w-96"
      >
        <div className="flex flex-col h-[60vh]">
          <header className="flex items-center justify-between p-4 border-b">
            <div className='flex items-center gap-2'>
              <Bot className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-headline font-semibold">FAQ Bot</h3>
            </div>
          </header>
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-end gap-2',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'bot' && (
                    <Avatar className='h-8 w-8'>
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg px-3 py-2 text-sm',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.text}
                  </div>
                   {message.sender === 'user' && (
                    <Avatar className='h-8 w-8'>
                        <AvatarFallback><User size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {messages.length === 1 && !isLoading && (
                <div className="px-4 pb-4 flex flex-col items-start space-y-2">
                  <p className='text-sm text-muted-foreground mb-2'>Or ask one of these questions:</p>
                  {suggestedQuestions.map((q) => (
                    <Button
                      key={q}
                      variant="outline"
                      size="sm"
                      className="h-auto w-full justify-start text-left py-1.5 px-3"
                      onClick={() => handleSuggestedQuestionClick(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              )}

              {isLoading && (
                 <div className="flex items-end gap-2 justify-start">
                    <Avatar className='h-8 w-8'>
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                        <div className="flex items-center justify-center gap-1">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 delay-0"></span>
                            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 delay-150"></span>
                            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 delay-300"></span>
                        </div>
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Ask a question..."
                className="pr-10"
                disabled={isLoading}
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={handleSend}
                disabled={isLoading}
                aria-label="Send Message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
