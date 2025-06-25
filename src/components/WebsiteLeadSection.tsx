'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { websiteLeadSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type WebsiteLeadFormValues = z.infer<typeof websiteLeadSchema>;

export function WebsiteLeadSection() {
  const { toast } = useToast();
  const form = useForm<WebsiteLeadFormValues>({
    resolver: zodResolver(websiteLeadSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      projectDetails: '',
    },
  });

  function onSubmit(data: WebsiteLeadFormValues) {
    console.log(data);
    toast({
      title: 'Request Sent!',
      description: "Thanks for your interest. We'll be in touch soon to discuss your project.",
    });
    form.reset();
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-headline">Make Your Website</div>
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                    Have an Idea? Let's Build It Together.
                 </h2>
                 <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    From simple landing pages to complex web applications, our team has the expertise to bring your vision to life. Fill out the form to get a project quote.
                 </p>
            </div>
             <Card>
              <CardHeader>
                <CardTitle className="font-headline">Request a Project Quote</CardTitle>
                <CardDescription>Tell us about your project and we'll get back to you.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 123 456 7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your website needs..." className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full">
                      Get Quote
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
