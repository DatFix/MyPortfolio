
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Admin from "../pages/admin/Admin";
import NotFound from "../components/NotFound";
import HeroEdit from "../pages/admin/HeroEdit";
import SkillEdit from "../pages/admin/SkillEdit";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/admin/Login";
import Loading from "../components/Loading";
import TitleSectionEdit from "../pages/admin/TitleSectionEdit";
import ProjectEdit from "../pages/admin/ProjectEdit";
import ContactEdit from "../pages/admin/ContactEdit";
import SocialEdit from "../pages/admin/SocialEdit";

export default function AppRouter() {
    const { isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Routes>
            {isAdmin ? (
                <>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/hero-edit" element={<HeroEdit />} />
                    <Route path="/admin/skill-edit" element={<SkillEdit />} />
                    <Route path="/admin/title-section-edit" element={<TitleSectionEdit />} />
                    <Route path="/admin/project-edit" element={<ProjectEdit />} />
                    <Route path="/admin/contact-edit" element={<ContactEdit />} />
                    <Route path="/admin/social-edit" element={<SocialEdit />} />
                </>
            ) : (
                <>
                    <Route path="/admin" element={<Login />} />
                </>
            )}
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

