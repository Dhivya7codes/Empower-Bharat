
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Map, Sparkles, CheckCircle, Target } from 'lucide-react';
import { useProfile } from '@/contexts/profile-context';
import { ProfileCheckWrapper } from '@/components/common/profile-check-wrapper';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { ErrorMessage } from '@/components/common/error-message';
// import { generateDreamMap, type GenerateDreamMapOutput } from '@/ai/flows/dream-map-generator'; // To be created

interface RoadmapStep {
    step: number;
    title: string;
    description: string;
    duration: string; // e.g., "3 Months", "1 Year"
    resources?: string[]; // Links or names of resources
}

export default function DreamMapPage() {
    const { profile, isProfileComplete } = useProfile();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dreamGoal, setDreamGoal] = useState('');
    const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);

    const handleGenerateMap = async () => {
        if (!profile || !dreamGoal) {
            setError("Please complete your profile and enter a dream goal.");
            return;
        }
        setLoading(true);
        setError(null);
        setRoadmap([]);

        try {
            // const mapInput = { profile, dreamGoal };
            // const result = await generateDreamMap(mapInput); // Call AI flow
            // setRoadmap(result.steps);

             // Placeholder generation:
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI call
             const placeholderSteps: RoadmapStep[] = [
                { step: 1, title: "Foundation Building", description: `Strengthen basic skills relevant to ${dreamGoal}. Focus on [Skill A] and [Skill B]. Complete online course X.`, duration: "3 Months", resources: ["Coursera Course X", "YouTube Channel Y"] },
                { step: 2, title: "Intermediate Skills", description: `Learn ${profile?.skills?.includes('Python') ? 'Advanced Python' : 'Python from Scratch'}. Work on a small personal project related to ${dreamGoal}.`, duration: "6 Months", resources: ["Project Guide Z"] },
                { step: 3, title: "Gain Experience", description: `Look for internships or entry-level roles. Network with people in the field of ${dreamGoal}. Consider relevant certifications.`, duration: "1 Year", resources: ["LinkedIn", "Naukri.com"] },
                { step: 4, title: "Specialize & Advance", description: `Deepen expertise in a niche area of ${dreamGoal}. Take on more complex projects or responsibilities.`, duration: "Ongoing" },
            ];
            setRoadmap(placeholderSteps);

        } catch (err) {
            console.error("Error generating DreamMap:", err);
            setError(err instanceof Error ? err.message : "Failed to generate roadmap.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 md:px-0">
            <PageHeader
                title="DreamMap"
                description="Visualize your career journey towards your ultimate goal."
            />

            <ProfileCheckWrapper featureName="DreamMap">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Target className="text-primary" /> Define Your Dream Goal</CardTitle>
                        <CardDescription>What career or position are you aiming for? (e.g., IAS Officer, Software Engineer at Google, Successful Local Entrepreneur)</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4">
                        <Input
                            placeholder="Enter your dream career goal..."
                            value={dreamGoal}
                            onChange={(e) => setDreamGoal(e.target.value)}
                            className="flex-1"
                            disabled={loading}
                        />
                        <Button onClick={handleGenerateMap} disabled={loading || !isProfileComplete || !dreamGoal}>
                            {loading ? <LoadingSpinner size={16} className="mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {loading ? 'Generating Map...' : 'Generate My Roadmap'}
                        </Button>
                    </CardContent>
                     {error && <CardContent><ErrorMessage message={error} title="Generation Failed" /></CardContent>}
                </Card>

                {roadmap.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Roadmap to: {dreamGoal}</CardTitle>
                             <CardDescription>A step-by-step guide based on your profile and goal. This is adaptable.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="relative pl-6">
                                {/* Vertical line */}
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border ml-[7px]"></div>

                                {roadmap.map((item, index) => (
                                    <div key={item.step} className="mb-8 relative">
                                        {/* Dot on the line */}
                                        <div className={`absolute left-0 top-1 w-4 h-4 rounded-full ${index === 0 ? 'bg-accent' : 'bg-primary'} border-2 border-background`}></div>

                                        <h3 className="font-semibold text-lg mb-1">{`Step ${item.step}: ${item.title}`}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">Est. Duration: {item.duration}</p>
                                        <p className="text-sm mb-2">{item.description}</p>
                                        {item.resources && item.resources.length > 0 && (
                                             <div>
                                                <h4 className="text-xs font-semibold text-muted-foreground mb-1">Resources:</h4>
                                                <ul className="list-disc pl-5 text-xs space-y-1">
                                                    {item.resources.map((res, i) => <li key={i}>{res}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                        {/* Optional: Add a completion checkbox/button */}
                                         {/* <Button variant="ghost" size="sm" className="mt-2 text-green-600 hover:bg-green-100">
                                             <CheckCircle className="mr-1 h-3 w-3"/> Mark as Complete
                                         </Button> */}
                                    </div>
                                ))}
                             </div>
                        </CardContent>
                    </Card>
                )}
            </ProfileCheckWrapper>
        </div>
    );
}
