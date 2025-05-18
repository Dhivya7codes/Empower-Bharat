
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  // Optional: confirmPassword - can be added later
  // confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
});
// Optional: .refine for password confirmation
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const { toast } = useToast();

  const currentSchema = activeTab === "login" ? loginSchema : signupSchema;
  type CurrentFormValues = z.infer<typeof currentSchema>;

  const form = useForm<CurrentFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: "",
      password: "",
      // ...(activeTab === "signup" && { confirmPassword: "" }), // if confirmPassword field exists
    },
  });

  useEffect(() => {
    // Reset form when tab changes to ensure correct schema and default values are applied
    form.reset({
      email: "",
      password: "",
      // ...(activeTab === "signup" && { confirmPassword: "" }),
    });
  }, [activeTab, form]);

  async function onSubmit(values: CurrentFormValues) {
    console.log(`Form submitted for ${activeTab}:`, values);
    // Placeholder for actual authentication logic
    toast({
      title: `${activeTab === "login" ? "Sign In" : "Sign Up"} Attempt`,
      description: `Email: ${values.email}. Check console for details.`, // Basic feedback
    });
    // form.reset(); // Optionally reset form after submission
  }

  return (
    <Tabs defaultValue="login" className="w-full" onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
                <LogIn /> Sign In
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your EmpowerBharat account.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-6">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <Button variant="link" size="sm" type="button" className="text-xs text-muted-foreground">
                  Forgot Password?
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>

      <TabsContent value="signup">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
                <UserPlus /> Create Account
            </CardTitle>
            <CardDescription>
              Join EmpowerBharat by creating a new account.
            </CardDescription>
          </CardHeader>
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Choose a strong password (min. 6 characters)" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Optional: Confirm Password for Sign Up - Add field to schema and defaultValues if used
                {activeTab === "signup" && (
                  <FormField
                    control={form.control}
                    name="confirmPassword" // Ensure this name is in SignupFormValues if used
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input placeholder="••••••••" {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                */}
              </CardContent>
              <CardFooter className="pt-6">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
