
import { AuthForm } from '@/components/auth/auth-form';

export default function AuthPage() {
  return (
    // This div will be a child of <main> in RootLayout, which is inside SidebarInset
    // SidebarInset is flex-1, so this AuthPage should fill the available height.
    // Centering is done using flex.
    <div className="flex flex-grow flex-col items-center justify-center p-4">
      <div className="w-full max-w-md"> {/* Max width for the form card */}
        <AuthForm />
      </div>
    </div>
  );
}
