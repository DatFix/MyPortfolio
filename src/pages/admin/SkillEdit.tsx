import { useState } from "react";
import BackToTab from "../../components/BackToTab";
import { ColorPicker } from "antd";
import Icons from "../../components/Icons";
import { Color } from "antd/es/color-picker";
import { editSkill } from "../../api/firebase";
import { ISkillProps } from "../../interfaces/interfaces";

export default function SkillEdit() {
  const [skillName, setSkillName] = useState("");
  const [color, setColor] = useState("#1677ff");
  const [iconName, setIconName] = useState("");
  const [iconLib, setIconLib] = useState("default");
  const [loadingAction, setLoadingAction] = useState(false);
  const [dbName, setDbName] = useState("skills");

  const handleSelectDbName = (dbName: string) => {
    setDbName(dbName);
  }

  const handleEditSkill = async ({ skillName, iconName, iconLib, color, dbName }: ISkillProps) => {
    try {
      setLoadingAction(true);
      const response = await editSkill({ skillName, iconName, iconLib, color, dbName });
      setLoadingAction(false);
      setColor("")
      setSkillName("");
      setIconName("");
      setIconLib("");
      alert("Skill edited successfully");
      console.log("Created skill:", response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <BackToTab />

      <div className="shadow-xl border border-gray-100 rounded-lg px-6 py-8 bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Edit Skills Section</h2>
        <div>
          <div className="bg-gray-500/20 inline-block p-1.5 rounded-sm mb-5">
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <div className={`text-sm px-2 py-1 rounded-sm transition-all duration-200 ${dbName === 'skills' && 'bg-white'}`} onClick={() => handleSelectDbName('skills')}>Skills</div>
              <div className={`text-sm px-2 py-1 rounded-sm transition-all duration-200 ${dbName === 'orther-skills' && 'bg-white'}`} onClick={() => handleSelectDbName('orther-skills')}>Orther</div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
              <input
                type="text"
                id="name"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
              />
            </div>


            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Icon Name</label>
              <input
                type="text"
                id="name"
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="iconName" className="block text-sm font-medium text-gray-700 mb-1">Icon Library</label>
              <select
                id="iconName"
                value={iconLib}
                onChange={(e) => setIconLib(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
              >
                <option value="">-- Select an icon library --</option>
                <option value="fa">FaIcons</option>
                <option value="si">SiIcons</option>
                <option value="bi">BiIcons</option>
                <option value="ri">RiIcons</option>
                <option value="tb">TbIcons</option>
                <option value="gi">GiIcons</option>
              </select>
            </div>


            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <ColorPicker
                defaultValue="#1677ff"
                value={color}
                onChange={(color: Color) => setColor(color.toHexString())}
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 flex items-center justify-center">
            <div className="dark:bg-gray-500/10 bg-gray-100 rounded-lg flex items-center justify-center gap-2 px-3 py-2 shadow-md transition-all duration-200">
              <p className="text-lg" style={{ color: color }}><Icons lib={iconLib} name={iconName} /></p>
              <p className="text-lg dark:text-gray-400 transition-all duration-200">{skillName}</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => handleEditSkill({ skillName, iconName, iconLib, color, dbName })}
            >
              {loadingAction ? <div className="w-5 h-5 border-[3px] rounded-full border-white border-t-[#16a24a] animate-spin"></div> : 'Save'}
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
