"use client";

import type { SuggestSchemesOutput } from '@/ai/flows/government-scheme-suggestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollText, Award, BookOpen } from 'lucide-react';

interface SchemesResultsProps {
  data: SuggestSchemesOutput;
}

export function SchemesResults({ data }: SchemesResultsProps) {
  return (
    <div className="space-y-6 mt-6">
      {/* Schemes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="text-primary" />
            Relevant Government Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.schemes && data.schemes.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {data.schemes.map((scheme, index) => (
                <AccordionItem value={`scheme-${index}`} key={`scheme-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    {scheme.name}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm p-4 bg-secondary/30 rounded-b-md"> {/* Added padding and subtle bg */}
                    <p><strong className="font-medium text-foreground/90">Description:</strong> {scheme.description}</p>
                    <p><strong className="font-medium text-foreground/90">Eligibility:</strong> {scheme.eligibility}</p>
                    <p><strong className="font-medium text-foreground/90">Benefits:</strong> {scheme.benefits}</p>
                    <p><strong className="font-medium text-foreground/90">Application Process:</strong> {scheme.applicationProcess}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground">No relevant government schemes found based on your profile.</p>
          )}
        </CardContent>
      </Card>

      {/* Scholarships Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="text-primary" />
            Relevant Scholarships
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.scholarships && data.scholarships.length > 0 ? (
             <Accordion type="single" collapsible className="w-full">
              {data.scholarships.map((scholarship, index) => (
                <AccordionItem value={`scholarship-${index}`} key={`scholarship-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                      {scholarship.name}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm p-4 bg-secondary/30 rounded-b-md"> {/* Added padding and subtle bg */}
                    <p><strong className="font-medium text-foreground/90">Description:</strong> {scholarship.description}</p>
                    <p><strong className="font-medium text-foreground/90">Eligibility:</strong> {scholarship.eligibility}</p>
                    <p><strong className="font-medium text-foreground/90">Benefits:</strong> {scholarship.benefits}</p>
                    <p><strong className="font-medium text-foreground/90">Application Process:</strong> {scholarship.applicationProcess}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground">No relevant scholarships found based on your profile.</p>
          )}
        </CardContent>
      </Card>

      {/* Courses Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="text-primary" />
            Relevant Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.courses && data.courses.length > 0 ? (
             <Accordion type="single" collapsible className="w-full">
              {data.courses.map((course, index) => (
                 <AccordionItem value={`course-${index}`} key={`course-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                      {course.name} - {course.institution}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm p-4 bg-secondary/30 rounded-b-md"> {/* Added padding and subtle bg */}
                    <p><strong className="font-medium text-foreground/90">Description:</strong> {course.description}</p>
                    <p><strong className="font-medium text-foreground/90">Duration:</strong> {course.duration}</p>
                    <p><strong className="font-medium text-foreground/90">Fees:</strong> {course.fees}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground">No relevant courses found based on your profile.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
