import { Code2, Coffee, Lightbulb, Rocket } from "lucide-react"
import TitleSection from "../../components/TitleSection"
import { motion } from "framer-motion"

export default function About() {

    const passions = [
        {
            icon: <Code2 className="h-10 w-10 text-primary" />,
            title: "Clean Code",
            description: "I believe in writing clean, maintainable code that stands the test of time.",
        },
        {
            icon: <Lightbulb className="h-10 w-10 text-primary" />,
            title: "Problem Solving",
            description: "I enjoy tackling complex problems and finding elegant solutions.",
        },
        {
            icon: <Rocket className="h-10 w-10 text-primary" />,
            title: "Innovation",
            description: "Always exploring new technologies and approaches to stay ahead.",
        },
        {
            icon: <Coffee className="h-10 w-10 text-primary" />,
            title: "Collaboration",
            description: "I thrive in collaborative environments where ideas flow freely.",
        },
    ]

    return (
        <div className="dark:bg-[#191816] bg-[#f1f1f1] min-h-screen transition-all duration-200 flex flex-col items-center justify-center" id="about">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
                <TitleSection sectionKey={"about"} />

                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    // viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-5 w-full">
                    {passions?.map((item, index) => (
                        <div
                            key={index} className="dark:bg-gray-500/10 bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-3 p-5 min-h-60 w-1/4 transition-all duration-200 shadow-xl cursor-pointer">
                            <p className="text-[#16a24a] transition-all duration-200">{item.icon}</p>
                            <p className="text-xl font-semibold text-gray-800 dark:text-white/90 transition-all duration-200">{item.title}</p>
                            <p className="text-gray-700 dark:text-white/80 text-center transition-all duration-200">{item.description}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
