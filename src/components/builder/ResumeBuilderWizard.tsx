'use client';

import { useState } from 'react';
import { Step1Personal } from './Step1Personal';
import { Step2SummarySkills } from './Step2SummarySkills';
import { Step3Experience } from './Step3Experience';
import { Step4Education } from './Step4Education';
import { Step5Finalize } from './Step5Finalize';
import { LivePreview } from './LivePreview';
import { DownloadButton } from '../resume/DownloadButton';

interface ResumeBuilderWizardProps {
    initialData?: any;
    onSave: (data: any, status?: string) => Promise<void>;
}

export function ResumeBuilderWizard({ initialData, onSave }: ResumeBuilderWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [resumeData, setResumeData] = useState(initialData || {
        personal: {
            firstName: '',
            lastName: '',
            title: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            address: '',
            postCode: ''
        },
        summary: '',
        skills: { core: [], tools: [], soft: [] },
        experience: [],
        education: [],
        certifications: [],
        projects: [],
        languages: [],
        settings: { embedFonts: true, exportFormat: 'pdf' }
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleNext = async (stepData: any) => {
        console.log('handleNext: Started with data:', stepData);
        const updatedData = { ...resumeData, ...stepData };
        setResumeData(updatedData);

        // Autosave
        setIsSaving(true);
        console.log('handleNext: Calling onSave...');
        try {
            await onSave(updatedData); // Default status is draft
            console.log('handleNext: onSave completed');
        } catch (error) {
            console.error("Autosave failed", error);
            // We proceed anyway
        } finally {
            setIsSaving(false);
        }

        console.log('handleNext: Checking step increment. Current:', currentStep);
        if (currentStep < 5) {
            console.log('handleNext: Incrementing step to:', currentStep + 1);
            setCurrentStep((prev) => prev + 1);
        } else {
            console.log('handleNext: End of wizard');
            // Final save with completed status
            try {
                await onSave(updatedData, 'completed');
            } catch (e) {
                console.error("Final save failed", e);
            }
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="w-full max-w-[1600px] mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Form Area */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6">
                {/* Progress Bar */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((step) => (
                            <div
                                key={step}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === currentStep
                                    ? 'bg-blue-600 text-white'
                                    : step < currentStep
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                    <div className="text-sm text-gray-500">
                        {isSaving ? 'Saving...' : 'Saved'}
                    </div>
                </div>

                {/* Steps */}
                {currentStep === 1 && (
                    <Step1Personal
                        initialData={resumeData.personal}
                        onNext={(data) => handleNext({ personal: data })}
                    />
                )}

                {currentStep === 2 && (
                    <Step2SummarySkills
                        initialData={{ summary: resumeData.summary, skills: resumeData.skills }}
                        onNext={(data) => handleNext({ summary: data.summary, skills: data.skills })}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 3 && (
                    <Step3Experience
                        initialData={resumeData.experience}
                        onNext={(data) => handleNext({ experience: data.experience })}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 4 && (
                    <Step4Education
                        initialData={{ education: resumeData.education, certifications: resumeData.certifications }}
                        onNext={(data) => handleNext({ education: data.education, certifications: data.certifications })}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 5 && (
                    <Step5Finalize
                        initialData={{ projects: resumeData.projects, languages: resumeData.languages }}
                        onNext={(data) => handleNext({ projects: data.projects, languages: data.languages })}
                        onBack={handleBack}
                    />
                )}

                {/* Completion Message or Next Steps */}
                {currentStep > 5 && (
                    <div className="p-8 border rounded-lg bg-green-50 text-center border-green-100">
                        <h2 className="text-xl font-bold text-green-800 mb-4">Resume Completed!</h2>
                        <p className="text-green-700 mb-6">Your information has been saved successfully.</p>

                        <div className="flex justify-center gap-4">
                            <DownloadButton />
                        </div>
                    </div>
                )}
            </div>

            {/* Live Preview */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-6 bg-gray-100 p-8 rounded-lg sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700">Live ATS Preview</h3>
                    <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Single Column ATS-Optimized</div>
                </div>
                <div className="transform scale-[0.85] origin-top">
                    <LivePreview data={resumeData} />
                </div>
            </div>
        </div>
    );
}
