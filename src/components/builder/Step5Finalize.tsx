
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

const projectSchema = z.object({
    id: z.string(),
    title: z.string().min(2, "Title is required"),
    role: z.string().optional(),
    description: z.string().min(10, "Description is required"),
    tools: z.string().optional(), // Comma separated
    impact: z.string().optional()
});

const languageSchema = z.object({
    language: z.string().min(2, "Language required"),
    proficiency: z.string().min(2, "Proficiency required") // e.g. Native, Fluent
});

const step5Schema = z.object({
    projects: z.array(projectSchema),
    languages: z.array(languageSchema)
});

type Step5Data = z.infer<typeof step5Schema>;

interface Step5Props {
    initialData: { projects: any[]; languages: any[] };
    onNext: (data: any) => void;
    onBack: () => void;
}

export function Step5Finalize({ initialData, onNext, onBack }: Step5Props) {
    const { register, control, handleSubmit, formState: { errors } } = useForm<Step5Data>({
        resolver: zodResolver(step5Schema),
        defaultValues: {
            projects: initialData.projects || [],
            languages: initialData.languages || []
        }
    });

    const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({
        control,
        name: "projects"
    });

    const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({
        control,
        name: "languages"
    });

    const addProject = () => {
        appendProj({
            id: crypto.randomUUID(),
            title: '',
            role: '',
            description: '',
            tools: '',
            impact: ''
        });
    };

    const addLanguage = () => {
        appendLang({ language: '', proficiency: '' });
    };

    return (
        <form onSubmit={handleSubmit(onNext)} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3">Final Details</h2>
                <p className="text-gray-500 mt-1 pl-4">Projects and Skills rounds out your profile nicely.</p>
            </div>

            {/* Projects Section */}
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Significant Projects (Optional)</h3>

                {projFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg bg-gray-50 relative space-y-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProj(index)}
                            className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Project Title</Label>
                                <Input {...register(`projects.${index}.title`)} placeholder="e.g. E-Commerce Platform" className={errors.projects?.[index]?.title ? 'border-red-500' : ''} />
                            </div>
                            <div className="space-y-2">
                                <Label>Your Role</Label>
                                <Input {...register(`projects.${index}.role`)} placeholder="e.g. Lead Developer" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Description</Label>
                                <Input {...register(`projects.${index}.description`)} placeholder="Briefly describe what you built..." className={errors.projects?.[index]?.description ? 'border-red-500' : ''} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tools Used</Label>
                                <Input {...register(`projects.${index}.tools`)} placeholder="e.g. React, Node.js" />
                            </div>
                            <div className="space-y-2">
                                <Label>Impact / Link</Label>
                                <Input {...register(`projects.${index}.impact`)} placeholder="e.g. Deployed to 1k users" />
                            </div>
                        </div>
                    </div>
                ))}

                <Button type="button" onClick={addProject} variant="secondary" className="w-full border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600">
                    <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
            </div>

            {/* Languages Section */}
            <div className="space-y-6 border-t pt-8">
                <h3 className="text-lg font-bold text-gray-900">Languages (Optional)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {langFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                            <Input {...register(`languages.${index}.language`)} placeholder="Language" className={errors.languages?.[index]?.language ? 'border-red-500' : ''} />
                            <Input {...register(`languages.${index}.proficiency`)} placeholder="Proficiency" className={errors.languages?.[index]?.proficiency ? 'border-red-500' : ''} />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLang(index)}
                                className="text-red-500 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                <Button type="button" onClick={addLanguage} variant="secondary" className="w-full md:w-auto border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-2" /> Add Language
                </Button>
            </div>

            <div className="flex justify-between pt-6 border-t mt-6">
                <Button type="button" variant="secondary" onClick={onBack}>Back</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 shadow-lg shadow-blue-100 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Finalize & Preview
                </Button>
            </div>
        </form>
    );
}
