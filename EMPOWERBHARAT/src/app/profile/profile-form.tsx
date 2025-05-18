"use client";

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { profileSchema, type ProfileSchema } from '@/lib/schema';
import { useProfile } from '@/contexts/profile-context';

export function ProfileForm() {
  const { profile, setProfile } = useProfile();
  const { toast } = useToast();

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    // Initialize form values, ensuring controlled components always have a defined value.
    defaultValues: {
      name: profile?.name ?? '',
      age: profile?.age ?? undefined, // Use undefined for potentially empty number fields managed by Zod coerce/preprocess
      location: profile?.location ?? '',
      tenthMarks: profile?.tenthMarks ?? undefined,
      twelfthMarks: profile?.twelfthMarks ?? undefined,
      graduationStatus: profile?.graduationStatus ?? '',
      skills: profile?.skills?.join(', ') ?? '',
      languages: profile?.languages?.join(', ') ?? '',
      projects: profile?.projects?.join(', ') ?? '',
      // Map undefined/null profile category to '' for the Select placeholder
      category: profile?.category ?? '',
      // Initialize points and score
      points: profile?.points ?? 0,
      confidenceScore: profile?.confidenceScore ?? 0,
    },
  });

   // Watch for external profile changes and reset form if needed
   React.useEffect(() => {
    if (profile) {
        form.reset({
            name: profile.name ?? '',
            age: profile.age ?? undefined,
            location: profile.location ?? '',
            tenthMarks: profile.tenthMarks ?? undefined,
            twelfthMarks: profile.twelfthMarks ?? undefined,
            graduationStatus: profile.graduationStatus ?? '',
            skills: profile.skills?.join(', ') ?? '',
            languages: profile.languages?.join(', ') ?? '',
            projects: profile.projects?.join(', ') ?? '',
            category: profile.category ?? '',
             // Reset points and score as well
            points: profile.points ?? 0,
            confidenceScore: profile.confidenceScore ?? 0,
        });
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [profile]); // Removed form.reset from dependency array as it's stable


  function onSubmit(values: ProfileSchema) {
     // The schema transforms comma-separated strings into arrays and coerces numbers
    const processedValues = profileSchema.parse(values);

    setProfile(processedValues);
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved.',
    });
     console.log("Profile saved:", processedValues);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Increased gap-8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                       {/* Ensure value is never null/undefined */}
                      <Input placeholder="Enter your full name" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                       {/* Ensure value is never null/undefined */}
                      <Input type="number" placeholder="Enter your age" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (City/District)</FormLabel>
                    <FormControl>
                       {/* Ensure value is never null/undefined */}
                      <Input placeholder="e.g., Jaipur, Rajasthan" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="graduationStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Status</FormLabel>
                     {/* Ensure value is never null/undefined */}
                     <Select onValueChange={field.onChange} value={field.value ?? ''} >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your graduation status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Pursuing">Pursuing</SelectItem>
                          <SelectItem value="Not Pursuing">Not Pursuing</SelectItem>
                          <SelectItem value="Planning to Pursue">Planning to Pursue</SelectItem>
                          <SelectItem value="Dropped Out">Dropped Out</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="tenthMarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>10th Marks (%) (Optional)</FormLabel>
                    <FormControl>
                       {/* Ensure value is never null/undefined */}
                      <Input type="number" placeholder="Enter 10th percentage" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="twelfthMarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>12th Marks (%) (Optional)</FormLabel>
                    <FormControl>
                        {/* Ensure value is never null/undefined */}
                      <Input type="number" placeholder="Enter 12th percentage" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category (Optional)</FormLabel>
                     {/* Ensure value prop is passed for controlled Select and is never null/undefined */}
                     <Select onValueChange={field.onChange} value={field.value ?? ''} >
                        <FormControl>
                          <SelectTrigger>
                            {/* Display placeholder only if value is truly empty/falsy */}
                            <SelectValue placeholder="Select your category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="General">General</SelectItem>
                          <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                          <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                          <SelectItem value="OBC">OBC (Other Backward Class)</SelectItem>
                          <SelectItem value="EWS">EWS (Economically Weaker Section)</SelectItem>
                          {/* Use a non-empty value for the "Prefer not to say" option */}
                          <SelectItem value="PreferNotToSay">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormDescription>
                      Relevant for certain government schemes and reservations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

             <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your skills, separated by commas (e.g., Python, Communication, MS Excel)"
                        {...field}
                        // Handle potential array value from schema transform if needed on re-render
                        // Ensure value is never null/undefined
                        value={Array.isArray(field.value) ? field.value.join(', ') : field.value ?? ''}
                         onChange={(e) => field.onChange(e.target.value)} // Ensure onChange passes string
                      />
                    </FormControl>
                     <FormDescription>
                       List technical and soft skills.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

             <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages Spoken</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter languages you speak, separated by commas (e.g., Hindi, English, Marathi)"
                        {...field}
                         value={Array.isArray(field.value) ? field.value.join(', ') : field.value ?? ''}
                         onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Projects (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe any projects you've worked on, separated by commas"
                        {...field}
                         value={Array.isArray(field.value) ? field.value.join(', ') : field.value ?? ''}
                         onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                     <FormDescription>
                       Briefly mention personal, academic, or work projects.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


            <Button type="submit">Save Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
