
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Sparkles,
  Users,
  ScrollText,
  Lightbulb,
  FileText, // Resume
  FlaskConical, // Simulation Lab
  Repeat, // SkillXchange
  DollarSign, // Learn & Earn
  Map, // DreamMap
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const menuItems = [
  // { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'My Profile', icon: User },
  { href: '/career-coach', label: 'Career Coach', icon: Lightbulb },
  { href: '/schemes', label: 'Govt. Schemes', icon: ScrollText },
  { href: '/jobs', label: 'Job Board', icon: Briefcase },
  { href: '/aamp', label: 'AI Mentor Panel', icon: Sparkles },
  { href: '/simulation-lab', label: 'Simulation Lab', icon: FlaskConical },
  { href: '/resume-builder', label: 'Resume Builder', icon: FileText },
  { href: '/dream-map', label: 'DreamMap', icon: Map },
  { href: '/skill-exchange', label: 'SkillXchange', icon: Repeat },
  { href: '/learn-earn', label: 'Learn & Earn', icon: DollarSign },
  // { href: '/community', label: 'Community', icon: Users },
  // { href: '/research', label: 'Research Support', icon: GraduationCap },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader className="items-center justify-between p-2">
         <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-primary overflow-hidden whitespace-nowrap group-data-[collapsible=icon]:hidden">
            <GraduationCap className="h-6 w-6 text-accent" />
            EmpowerBharat
         </Link>
         <div className="flex items-center gap-1">
             {/* Add any header actions here if needed */}
             <SidebarTrigger className="md:hidden"/>
         </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                variant="default"
                size="default"
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* <SidebarFooter className="mt-auto">
         <Separator />
         <div className="p-2 flex flex-col gap-2">
              Placeholder for footer items if needed
         </div>
      </SidebarFooter> */}
    </Sidebar>
  );
}

