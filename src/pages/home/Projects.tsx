import { getProjects } from "../../api/firebase"
import ProjectCard from "../../components/ProjectCard"
import TitleSection from "../../components/TitleSection"
import useFetch from "../../hooks/useFetch"


export default function Projects() {

    const {data: Projects} = useFetch(getProjects)
    
    return (
        <div className="dark:bg-[#191816] bg-[#f1f1f1] min-h-screen py-32 transition-all duration-200 flex flex-col items-center justify-center" id="projects">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center" >
                <TitleSection sectionKey="project" />

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {Projects?.map((item, index) => (
                        <ProjectCard key={index} {...item} index={index} />
                    ))}
                </div>

            </div>
        </div>
    )
}
