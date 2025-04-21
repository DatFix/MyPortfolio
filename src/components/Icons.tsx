import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as TbIcons from "react-icons/tb";
import * as GiIcons from "react-icons/gi";

const iconLibraries: Record<string, any> = {
    fa: FaIcons,
    si: SiIcons,
    bi: BiIcons,
    ri: RiIcons,
    tb: TbIcons,
    gi: GiIcons
};

// Component nhận props `lib` (viết tắt tên thư viện) và `name` (tên icon)
export default function Icons({ lib, name }: { lib: string; name: string }) {
    const IconComponent = iconLibraries[lib?.toLowerCase()]?.[name];

    if (!IconComponent) return <span>Icon</span>;

    return <IconComponent />;
}
