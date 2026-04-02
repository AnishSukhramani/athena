'use client';

/**
 * Layout shell: primary shadcn Sidebar (Opportunities | Output) + top header with SidebarTrigger.
 * Output: secondary channel nav — desktop fixed aside; mobile horizontal scroll strip (md:hidden).
 * Primary sidebar collapses to icons and uses Sheet on small viewports (shadcn Sidebar defaults).
 * Cmd/Ctrl+B toggles sidebar (shadcn). Nav links use aria-current="page" when active.
 */

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Send } from 'lucide-react';

import { OUTPUT_CHANNELS } from '@/lib/output-channels';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

function opportunitiesActive(pathname: string) {
  return pathname === '/' || pathname.startsWith('/opportunity');
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const onOpportunities = opportunitiesActive(pathname);
  const onOutput = pathname.startsWith('/output');

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader className="border-b border-sidebar-border">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-sidebar-foreground outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 group-data-[collapsible=icon]:justify-center"
          >
            <Image
              src="/sova-logo.png"
              alt=""
              width={24}
              height={24}
              className="size-6 shrink-0 object-contain"
              priority
            />
            <span className="truncate text-sm font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
              Sova
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={onOpportunities}
                    tooltip="Opportunities"
                    render={
                      <Link href="/" aria-current={onOpportunities ? 'page' : undefined}>
                        <Briefcase />
                        <span>Opportunities</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={onOutput}
                    tooltip="Output"
                    render={
                      <Link href="/output" aria-current={onOutput ? 'page' : undefined}>
                        <Send />
                        <span>Output</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>

        <div className="flex min-h-[calc(100svh-3.5rem)] flex-1 flex-col md:flex-row">
          {onOutput ? (
            <>
              {/* Mobile: horizontal channel strip */}
              <nav
                className="flex shrink-0 gap-1 overflow-x-auto border-b bg-sidebar px-2 py-2 text-sidebar-foreground md:hidden"
                aria-label="Output channels"
              >
                {OUTPUT_CHANNELS.map((ch) => {
                  const active = pathname === ch.path;
                  return (
                    <Link
                      key={ch.id}
                      href={ch.path}
                      className={cn(
                        'shrink-0 rounded-md px-3 py-2 text-sm whitespace-nowrap ring-sidebar-ring outline-none transition-colors focus-visible:ring-2',
                        active
                          ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                          : 'hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground'
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {ch.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop: secondary sidebar */}
              <aside
                className="hidden w-52 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex"
                aria-label="Output channels"
              >
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70">
                    Channels
                  </div>
                  <ul className="flex w-full min-w-0 flex-col gap-0">
                    {OUTPUT_CHANNELS.map((ch) => {
                      const active = pathname === ch.path;
                      return (
                        <li key={ch.id} className="group/menu-item relative">
                          <Link
                            href={ch.path}
                            className={cn(
                              'flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-none transition-colors focus-visible:ring-2',
                              active
                                ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                                : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                            )}
                            aria-current={active ? 'page' : undefined}
                          >
                            <span className="truncate">{ch.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
            </>
          ) : null}

          <div className="app-main min-h-0 flex-1 overflow-auto">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
