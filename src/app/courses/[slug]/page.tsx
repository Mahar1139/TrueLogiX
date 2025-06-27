import { courses } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, BarChart, UserCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingLink as Link } from '@/components/LoadingLink';

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-2">{course.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">{course.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{course.longDescription}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Syllabus</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {course.syllabus.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1 space-y-8">
          <Card className="overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              width={400}
              height={225}
              data-ai-hint={course.dataAiHint}
              className="w-full object-cover aspect-video"
            />
            <CardContent className="p-6">
                <Link href="/contact" className="w-full">
                    <Button size="lg" className="w-full">Enroll Now</Button>
                </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Duration:</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                <span className="font-medium">Level:</span>
                <span>{course.level}</span>
              </div>
               <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">Schedule:</span>
                <span>{course.schedule}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Instructor</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Image
                src={course.instructor.image}
                alt={course.instructor.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold">{course.instructor.name}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor.bio}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
