'use server';

/**
 * @fileOverview Personalized course recommendations flow.
 *
 * This file defines a Genkit flow that recommends courses based on a user's provided skills and interests.
 * It takes user skills and interests as input and returns a list of recommended courses with descriptions.
 *
 * @interface PersonalizedCourseRecommendationsInput - Input for the personalized course recommendations flow.
 * @interface PersonalizedCourseRecommendationsOutput - Output of the personalized course recommendations flow.
 * @function getPersonalizedCourseRecommendations - A function that calls the personalized course recommendations flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  skills: z
    .string()
    .describe('The user skills (e.g. web design, coding, robotics).'),
  interests: z
    .string()
    .describe('The user interests (e.g. AI, machine learning, game development).'),
});
export type PersonalizedCourseRecommendationsInput = z.infer<
  typeof PersonalizedCourseRecommendationsInputSchema
>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  courses: z.array(
    z.object({
      title: z.string().describe('The title of the course.'),
      description: z.string().describe('A brief description of the course.'),
    })
  ).describe('A list of recommended courses.'),
});
export type PersonalizedCourseRecommendationsOutput = z.infer<
  typeof PersonalizedCourseRecommendationsOutputSchema
>;

export async function getPersonalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized course recommendations.

  Based on the user's skills and interests, recommend a list of courses that would be most relevant to them.

  Skills: {{{skills}}}
  Interests: {{{interests}}}

  Consider web design, coding, and robotics courses.  Provide a title and brief description for each course.

  Return the output in JSON format.`,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
