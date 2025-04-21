import { getTitleSectionByKey } from "../api/firebase"
import useFetch from "../hooks/useFetch"
import { ITitleSectionProps } from "../interfaces/interfaces";
import { motion } from "framer-motion"

type Props = {
    sectionKey: string;
};

export default function TitleSection({ sectionKey }: Props) {
    const { data: Data, loading: LoadingData, error: Error } = useFetch<ITitleSectionProps[]>(() => getTitleSectionByKey(sectionKey))

    return (
        <div>
            {LoadingData ? (
                <div className="opacity-0"></div>
            ) : Error ? (
                <p>Error : {Error.message}</p>
            ) : Data && (
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <div
                        className="flex flex-col items-center justify-center">
                        <h1 className="dark:text-white text-gray-700 text-4xl font-semibold transition-all duration-200">{Data?.[0]?.title || ""}</h1>
                        <div className="h-5 w-20 border-b-4 border-[#16a24a] inline-block justify-center transition-all duration-200"></div>
                    </div>

                    <p className="text-lg dark:text-gray-400 max-w-2xl text-center my-10 transition-all duration-200">{Data?.[0]?.description || ""}</p>
                </motion.div>
            )}
        </div>
    )
}
