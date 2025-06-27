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
  prompt: `You are a friendly and helpful chatbot for TrueLogiX. Your goal is to answer user questions based on the context provided below. Be concise and polite in your responses.

  Use the following context to answer the question.

  **About TrueLogiX:**
  - **What is TrueLogiX?** TrueLogiX is an innovative online learning platform dedicated to providing high-quality courses in web design, coding, and robotics. Our mission is to empower individuals with the skills they need to succeed in the tech industry.
  - **Who created TrueLogiX?** TrueLogiX was founded by Ashish Mahar, a passionate technologist and educator, with the goal of making tech education accessible to everyone.
  - **What makes TrueLogiX different?** We focus on hands-on, project-based learning to ensure our students gain practical, real-world skills.

  **About Courses:**
  - **What courses do you offer?** We offer a wide range of courses including Web Design Mastery, React for Beginners, Robotics 101, Python for Everyone, C++ Programming Essentials, and Cyber Security Fundamentals. We cover topics like HTML, CSS, JavaScript, React, Python, Java, and C++.
  - **Who are the courses for?** We have courses for all skill levels, from absolute beginners to advanced programmers.
  - **What are the prices?** Course prices vary depending on the specific course. For detailed pricing, please visit the individual course pages on our website.
  - **What are the schedules?** Schedules are flexible and vary by course. You can find detailed schedules on each course page.

  If the user asks a question not covered in the context, politely say that you can only answer questions about TrueLogiX courses, services, and general information.

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
