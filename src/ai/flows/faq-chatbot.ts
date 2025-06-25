// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview A FAQ chatbot AI agent.
 *
 * - faqChatbot - A function that handles the FAQ chatbot process.
 * - FAQChatbotInput - The input type for the faqChatbot function.
 * - FAQChatbotOutput - The return type for the faqChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FAQChatbotInputSchema = z.object({
  question: z.string().describe('The question to ask the chatbot.'),
});
export type FAQChatbotInput = z.infer<typeof FAQChatbotInputSchema>;

const FAQChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer from the chatbot.'),
});
export type FAQChatbotOutput = z.infer<typeof FAQChatbotOutputSchema>;

export async function faqChatbot(input: FAQChatbotInput): Promise<FAQChatbotOutput> {
  return faqChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faqChatbotPrompt',
  input: {schema: FAQChatbotInputSchema},
  output: {schema: FAQChatbotOutputSchema},
  prompt: `You are a chatbot that answers questions about web design, coding, and robotics courses, pricing, and schedules.

  Use the following context to answer the question.
  Context: We offer courses in web design, coding, and robotics. Our courses cover topics such as HTML, CSS, JavaScript, React, Python, Java, C++, and more. We offer courses for beginners and experts. Our prices vary depending on the course. Our schedules vary depending on the course.

  Question: {{{question}}}`,
});

const faqChatbotFlow = ai.defineFlow(
  {
    name: 'faqChatbotFlow',
    inputSchema: FAQChatbotInputSchema,
    outputSchema: FAQChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
