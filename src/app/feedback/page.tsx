import { testimonials } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export default function FeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Student Success Stories</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Hear what our students have to say about their learning journey with us.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="flex flex-col h-full">
            <CardContent className="p-6 flex-grow">
              <Quote className="text-primary h-8 w-8 mb-4" />
              <p className="text-muted-foreground mb-4 flex-grow">"{testimonial.quote}"</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 p-6 bg-muted/50 mt-auto">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.course}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
