'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { recommendationFormSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPersonalizedCourseRecommendations } from '@/ai/flows/personalized-course-recommendations';
import { Loader2, Wand2 } from 'lucide-react';

type Recommendation = {
  title: string;
  description: string;
};

type RecommendationFormValues = z.infer<typeof recommendationFormSchema>;

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      skills: '',
      interests: '',
    },
  });

  async function onSubmit(data: RecommendationFormValues) {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    try {
      const result = await getPersonalizedCourseRecommendations(data);
      setRecommendations(result.courses);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Wand2 className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Personalized Course Recommendations</h1>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
            Tell us about your skills and interests, and our AI will suggest the perfect courses for you.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-headline">Find Your Path</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Skills</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., HTML, CSS, problem-solving" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Interests</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., game development, AI, building robots" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Get Recommendations'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {error && <p className="text-center text-destructive">{error}</p>}

        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center my-8 font-headline">Recommended For You</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-headline">{rec.title}</CardTitle>
                    <CardDescription>{rec.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
