'use client';

import { useState } from 'react';
import { courses } from '@/lib/data';
import type { Course } from '@/lib/definitions';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories = ['All', 'Web Design', 'Coding', 'Robotics', 'Cyber Security'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');

  const filteredCourses = courses.filter((course: Course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'All' || course.category === category) &&
      (level === 'All' || course.level === level)
    );
  });

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Our Courses</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Find the perfect course to kickstart or advance your career in tech.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:flex-1"
        />
        <div className="flex gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Skill Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((lvl) => (
                <SelectItem key={lvl} value={lvl}>
                  {lvl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center py-16">
            <h3 className="text-2xl font-semibold">No Courses Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
