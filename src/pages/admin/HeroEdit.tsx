import { useEffect, useState } from "react";
import BackToTab from "../../components/BackToTab";
import { Images } from "../../constants/images";
import { editHero, getHero } from "../../api/firebase";
import { IHeroProps } from "../../interfaces/interfaces";
import useFetch from "../../hooks/useFetch";

export default function HeroEdit() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [cvFileName, setCvFileName] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [greeting, setGreeting] = useState('');
    const [job, setJob] = useState('');
    const [bio, setBio] = useState('');
    const [loadingAction, setLoadingAction] = useState(false);

    const { data: heroData } = useFetch(getHero)
    // console.log("heroData", heroData);

    useEffect(() => {
        if (heroData) {
            setGreeting(heroData.greeting);
            setJob(heroData.job);
            setBio(heroData.bio);
            setCvFileName(heroData.cv);
            setPreviewImage(heroData.avatar);
        }
    }, [heroData]);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCvFile(file);
            setCvFileName(file.name);
        }
    };

    const handldeEditHero = async ({ greeting, job, bio, avatarFile, cvFile }: IHeroProps) => {
        try {
            setLoadingAction(true);
            const response = await editHero({ greeting, job, bio, avatarFile, cvFile });
            setLoadingAction(false);
            console.log("avatarFile, cvFile", avatarFile, cvFile);
            alert("Updated Successfully");
            console.log("Created hero:", response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-10">
            <BackToTab />

            <div className="shadow-xl border border-gray-100 rounded-lg px-6 py-8 bg-white">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Edit Hero Section</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Profile Image */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <h3 className="font-medium text-gray-700 mb-4">Profile Image</h3>
                            <div className="w-40 h-40 mb-5 aspect-square rounded-full mx-auto overflow-hidden shadow-md border border-gray-200">
                                <img
                                    src={previewImage || Images.avatar1}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <label className="block w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-md cursor-pointer hover:bg-blue-100 transition-colors">
                                <span className="text-sm font-medium">Choose Image</span>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">Recommended: Square image, 500x500px</p>
                        </div>

                        {/* CV Upload Section */}
                        <div className="bg-gray-50 rounded-lg p-6 mt-6">
                            <h3 className="font-medium text-gray-700 mb-4">CV Document</h3>

                            {cvFileName ? (
                                <div className="flex items-center bg-blue-50 p-3 rounded-md mb-4">
                                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-700 truncate">{cvFileName}</span>
                                </div>
                            ) : null}

                            <label className="block w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-md cursor-pointer hover:bg-blue-100 transition-colors">
                                <span className="text-sm font-medium">Upload CV</span>
                                <input
                                    type="file"
                                    onChange={handleCvChange}
                                    accept=".pdf,.doc,.docx,.txt"
                                    className="hidden"
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX</p>
                        </div>
                    </div>

                    {/* Right Column - Text Fields */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={greeting}
                                onChange={(e) => setGreeting(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                            <input
                                type="text"
                                id="title"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                                placeholder="e.g. Frontend Developer"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
                            <textarea
                                id="bio"
                                rows={6}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Write a short introduction about yourself"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <div className="flex justify-end">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    onClick={() => handldeEditHero({ greeting, job, bio, avatarFile, cvFile })}
                                >
                                    {loadingAction ? <div className="w-5 h-5 border-[3px] rounded-full border-white border-t-[#16a24a] animate-spin"></div> : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}