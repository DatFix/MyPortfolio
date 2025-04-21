import { FaGithub } from "react-icons/fa";
import { RiShareBoxLine } from "react-icons/ri";
import { IProjectCardProps } from "../interfaces/interfaces";
import { hanldeGoToWebsite } from "../untils/untils";
import { motion } from "framer-motion"

export default function ProjectCard({ image, name, description, tools, linkGithub, linkPreview, index }: IProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: index as number % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className=" rounded-lg dark:bg-gray-500/10 bg-gray-100 shadow-xl">
            <img src={image} alt="img" className="w-full aspect-video object-contain rounded-t-lg" />
            <div className="my-3 px-5">
                <p className="text-lg font-semibold dark:text-white/90 text-gray-800">{name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 min-h-20">{description}</p>
                <div className="mt-2 my-4">
                    {tools.map((tool: string, index: number) => (
                        <span key={index} className="mr-2 rounded-full text-[12px] px-2 py-1 bg-black/90 text-white">
                            {tool}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center pb-4">
                    <button className="px-3 py-2 rounded-md flex items-center justify-center gap-2 bg-gray-500/10 dark:text-white transition-all duration-200 active:translate-y-1" onClick={() => hanldeGoToWebsite(linkGithub)}>
                        <FaGithub />
                        <span className="ml-2">Code</span>
                    </button>

                    <button className="px-3 py-2 rounded-md flex items-center justify-center gap-2 bg-[#16a24a] text-gray-800 transition-all duration-200 active:translate-y-1 text-sm" onClick={() => hanldeGoToWebsite(linkPreview)}>
                        <RiShareBoxLine className="text-white" />
                        <span className="ml-2 text-white">Live Demo</span>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
