import ScrollTop from "../../components/ScrollToTop";
import About from "./About";
import Contact from "./Contact";
import Header from "./Header";
import Hero from "./Hero";
import Projects from "./Projects";
import Skill from "./Skill";

export default function Home() {
    return (
        <div className="dark:bg-[#0b0a08] bg-white relative">
            <Header />
            <Hero />
            <About />
            <Skill />
            <Projects />
            <Contact />
            <ScrollTop />
        </div>
    )
}
