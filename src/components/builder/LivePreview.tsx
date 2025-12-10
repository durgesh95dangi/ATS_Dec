
'use client';

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function LivePreview({ data }: { data: any }) {
    if (!data) return null;

    const { personal, summary, skills, experience, education, certifications, projects, languages } = data;

    return (
        <div id="resume-preview" className={`bg-white p-6 min-h-[1000px] text-gray-900 ${inter.className} text-[11pt] leading-normal shadow-lg print:shadow-none max-w-[210mm] mx-auto`}>
            {/* Header */}
            <header className="mb-6 border-b-2 border-gray-900 pb-4">
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">
                    {personal?.firstName} {personal?.lastName}
                </h1>
                <p className="text-lg font-medium mb-1">{personal?.title || "Professional Title"}</p>
                <div className="text-sm flex flex-wrap gap-2 text-gray-700">
                    {personal?.email && <span>{personal.email}</span>}
                    {personal?.phone && <span>• {personal.phone}</span>}
                    {(personal?.city || personal?.country) && (
                        <span>• {[personal.address, personal.city, personal.country, personal.postCode].filter(Boolean).join(', ')}</span>
                    )}
                </div>
            </header>

            {/* Content Blocks */}
            <div className="space-y-6">

                {/* Summary */}
                {summary && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Professional Summary</h2>
                        <p>{summary}</p>
                    </section>
                )}

                {/* Skills */}
                {skills && (skills.core?.length > 0 || skills.tools?.length > 0) && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Skills</h2>
                        <div className="grid grid-cols-1 gap-1 text-sm">
                            {skills.core?.length > 0 && (
                                <div className="flex">
                                    <span className="font-bold w-32 shrink-0">Core:</span>
                                    <span>{skills.core.join(', ')}</span>
                                </div>
                            )}
                            {skills.tools?.length > 0 && (
                                <div className="flex">
                                    <span className="font-bold w-32 shrink-0">Tools:</span>
                                    <span>{skills.tools.join(', ')}</span>
                                </div>
                            )}
                            {skills.soft?.length > 0 && (
                                <div className="flex">
                                    <span className="font-bold w-32 shrink-0">Soft Skills:</span>
                                    <span>{skills.soft.join(', ')}</span>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experience?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Work Experience</h2>
                        <div className="space-y-4">
                            {experience.map((job: any, i: number) => (
                                <div key={job.id || i}>
                                    <div className="flex justify-between font-bold">
                                        <span>{job.title}</span>
                                        <span>{job.startDate} – {job.current ? 'Present' : job.endDate}</span>
                                    </div>
                                    <div className="flex justify-between italic mb-1">
                                        <span>{job.company}</span>
                                        <span>{job.location}</span>
                                    </div>
                                    {job.summary && <p className="mb-1">{job.summary}</p>}
                                    <ul className="list-disc list-inside space-y-0.5 ml-1">
                                        {job.achievements?.map((ach: any, j: number) => (
                                            <li key={j}>{ach.text || ach}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects - Optional Section */}
                {projects?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Projects</h2>
                        <div className="space-y-3">
                            {projects.map((proj: any, i: number) => (
                                <div key={proj.id || i}>
                                    <div className="font-bold">{proj.title} <span className="font-normal italic">- {proj.role}</span></div>
                                    <p className="text-sm">{proj.description}</p>
                                    {(proj.tools || proj.impact) && (
                                        <p className="text-sm text-gray-600 mt-0.5">
                                            {proj.tools && <span className="mr-3"><strong>Stack:</strong> {proj.tools}</span>}
                                            {proj.impact && <span><strong>Impact:</strong> {proj.impact}</span>}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Education</h2>
                        <div className="space-y-2">
                            {education.map((edu: any, i: number) => (
                                <div key={edu.id || i}>
                                    <div className="flex justify-between font-bold">
                                        <span>{edu.institution}</span>
                                        <span>{edu.startDate && `${edu.startDate} - `}{edu.endDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{edu.degree}</span>
                                        {edu.notes && <span className="italic">{edu.notes}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications - Optional Section */}
                {certifications?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Certifications</h2>
                        <ul className="list-disc list-inside">
                            {certifications.map((cert: any, i: number) => (
                                <li key={cert.id || i}>
                                    <span className="font-bold">{cert.name}</span> — {cert.issuer} {cert.date && `(${cert.date})`}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Languages - Optional Section */}
                {languages?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Languages</h2>
                        <p>
                            {languages.map((l: any) => `${l.language} (${l.proficiency})`).join(', ')}
                        </p>
                    </section>
                )}

            </div>
        </div>
    );
}
