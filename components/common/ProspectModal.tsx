import React, { useState, useCallback } from 'react';
import type { Prospect, ProspectStatus } from '../../types';
import { Button } from './Button';
import { parseProfileWithAI, parseProfileFromImagesWithAI } from '../../services/geminiService';
import { statusDefinitions } from '../../data/statusDefinitions';
import { Card } from './Card';

interface ProspectModalProps {
    prospect: Prospect | null;
    onSave: (prospect: Omit<Prospect, 'id' | 'history'> | (Prospect & { about?: string, experience?: string })) => void;
    onClose: () => void;
}

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-700 mb-2">
        {children}
    </label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
    />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
        {...props}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
    />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        {...props}
        rows={props.rows || 4}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
    />
);


export const ProspectModal = ({ prospect, onSave, onClose }: ProspectModalProps) => {
    const [formData, setFormData] = useState({
        name: prospect?.name || '',
        company: prospect?.company || '',
        position: prospect?.position || '',
        email: prospect?.email || '',
        platform: prospect?.platform || 'linkedin',
        status: prospect?.status || 'initial-contact',
        dealValue: prospect?.dealValue || 0,
        isHighValue: prospect?.isHighValue || false,
        headline: prospect?.headline || '',
        about: prospect?.about || '',
        experience: prospect?.experience || '',
        companyOverview: prospect?.companyOverview || '',
        companyWebsite: prospect?.companyWebsite || '',
    });

    const [profileDump, setProfileDump] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [isParsing, setIsParsing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        setFormData(prev => ({
            ...prev,
            [name]: isCheckbox ? (e.target as HTMLInputElement).checked : (type === 'number' ? parseFloat(value) : value),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...prospect, ...formData });
    };

    const handleParseProfileFromText = async () => {
        if (!profileDump.trim()) {
            alert('Please paste the profile text first.');
            return;
        }
        setIsParsing(true);
        try {
            const parsedData = await parseProfileWithAI(profileDump);
            setFormData(prev => ({ ...prev, ...parsedData }));
            alert('Profile parsed successfully! Please review the fields below.');
        } catch (error) {
            console.error(error);
            alert((error as Error).message || 'An error occurred during parsing.');
        } finally {
            setIsParsing(false);
        }
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImageFiles(files);

            imagePreviews.forEach(URL.revokeObjectURL);
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const handleParseFromImages = async () => {
        if (imageFiles.length === 0) {
            alert('Please upload at least one image of the profile.');
            return;
        }
        setIsParsing(true);
        try {
            const imagePromises = imageFiles.map(file => {
                return new Promise<{ mimeType: string, data: string }>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64String = (reader.result as string).split(',')[1];
                        resolve({ mimeType: file.type, data: base64String });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            const imageData = await Promise.all(imagePromises);
            const parsedData = await parseProfileFromImagesWithAI(imageData);
            setFormData(prev => ({ ...prev, ...parsedData }));
            alert('Profile parsed from images successfully! Please review the fields below.');

        } catch (error) {
            console.error(error);
            alert((error as Error).message || 'An error occurred during image parsing.');
        } finally {
            setIsParsing(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-brand-primary-dark">{prospect ? 'Edit Prospect Details' : 'Add New Prospect'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-grow overflow-y-auto p-6 space-y-6">
                        
                       {!prospect && (
                           <>
                                <Card title="🧠 AI Visual Parser (from Images)" icon="🖼️">
                                     <p className="text-sm text-gray-600 mb-3">Upload screenshots of the profile (header, about, experience, company page) and the AI will extract the information.</p>
                                     <div>
                                        <Label htmlFor="imageUpload">Upload Profile Images</Label>
                                        <input 
                                            id="imageUpload"
                                            type="file" 
                                            multiple 
                                            accept="image/*" 
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        />
                                     </div>
                                     {imagePreviews.length > 0 && (
                                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {imagePreviews.map((src, index) => (
                                                <img key={index} src={src} alt={`Preview ${index}`} className="w-full h-auto object-cover rounded-lg border-2 border-gray-200" />
                                            ))}
                                        </div>
                                     )}
                                     <div className="mt-3">
                                        <Button type="button" onClick={handleParseFromImages} disabled={isParsing || imageFiles.length === 0} variant="info">
                                            {isParsing ? '🖼️ Analyzing Images...' : '🖼️ Parse from Images'}
                                        </Button>
                                    </div>
                                </Card>
                                
                                <Card title="🚀 AI Text Parser" icon="✍️">
                                    <p className="text-sm text-gray-600 mb-3">Or, paste the entire content of a LinkedIn profile below to have the AI automatically fill out the form fields.</p>
                                    <Label htmlFor="profileDump">Paste LinkedIn Profile Text Here</Label>
                                    <Textarea 
                                        id="profileDump"
                                        name="profileDump"
                                        value={profileDump}
                                        onChange={(e) => setProfileDump(e.target.value)}
                                        rows={6}
                                        placeholder="Copy everything from the top of the LinkedIn profile page and paste it here."
                                    />
                                    <div className="mt-3">
                                        <Button type="button" onClick={handleParseProfileFromText} disabled={isParsing} variant="info">
                                            {isParsing ? '🧠 Parsing...' : '🧠 Parse from Text'}
                                        </Button>
                                    </div>
                                </Card>
                                <hr className="border-gray-300" />
                           </>
                       )}
                        
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Contact Name *</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="company">Company *</Label>
                                <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="headline">Headline (from LinkedIn)</Label>
                            <Input id="headline" name="headline" value={formData.headline} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div>
                                <Label htmlFor="position">Position/Title</Label>
                                <Input id="position" name="position" value={formData.position} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div>
                                <Label htmlFor="dealValue">Deal Value ($)</Label>
                                <Input id="dealValue" name="dealValue" type="number" value={formData.dealValue} onChange={handleChange} />
                            </div>
                             <div>
                                <Label htmlFor="platform">Platform</Label>
                                <Select id="platform" name="platform" value={formData.platform} onChange={handleChange}>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="email">Email</option>
                                    <option value="whatsapp">WhatsApp</option>
                                    <option value="twitter">Twitter/X</option>
                                </Select>
                            </div>
                        </div>
                        {!prospect && (
                            <div>
                                <Label htmlFor="status">Initial Status</Label>
                                <Select id="status" name="status" value={formData.status} onChange={handleChange}>
                                    {statusDefinitions.map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </Select>
                            </div>
                        )}
                         <div className="flex items-center">
                            <input
                                id="isHighValue"
                                name="isHighValue"
                                type="checkbox"
                                checked={formData.isHighValue}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                            />
                            <label htmlFor="isHighValue" className="ml-2 block text-sm font-semibold text-gray-900">
                                Mark as High-Value Target
                            </label>
                        </div>
                         <div>
                            <Label htmlFor="about">About (from LinkedIn)</Label>
                            <Textarea id="about" name="about" value={formData.about} onChange={handleChange} rows={5} />
                        </div>
                         <div>
                            <Label htmlFor="experience">Experience (from LinkedIn)</Label>
                            <Textarea id="experience" name="experience" value={formData.experience} onChange={handleChange} rows={6} />
                        </div>
                        <hr/>
                        <div>
                            <Label htmlFor="companyWebsite">Company Website</Label>
                            <Input id="companyWebsite" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} />
                        </div>
                         <div>
                            <Label htmlFor="companyOverview">Company Overview</Label>
                            <Textarea id="companyOverview" name="companyOverview" value={formData.companyOverview} onChange={handleChange} rows={5} />
                        </div>
                    </div>
                    <div className="p-6 border-t bg-gray-50 flex justify-end gap-4 rounded-b-2xl">
                        <Button type="button" onClick={onClose} variant="primary" className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</Button>
                        <Button type="submit" variant="success">Save Prospect</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
