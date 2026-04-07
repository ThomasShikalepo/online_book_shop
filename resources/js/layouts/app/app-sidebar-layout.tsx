import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { DynamicBackground } from '@/components/dynamic-background';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <DynamicBackground />
            <div className="flex-1 flex flex-col items-center w-full min-h-screen">
                <AppContent variant="header" className="w-full max-w-7xl px-4 py-8">
                    {children}
                </AppContent>
            </div>
        </AppShell>
    );
}
