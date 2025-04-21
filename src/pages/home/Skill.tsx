import useFetch from "../../hooks/useFetch"
import { getOrtherSkills, getSkills } from "../../api/firebase"
import Icons from "../../components/Icons";
import TitleSection from "../../components/TitleSection";
import { motion } from "framer-motion"
import Loading from "../../components/Loading";


export default function Skill() {

    const { data: skillCategories, loading: skillLoading, error: skillError } = useFetch(getSkills)
    const { data: otherSkillCategories, loading: ortherSkillLoading, error: ortherSkillError } = useFetch(getOrtherSkills)


    return (
        <div>
            {skillLoading || ortherSkillLoading ? (
                <Loading />
            ) : skillError || ortherSkillError ? (
                <p>Error {skillError?.message} {ortherSkillError?.message}</p>
            ) : skillCategories && otherSkillCategories && (
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen" id="skills">
                    <TitleSection sectionKey="skill" />
                    <div className="flex flex-wrap gap-3 items-center justify-center">
                        {skillCategories?.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5 + index * 0.1 }}
                                className="dark:bg-gray-500/10 bg-gray-100 rounded-lg flex items-center justify-center gap-2 px-3 py-2 shadow-md transition-all duration-200" key={index}>
                                <p className="text-lg" style={{ color: item.color }}><Icons name={item.iconName} lib={item.iconLib} /></p>
                                <p className="text-lg dark:text-gray-400 transition-all duration-200">{item.skillName}</p>
                            </motion.div>
                        ))}
                    </div>

                    <p className="mt-20 mb-5 text-xl dark:text-white/90 text-gray-700 font-semibold transition-all duration-200">Other Technologies I Work With</p>
                    <div className="flex flex-wrap gap-3 items-center justify-center">
                        {otherSkillCategories?.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5 + index * 0.1 }}
                                className="dark:bg-gray-500/10 bg-gray-100 rounded-lg flex items-center justify-center gap-2 px-3 py-2 shadow-md transition-all duration-200" key={index}>
                                <p className="text-lg" style={{ color: item.color }}><Icons name={item.iconName} lib={item.iconLib} /></p>
                                <p className="text-lg dark:text-gray-400 transition-all duration-200">{item.skillName}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
