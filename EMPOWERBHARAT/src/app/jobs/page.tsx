
"use client"; // Need client component for context and state

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/common/page-header';
import { JobCard } from './job-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { useProfile } from '@/contexts/profile-context'; // Import profile context
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // For location info

// Placeholder data - replace with actual data fetching later
const allPlaceholderJobs = [
  {
    id: 'pune-swe',
    title: 'Software Engineer Intern',
    company: 'Tech Solutions Pvt. Ltd.',
    location: 'Pune, Maharashtra',
    description: 'Assist senior engineers in developing and testing new software features. Basic knowledge of Python or Java required.',
    type: 'Internship',
  },
  {
    id: 'jaipur-de',
    title: 'Data Entry Operator (Part-time)',
    company: 'Local Business Hub',
    location: 'Jaipur, Rajasthan',
    description: 'Accurately enter data from various sources into our database system. Good typing speed and attention to detail needed.',
     type: 'Part-time',
  },
   {
    id: 'haryana-sales',
    title: 'Field Sales Executive',
    company: 'AgriConnect',
    location: 'Rural Hub, Haryana',
    description: 'Visit local farmers and promote our agricultural products. Good communication skills in Hindi required.',
     type: 'Full-time',
  },
   {
    id: 'gujarat-mech',
    title: 'Workshop Assistant (Temporary)',
    company: 'Mechanic Services',
    location: 'Near Industrial Area, Gujarat',
    description: 'Assist mechanics with basic tasks, tool handling, and workshop maintenance. Temporary position for 3 months.',
     type: 'Temporary',
  },
    {
    id: 'remote-csr',
    title: 'Customer Support Representative',
    company: 'BPO India',
    location: 'Remote',
    description: 'Handle customer inquiries via phone and email. Requires good communication skills and basic computer knowledge.',
     type: 'Full-time',
  },
   {
    id: 'pune-da',
    title: 'Data Analyst',
    company: 'FinTech Innovations',
    location: 'Pune, Maharashtra',
    description: 'Analyze financial data, create reports, and identify trends. Experience with SQL and Excel preferred.',
    type: 'Full-time',
  },
    {
    id: 'jaipur-gd',
    title: 'Graphic Designer',
    company: 'Creative Studios',
    location: 'Jaipur, Rajasthan',
    description: 'Design marketing materials, social media posts, and website graphics using Adobe Creative Suite.',
    type: 'Full-time',
  },
];


export default function JobBoardPage() {
  const { profile } = useProfile();
  const [searchTerm, setSearchTerm] = useState('');
  // Add state for pagination or number of items to show
  const [itemsToShow, setItemsToShow] = useState(6);

  // Filter jobs based on search term and potentially location
  const filteredJobs = useMemo(() => {
      let jobs = allPlaceholderJobs;

      // Basic search filtering (title, company, description)
      if (searchTerm) {
          jobs = jobs.filter(job =>
              job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
              job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              job.location.toLowerCase().includes(searchTerm.toLowerCase())
          );
      }

      // Basic Location Prioritization (example: show local jobs first)
       if (profile?.location) {
           const userLocation = profile.location.toLowerCase();
           jobs.sort((a, b) => {
               const aIsLocal = a.location.toLowerCase().includes(userLocation);
               const bIsLocal = b.location.toLowerCase().includes(userLocation);
               if (aIsLocal && !bIsLocal) return -1; // a comes first
               if (!aIsLocal && bIsLocal) return 1;  // b comes first
               return 0; // maintain original order otherwise
           });
       }


      return jobs;
  }, [searchTerm, profile?.location]); // Re-filter when search or profile location changes

   const visibleJobs = filteredJobs.slice(0, itemsToShow);

   const handleLoadMore = () => {
      setItemsToShow(prev => prev + 6); // Load 6 more jobs
   };


  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <PageHeader
        title="Job Board & Opportunity Radar"
        description="Find jobs, internships, and local opportunities. We prioritize based on your location."
      />

       {/* Location Info */}
       {profile?.location && (
            <Alert variant="default" className="mb-6 bg-secondary border-primary/20">
                <MapPin className="h-4 w-4 text-primary" />
                <AlertTitle className="font-semibold">Location Aware</AlertTitle>
                <AlertDescription>
                    Showing opportunities relevant to **{profile.location}**. Use search for other locations.
                </AlertDescription>
            </Alert>
       )}

      {/* Search/Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Input
             placeholder="Search by keyword, company, or location..."
             className="flex-1"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => { /* Trigger search explicitly if needed */ }}>
              <Search className="mr-2 h-4 w-4" /> Search
          </Button>
          {/* Add more filters later (Type, Skill, etc.) */}
      </div>


      {visibleJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              description={job.description}
              type={job.type as any}
            />
          ))}
        </div>
       ) : (
          <p className="text-center text-muted-foreground mt-10">
              No jobs found matching your criteria. Try broadening your search.
          </p>
       )}


       {/* Pagination or Load More */}
       {filteredJobs.length > itemsToShow && (
           <div className="mt-8 text-center">
               <Button variant="outline" onClick={handleLoadMore}>Load More Jobs</Button>
           </div>
       )}
    </div>
  );
}
