import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/lib/definitions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link href={`/courses/${course.slug}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <Image
            src={course.image}
            alt={course.title}
            width={400}
            height={225}
            data-ai-hint={course.dataAiHint}
            className="aspect-video w-full object-cover"
          />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{course.category}</Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          <CardTitle className="font-headline text-xl mb-2">{course.title}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="link" className="p-0 h-auto text-primary">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
