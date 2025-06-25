import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export const recommendationFormSchema = z.object({
  skills: z.string().min(3, { message: 'Please list at least one skill.' }),
  interests: z.string().min(3, { message: 'Please list at least one interest.' }),
});

export const websiteLeadSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  whatsapp: z.string().optional(),
  projectDetails: z.string().min(10, { message: 'Please provide some details about your project.' }),
});
