'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeBuilderWizard } from '@/components/builder/ResumeBuilderWizard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { fetchWithTimeout } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EditResumePageProps {
    params: Promise<{ id: string }>;
}

export default function EditResumePage({ params }: EditResumePageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [resume, setResume] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchResume() {
            try {
                const res = await fetchWithTimeout(`/api/resumes/${id}`);
                if (res.ok) {
                    const data = await res.json();

                    // Parse content if it's a string, otherwise use as is
                    let content = data.content;
                    if (typeof content === 'string') {
                        try {
                            content = JSON.parse(content);
                        } catch (e) {
                            console.error('Error parsing resume content:', e);
                            content = {};
                        }
                    }

                    // Ensure we have a valid object structure for the wizard
                    setResume({
                        ...data,
                        content: content || {}
                    });
                } else {
                    setError('Failed to fetch resume');
                }
            } catch (error) {
                console.error('Failed to fetch resume:', error);
                setError('Failed to load resume');
            } finally {
                setIsLoading(false);
            }
        }

        if (id) {
            fetchResume();
        }
    }, [id]);

    const handleSave = async (data: any, status: string = 'draft') => {
        try {
            const res = await fetchWithTimeout(`/api/resumes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: data,
                    // If status is passed as completed (final step), update it
                    ...(status === 'completed' && { status: 'completed' })
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to update resume');
            }

            // If it was a 'completed' save (final step), redirect to preview
            if (status === 'completed') {
                router.push(`/resume/${id}/preview`);
            }
        } catch (error) {
            console.error('Error updating resume:', error);
            // Optionally set error state here if you want to show it in the UI
            // But usually autosave fails silently or shows a toast
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-screen">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            </DashboardLayout>
        );
    }

    if (error || !resume) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-screen text-red-600">
                    {error || 'Resume not found'}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
                {/* 
                  ResumeBuilderWizard expects initialData to be the *content* object structure 
                  (personal, experience, etc.) which we parsed into resume.content
                */}
                <ResumeBuilderWizard
                    initialData={resume.content}
                    onSave={handleSave}
                />
            </div>
        </DashboardLayout>
    );
}
