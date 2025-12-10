
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';

const personalSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    title: z.string().min(2, "Desired job title is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(5, "Phone is required"),
    country: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    postCode: z.string().optional(),
});

type PersonalData = z.infer<typeof personalSchema>;

interface Step1Props {
    initialData: PersonalData;
    onNext: (data: PersonalData) => void;
}

export function Step1Personal({ initialData, onNext }: Step1Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<PersonalData>({
        resolver: zodResolver(personalSchema),
        defaultValues: initialData,
    });

    return (
        <form onSubmit={handleSubmit(onNext, (errors) => console.error("Step1 Validation Errors:", errors))} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Contacts</h2>
                <p className="text-slate-500 mt-1">Add your up-to-date contact information so employers and recruiters can easily reach you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" {...register('firstName')} error={!!errors.firstName} placeholder="e.g. Riley" />
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" {...register('lastName')} error={!!errors.lastName} placeholder="e.g. Taylor" />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                </div>

                {/* Desired Job Title */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label htmlFor="title">Desired job title</Label>
                    <Input id="title" {...register('title')} error={!!errors.title} placeholder="e.g. Accountant" />
                    {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register('phone')} error={!!errors.phone} placeholder="305-123-44444" />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register('email')} error={!!errors.email} placeholder="e.g.mail@example.com" />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>

                {/* Country */}
                <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" {...register('country')} error={!!errors.country} placeholder="USA" />
                </div>

                {/* City */}
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register('city')} error={!!errors.city} placeholder="New York" />
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...register('address')} error={!!errors.address} />
                </div>

                {/* Post Code */}
                <div className="space-y-2">
                    <Label htmlFor="postCode">Post code</Label>
                    <Input id="postCode" {...register('postCode')} error={!!errors.postCode} />
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t mt-6">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8">
                    Next: Experience
                </Button>
            </div>
        </form>
    );
}
