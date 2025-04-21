import { House } from "lucide-react";
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const router = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
      <h1 className="text-9xl font-semibold text-[#16a24a] animate-bounce">404</h1>
      <div className="flex flex-col items-center justify-center mt-5 my-10 gap-3">
        <p className="text-3xl font-bold text-gray-900 capitalize">Page not found</p>
        <p className="text-gray-500">Oops! The page you're looking for doesn't exist or has been moved.</p>
      </div>
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="180"
          viewBox="0 0 24 24"
          fill="none"
          className="rounded-full"
        >
          <circle cx="12" cy="12" r="12" fill="#bbf7d0" /> {/* bg-green-100 */}
          <path
            d="M8 15s1-1 4-1 4 1 4 1"
            stroke="#16a34a"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 9h.01M15 9h.01"
            stroke="#16a34a"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <button className="flex mt-5 items-center justify-center gap-2 px-3 py-2 bg-[#16a24a] text-white rounded-md hover:bg-emerald-500 transition-all duration-200"
        onClick={() => router('/')}
      >
        <House size={20} /> Back to Home
      </button>
    </div>
  )
}
