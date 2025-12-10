'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            <div className="flex flex-1 flex-col overflow-hidden">
                <Header
                    onMobileMenuClick={() => setIsMobileOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
