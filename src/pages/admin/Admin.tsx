import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type SectionProps = {
    name: string,
    description: string,
    path: string,
}

export default function Admin() {
    const navigation = useNavigate()
    const {logout} = useAuth()
    const sections = [
        { name: "Hero", description: "Edit your introduction, description, and CTA buttons", path: "/admin/hero-edit" },
        { name: "Title Section", description: "Edit your title and description of section", path: "/admin/title-section-edit" },
        { name: "Skills", description: "Manage your technical skills and expertise", path: "/admin/skill-edit" },
        { name: "My Projects", description: "Showcase your featured projects and work", path: "/admin/project-edit" },
        { name: "Contact", description: "Edit your work history and education timeline", path: "/admin/contact-edit" },
        { name: "Socials", description: "Edit your personal socials", path: "/admin/social-edit" },
    ]

    const SectionCard = ({ name, description, path }: SectionProps) => {
        return (
            <div className="min-h-40 shadow-xl px-5 py-5 rounded-lg transition-all duration-200 cursor-pointer border border-gray-100 group hover:shadow-md hover:translate-y-1.5"
                onClick={() => navigation(path)}
            >
                <h2 className="text-gray-700 font-semibold text-2xl">{name}</h2>
                <p className="text-gray-600 text-sm">{description}</p>
                <MoveRight className="ml-auto text-gray-500 mt-5 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-10 min-h-screen flex flex-col items-center justify-center">
            <button onClick={() => logout()}>Logout</button>
            <h1 className="text-gray-900 font-bold text-4xl">Welcome to your Portfolio Admin</h1>
            <p className="text-gray-600">Edit your portfolio sections and preview changes in real-time.</p>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                {sections.map((item, index) => (
                    <SectionCard key={index} {...item} />
                ))}
            </div>
        </div>
    )
}
