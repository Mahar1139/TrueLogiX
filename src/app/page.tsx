import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { courses, testimonials } from '@/lib/data';
import { ArrowRight, CheckCircle, Quote } from 'lucide-react';
import Image from 'next/image';
import { LoadingLink as Link } from '@/components/LoadingLink';
import { WebsiteLeadSection } from '@/components/WebsiteLeadSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Unlock Your Potential in Tech
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore our expert-led courses in web design, coding, and robotics. Start your journey with TrueLogiX today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/courses">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Explore Courses
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="secondary">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="/truelogix.jpg"
                width="600"
                height="400"
                alt="TrueLogiX Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 font-headline">
              Featured Courses
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <Card key={course.id} className="overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <Link href={`/courses/${course.slug}`}>
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
                    <CardContent className="p-6">
                      <CardTitle className="font-headline text-xl mb-2">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/courses">
                <Button size="lg" variant="outline">
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <WebsiteLeadSection />

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 font-headline">
              What Our Students Say
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id} className="flex flex-col">
                  <CardContent className="p-6 flex-grow">
                    <Quote className="text-primary h-8 w-8 mb-4" />
                    <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4 p-6 bg-muted/50">
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
            <div className="text-center mt-12">
              <Link href="/feedback">
                <Button size="lg" variant="outline">
                  More Testimonials
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Personalized Recommendations CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Not Sure Where to Start?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Let our AI-powered tool recommend the perfect course for you based on your skills and interests.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/recommendations">
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Recommendations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
