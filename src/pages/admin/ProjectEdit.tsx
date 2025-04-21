import { useState } from "react";
import BackToTab from "../../components/BackToTab";
import { Images } from "../../constants/images";
import { Popconfirm, Select, SelectProps, Table } from "antd";
import { IProjectCardProps } from "../../interfaces/interfaces";
import { createProject, getProjects, updateProject } from "../../api/firebase";
import useFetch from "../../hooks/useFetch";
import { PencilLine, Trash2 } from "lucide-react";

export default function ProjectEdit() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tools, setTools] = useState<string[]>([]);
    const [loadingAction, setLoadingAction] = useState(false);
    const [githubLink, setGithubLink] = useState<string>("");
    const [previewLink, setPreviewLink] = useState<string>("");
    const [editAction, setEditAction] = useState(false);
    const [id, setId] = useState<string>("");

    const { data: ProjectData, refetch: refetchProjects } = useFetch(getProjects);
    console.log("ProjectData", ProjectData);


    const options: SelectProps['options'] = [];

    const handleChange = (value: string[]) => {
        setTools(value);
    };

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

    const handleCreateProject = async ({ name, description, tools, image, linkGithub, linkPreview }: IProjectCardProps) => {
        try {
            setLoadingAction(true);
            await createProject({ name, description, tools, image, linkGithub, linkPreview })
            setLoadingAction(false)
            setTitle("")
            setDescription("")
            setTools([])
            setAvatarFile(null)
            setPreviewImage("")
            setGithubLink("");
            setPreviewLink("");
            refetchProjects()
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdateProject = async ({ id, name, description, tools, image, linkGithub, linkPreview }: IProjectCardProps) => {
        try {
            setLoadingAction(true);
            await updateProject({ id, name, description, tools, image, linkGithub, linkPreview })
            setLoadingAction(false)
            setTitle("")
            setDescription("")
            setTools([])
            setAvatarFile(null)
            setPreviewImage("")
            setGithubLink("");
            setPreviewLink("");
            setId("");
            setEditAction(false)
            refetchProjects()
        } catch (error) {
            console.error(error);
        }
    }

    const dataSource = ProjectData?.map((item, index) => ({
        key: index,
        image: <img src={item?.image} alt="img" className="w-20 aspect-video object-cover" />,
        title: item?.name,
        description: item.description,
        tools: <div className="flex flex-wrap gap-1">{item.tools.map((tool: string, index: number) => <span key={index} className="bg-gray-800 text-white rounded-full px-1 py-0.5 text-[8px]">{tool}</span>)}</div>,
        github: item.linkGithub,
        preview: item.linkPreview,
        action: (
            <div className="flex items-center justify-center gap-2">
                <button
                    className="px-3 py-1 bg-blue-600 rounded-md text-white"
                    onClick={() => {
                        setEditAction(true),
                            setId(item.id as string),
                            setTitle(item.name),
                            setDescription(item.description),
                            setTools(item.tools),
                            setPreviewImage(item.image),
                            setGithubLink(item.linkGithub),
                            setPreviewLink(item.linkPreview)
                    }}
                >
                    <PencilLine size={15} />
                </button>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => console.log("dsf")}
                    onCancel={() => console.log('Cancel')}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className="px-3 py-1 bg-rose-600 rounded-md text-white">
                        <Trash2 size={15} />
                    </button>
                </Popconfirm>
            </div>
        )
    })) || [];


    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: "20%",
            ellipsis: true,
        },
        {
            title: 'Tools',
            dataIndex: 'tools',
            key: 'tools',
        },
        {
            title: 'Github',
            dataIndex: 'github',
            key: 'github',
        },
        {
            title: 'Preview',
            dataIndex: 'preview',
            key: 'preview',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    return (
        <div className="max-w-4xl mx-auto py-10">
            <BackToTab />
            <div className="shadow-xl border border-gray-100 rounded-lg px-6 py-8 bg-white">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Edit Project Section</h2>

                <div className="my-3 max-w-4xl overflow-auto">
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Profile Image */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <h3 className="font-medium text-gray-700 mb-4">Profile Image</h3>
                            <div className="w-full  mb-5 aspect-video mx-auto overflow-hidden shadow-md border border-gray-200">
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

                    </div>

                    {/* Right Column - Text Fields */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                id="name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                id="bio"
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write a short introduction about yourself"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Tools</label>
                            <Select
                                size="large"
                                className=""
                                mode="tags"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                tokenSeparators={[',']}
                                options={options}
                                value={tools}
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Source Code</label>
                            <input
                                type="text"
                                id="name"
                                value={githubLink}
                                onChange={(e) => setGithubLink(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Preview Link</label>
                            <input
                                type="text"
                                id="name"
                                value={previewLink}
                                onChange={(e) => setPreviewLink(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                            />
                        </div>

                        <div className="pt-4">
                            <div className="flex justify-end">
                                {editAction ? (
                                    <div className="flex gap-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            onClick={() => handleUpdateProject({ id: id, name: title, description: description, image: previewImage, linkGithub: githubLink, linkPreview: previewLink, tools: tools })}
                                        >
                                            {loadingAction ? <div className="w-5 h-5 border-[3px] rounded-full border-white border-t-[#16a24a] animate-spin"></div> : 'Update'}
                                        </button>

                                        <button className="bg-rose-500 hover:bg-rose-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                            onClick={() => {
                                                setEditAction(false),
                                                    setTitle(""),
                                                    setDescription(""),
                                                    setTools([]),
                                                    setPreviewImage(""),
                                                    setGithubLink(""),
                                                    setPreviewLink("")
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={() => handleCreateProject({ name: title, description: description, image: avatarFile, linkGithub: githubLink, linkPreview: previewLink, tools: tools })}
                                    >
                                        {loadingAction ? <div className="w-5 h-5 border-[3px] rounded-full border-white border-t-[#16a24a] animate-spin"></div> : 'Save'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
