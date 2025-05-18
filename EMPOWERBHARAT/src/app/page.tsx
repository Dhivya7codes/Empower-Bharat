
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  // Welcome page content instead of redirecting
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <PageHeader
        title="Welcome to EmpowerBharat"
        description="Your AI-Powered partner for career growth and skill development."
      />

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Watch this short video to learn more about EmpowerBharat.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Video Player */}
            <div className="aspect-video w-full max-w-3xl mx-auto bg-muted rounded-lg overflow-hidden shadow-md">
              {/*
                Replace the placeholder below with your actual video element.
                You'll need to provide the video source (src).
                Example: <video src="/path/to/your/video.mp4" controls width="100%"></video>
              */}
              <video
                controls
                width="100%"
                className="w-full h-full object-cover"
                // Add poster attribute for thumbnail before loading
                // poster="/path/to/your/poster-image.jpg"
                // Add muted and playsInline for better autoplay experience if needed
                // muted
                // playsInline
              >
                {/* Provide video sources here */}
                 {/*
                 <source src="/videos/intro.mp4" type="video/mp4" />
                 <source src="/videos/intro.webm" type="video/webm" />
                 */}
                Your browser does not support the video tag.
                {/* Add fallback content or links here */}
              </video>
               <p className="text-center text-sm text-muted-foreground p-4">
                 Video player placeholder. Replace with your video source.
               </p>
            </div>
            <p className="mt-6 text-center text-muted-foreground">
              Explore the sidebar to access features like the Career Coach, Job Board, and more. Start by completing your <a href="/profile" className="text-primary underline">Profile</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
