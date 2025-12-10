'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    FileText,
    Settings,
    User,
    X,
    Briefcase
} from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

interface SidebarProps {
    isMobileOpen: boolean;
    setIsMobileOpen: (open: boolean) => void;
}

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Resumes', href: '/dashboard/resumes', icon: FileText },
    { name: 'Users', href: '/dashboard/users', icon: User },
];

export function Sidebar({
    isMobileOpen,
    setIsMobileOpen,
}: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 text-slate-100 transition-all duration-300 ease-in-out',
                    // Mobile: slide in/out
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full',
                    // Desktop: static, fixed width (collapsed)
                    'md:translate-x-0 md:static md:w-20'
                )}
            >
                {/* Sidebar Header */}
                <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
                    <div className="flex w-full justify-center md:hidden">
                        <span className="text-xl font-bold">ATS Resume</span>
                    </div>
                    {/* Desktop Logo/Icon */}
                    <div className="hidden md:flex w-full justify-center">
                        <Briefcase className="h-8 w-8 text-blue-500" />
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden p-1 rounded-md hover:bg-slate-800 text-slate-300 absolute right-4"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2 p-4 overflow-y-auto md:overflow-visible flex flex-col items-center">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;

                        const LinkContent = (
                            <Link
                                href={item.href}
                                className={cn(
                                    'flex items-center justify-center rounded-md p-3 text-sm font-medium transition-colors w-full',
                                    isActive
                                        ? 'bg-slate-800 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                )}
                            >
                                <item.icon
                                    className="h-6 w-6 flex-shrink-0"
                                    aria-hidden="true"
                                />
                                {/* Label for mobile only */}
                                <span className="ml-3 md:hidden">{item.name}</span>
                            </Link>
                        );

                        return (
                            <div key={item.name} className="w-full flex justify-center">
                                {/* Desktop Tooltip */}
                                <div className="hidden md:block">
                                    <Tooltip content={item.name} side="right">
                                        {LinkContent}
                                    </Tooltip>
                                </div>
                                {/* Mobile No Tooltip */}
                                <div className="md:hidden w-full">
                                    {LinkContent}
                                </div>
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
