export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Web Design' | 'Coding' | 'Robotics';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  dataAiHint: string;
  syllabus: { title: string; content: string }[];
  instructor: { name: string; bio: string; image: string };
  schedule: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  dataAiHint: string;
};

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  quote: string;
  avatar: string;
};
