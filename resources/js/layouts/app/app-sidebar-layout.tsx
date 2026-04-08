import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { DynamicBackground } from '@/components/dynamic-background';
import Navbar from '@/components/ui/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <DynamicBackground />
            <Navbar />
            <div className="flex-1 flex flex-col items-center w-full min-h-screen relative z-10 pt-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={window.location.pathname}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ 
                            type: 'spring', 
                            damping: 25, 
                            stiffness: 200,
                            duration: 0.4 
                        }}
                        className="w-full h-full flex flex-col items-center"
                    >
                        <AppContent variant="header" className="w-full max-w-7xl px-4 py-8">
                            {children}
                        </AppContent>
                    </motion.div>
                </AnimatePresence>
            </div>
        </AppShell>
    );
}
