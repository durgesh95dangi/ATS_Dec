import React, { ReactNode } from 'react';

interface TooltipProps {
    content: string;
    children: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ content, children, side = 'right' }: TooltipProps) {
    return (
        <div className="group relative flex items-center">
            {children}
            {/* Tooltip Container */}
            <div className="absolute left-full ml-3 px-2 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-x-[-10px] group-hover:translate-x-0 z-[100] whitespace-nowrap border border-slate-700">
                {content}
                {/* Arrow */}
                <div className="absolute left-0 top-1/2 -ml-[5px] -mt-[5px] h-2.5 w-2.5 -rotate-45 border-t border-l border-slate-700 bg-slate-900 z-[-1]" />
            </div>
        </div>
    );
}
