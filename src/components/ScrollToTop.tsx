import { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

export default function ScrollTop() {
    const [showButtonScroll, setShowButtonScroll] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setShowButtonScroll(true);
        } else {
            setShowButtonScroll(false);
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed right-10 bottom-10 z-[1000] opacity-0 ${showButtonScroll ? 'opacity-100 transition-all duration-200' : 'hidden'}`}>
            <div
                className='w-10 aspect-square bg-[#16a24a] text-white rounded-lg flex items-center justify-center transition-all duration-200 active:scale-110 cursor-pointer'
                onClick={handleScrollToTop}
            >
                <MdOutlineKeyboardBackspace className='rotate-90 text-xl' />
            </div>
        </div>
    );
}
