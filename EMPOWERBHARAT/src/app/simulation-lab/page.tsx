
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

// Placeholder data for simulations
const simulations = [
  { id: 'swe', title: 'Software Developer', description: 'Experience a day solving coding challenges, attending stand-ups, and fixing bugs.' },
  { id: 'civil', title: 'Civil Servant (Admin)', description: 'Simulate handling public queries, managing district tasks, and coordinating with departments.' },
  { id: 'electrician', title: 'Electrician', description: 'Tackle virtual electrical wiring tasks, troubleshoot faults, and learn safety protocols.' },
  { id: 'agritech', title: 'Tech-Enabled Farmer', description: 'Manage a virtual farm using apps, drones (simulated data), and smart irrigation.' },
];

export default function SimulationLabPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <PageHeader
        title="Career Simulation Lab"
        description="Experience a day-in-the-life of various careers virtually."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {simulations.map((sim) => (
          <Card key={sim.id}>
            <CardHeader>
              <CardTitle>{sim.title}</CardTitle>
              <CardDescription>{sim.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled>
                 <Play className="mr-2 h-4 w-4" /> Start Simulation (Coming Soon)
              </Button>
              {/* Add AI generation button later */}
               {/* <Button variant="outline" size="sm" className="w-full mt-2" disabled>
                 Generate AI Scenario (Coming Soon)
              </Button> */}
            </CardContent>
          </Card>
        ))}
      </div>
       <p className="text-center text-muted-foreground mt-8">
          More simulations and interactive AI scenarios are under development.
       </p>
    </div>
  );
}
