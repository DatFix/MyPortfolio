import { ArrowDownToLine, Github, Linkedin } from "lucide-react";
import { Images } from "../../constants/images";
import { getHero, getSocial } from "../../api/firebase";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import { hanldeGoToWebsite } from "../../untils/untils";
import { motion } from "framer-motion"

export default function Hero() {
    const { data: heroData, loading: heroLoading, error: heroError } = useFetch(getHero);
    const { data: SocialMedia } = useFetch(getSocial)

    const handleDownloadCV = (href: string) => {
        const link = document.createElement("a");
        link.target = "_blank";
        link.href = href;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <>
            {
                heroLoading ? (
                    <Loading />
                ) : heroError ? (
                    <p>Error: {heroError.message}</p>
                ) : heroData && (
                    <div className="grid-cols-1 md:flex items-center justify-center min-h-screen max-w-7xl mx-auto" id="home">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-3/5">
                            <h1 className="text-2xl font-semibold leading-tight text-[#16a24a] drop-shadow typewriter inline-block">{heroData?.greeting}</h1>
                            <p className="my-3 text-6xl font-semibold text-gray-800 dark:text-white transition-colors duration-200 drop-shadow">{heroData?.job}</p>
                            <p className="text-xl text-gray-700 dark:text-gray-600 transition-colors duration-200 drop-shadow">{heroData?.bio}</p>
                            <button className="mt-3 bg-gray-500/10 border border-gray-200 dark:border-gray-800 dark:bg-gray-300/10 p-2 rounded-md dark:text-white/80 flex items-center justify-center text-sm gap-2 transition-all duration-200 active:translate-y-1"
                                onClick={() => handleDownloadCV(heroData?.cv)}
                            >
                                <ArrowDownToLine size={16} />
                                Download CV
                            </button>
                            <div className="flex items-center gap-3 my-3">
                                <button className="drop-shadow p-2.5 rounded-md hover:bg-gray-500/20 dark:hover:bg-gray-500/10 dark:text-white/80 text-gray-800 transition-all duration-200"
                                    onClick={() => hanldeGoToWebsite(SocialMedia?.github as string)}
                                >
                                    <Github size={16} />
                                </button>

                                <button className="drop-shadow p-2.5 rounded-md hover:bg-gray-500/20 dark:hover:bg-gray-500/10 dark:text-white/80 text-gray-800 transition-all duration-200"
                                    onClick={() => hanldeGoToWebsite(SocialMedia?.linkedin as string)}
                                >
                                    <Linkedin size={16} />
                                </button>
                            </div>
                        </motion.div>


                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-2/5">
                            <div className="flex items-center justify-center ">
                                <img src={heroData?.avatar ?? Images.avatar1} alt="img" className="card-shadow h-96 w-72 object-cover rounded-md" />
                            </div>
                        </motion.div>

                    </div>

                )
            }
        </>
    )
}
