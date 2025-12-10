'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StartingPoint } from '@/components/onboarding/StartingPoint';
import { ResumeBuilderWizard } from '@/components/builder/ResumeBuilderWizard';
import { FormError } from '@/components/ui/FormError';
import { fetchWithTimeout } from '@/lib/utils';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

type Step = 'start' | 'wizard';

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>('start');
    const [resumeId, setResumeId] = useState<string | null>(null);
    const [error, setError] = useState<string | undefined>('');
    const [profileData, setProfileData] = useState<any>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch('/api/users/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfileData(data);
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        }
        fetchProfile();
    }, []);

    const handleStartSelect = (mode: 'scratch' | 'import') => {
        if (mode === 'scratch') {
            setStep('wizard');
        } else {
            alert('Import feature coming soon!');
        }
    };

    // New autosave handler for the 5-step builder
    const handleAutoSave = async (data: any, status: string = 'draft') => {
        // Only autosave if we have a resumeId (created on first save or properly handled)

        if (!resumeId) {
            console.log('handleAutoSave: No resumeId, creating new resume...');
            try {
                // Create minimal resume entry
                const res = await fetchWithTimeout('/api/resumes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'Untitled Resume', role: 'General' }), // Default values
                });

                console.log('handleAutoSave: Create response status:', res.status);

                if (res.ok) {
                    const newResume = await res.json();
                    console.log('handleAutoSave: Created resume:', newResume);
                    setResumeId(newResume.id);

                    // If we just created it, we might need to update it immediately with the content if step data was passed
                    // But usually the first step doesn't force a save until Next is clicked.
                } else {
                    const err = await res.text();
                    console.error('handleAutoSave: Create failed:', err);
                }
            } catch (err) {
                console.error('Error creating initial resume:', err);
            }
            return;
        }

        try {
            await fetchWithTimeout(`/api/resumes/${resumeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: data, status: status }),
            });
        } catch (error) {
            console.error('Autosave error:', error);
        }
    };

    const getInitialData = () => {
        if (!profileData) return undefined;
        // Split name if possible
        const nameParts = (profileData.name || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        return {
            personal: {
                firstName: firstName,
                lastName: lastName,
                email: profileData.email || '',
                title: '',
            },
            summary: profileData.headline || '',
            skills: { core: [], tools: [], soft: [] },
            experience: [],
            education: [],
            certifications: [],
            projects: [],
            languages: []
        };
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto mb-6">
                    <FormError message={error} />
                </div>
                {step === 'start' && <StartingPoint onSelect={handleStartSelect} />}
                {step === 'wizard' && (
                    <ResumeBuilderWizard
                        initialData={getInitialData()}
                        onSave={handleAutoSave}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}

