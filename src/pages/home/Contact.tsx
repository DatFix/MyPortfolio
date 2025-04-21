import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import TitleSection from "../../components/TitleSection"
import useFetch from "../../hooks/useFetch"
import { getContact, getSocial } from "../../api/firebase"
import { motion } from "framer-motion"

export default function Contact() {
    const [copied, setCopied] = useState<string | null>(null)

    const { data: SocialMedia } = useFetch(getSocial)
    const { data: Conntact } = useFetch(getContact)

    const contactInfo = [
        {
            icon: <Mail className="h-6 w-6" />,
            label: "Email",
            value: Conntact?.email,
            subtext: "For project inquiries and collaborations",
            action: () => copyToClipboard(Conntact?.email as string),
        },
        {
            icon: <Phone className="h-6 w-6" />,
            label: "Phone",
            value: Conntact?.phone,
            subtext: "Available during business hours",
            action: () => copyToClipboard(Conntact?.phone as string),
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            label: "Adress",
            value: Conntact?.address,
            subtext: "",
            action: null,
        },
    ]

    const socialLinks = [
        { icon: <Github className="h-5 w-5" />, label: "GitHub", href: SocialMedia?.github, color: "bg-[#333333]" },
        { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: SocialMedia?.linkedin, color: "bg-[#0077B5]" },
        { icon: <Facebook className="h-5 w-5" />, label: "Facebook", href: SocialMedia?.facebook, color: "bg-[#1DA1F2]" },
        {
            icon: <Instagram className="h-5 w-5" />,
            label: "Instagram",
            href: SocialMedia?.instagram,
            color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
        },
    ]

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(text)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <div className="max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center" id="contact">
            <TitleSection sectionKey="contact" />

            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid-cols-1 md:flex items-center w-full p-5 gap-5">
                {contactInfo?.map((item, index) => (
                    <div

                        className="w-full md:w-1/3 dark:bg-gray-500/10 bg-gray-100 min-h-60 shadow-xl transition-all duration-200 hover:shadow-md rounded-lg border-t-4 border-t-[#16a24a] py-3 px-5 hover:translate-y-1" key={index}>
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-[#16a24a]">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-medium mb-1 text-gray-800 dark:text-white/90">{item.label}</h3>
                        <p className="text-gray-700 dark:text-white/80 mb-1 font-medium">{item.value}</p>
                        <p className="text-gray-700 dark:text-white/80 text-sm mb-4">{item.subtext}</p>
                        {item.action && (
                            <button
                                onClick={item.action}
                                className="px-3 py-2 text-sm border border-gray-200 dark:border-none rounded-md mt-2 text-[#16a24a] hover:text-emerald-700 bg-gray-500/10 dark:text-white"
                            >
                                {copied === item.value ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>
                ))}
            </motion.div>

            <div className="flex items-center justify-center gap-5 my-10">
                {socialLinks.map((link, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 + index * 0.1 }}
                    >
                        <Link
                            key={index}
                            to={link.href as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-lg transition-all duration-300 hover:translate-y-1 ${link.color}`}
                            aria-label={link.label}
                        >
                            {link.icon}
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
