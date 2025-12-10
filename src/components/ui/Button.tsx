import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500/50',
            secondary: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 focus:ring-gray-500/50',
            destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50',
            ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
            outline: 'bg-transparent border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-500/50',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
            icon: 'h-9 w-9 overflow-hidden rounded-md',
        };

        return (
            <button
                className={cn(
                    'inline-flex items-center justify-center font-display font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md',
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button };
