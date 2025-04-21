import { SquareArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackToTab() {
    const navigation = useNavigate()
    return (
        <div className="flex items-center gap-2 mb-5 w-24 cursor-pointer" onClick={() => navigation(-1)}>
            <SquareArrowRight strokeWidth={1.5} className="rotate-180 text-gray-800" />
            <p className="text-lg">Back</p>
        </div>
    )
}
