import { useEffect, useState } from "react";
import BackToTab from "../../components/BackToTab";
import { editSocial, getSocial } from "../../api/firebase";
import useFetch from "../../hooks/useFetch";

export default function SocialEdit() {
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  const { data: SocialMedia, refetch: refetchSocialMedia } = useFetch(getSocial)


  const handleEditSocialMedia = async () => {
    try {
      setLoadingAction(true)
      await editSocial({ github, linkedin, facebook, instagram })
      setLoadingAction(false)
      refetchSocialMedia()
    } catch (error) {
      setLoadingAction(false)
      console.error(error);
    }
  }

  useEffect(() => {
    if (SocialMedia) {
      setGithub(SocialMedia.github)
      setLinkedin(SocialMedia.linkedin)
      setFacebook(SocialMedia.facebook)
      setInstagram(SocialMedia.instagram)
    }
  }, [SocialMedia])


  return (
    <div className="max-w-4xl mx-auto py-10">
      <BackToTab />

      <div className="shadow-xl border border-gray-100 rounded-lg px-6 py-8 bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Edit Contact Section</h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Github</label>
            <input
              type="text"
              id="name"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="Enter your full github"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Linkedin</label>
            <input
              type="text"
              id="name"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="Enter your full linkedin"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input
              type="text"
              id="name"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="Enter your full facebook"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              type="text"
              id="name"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Enter your full instagram"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
            />
          </div>

          <div className="pt-4">
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleEditSocialMedia}
              >
                {loadingAction ? <div className="w-5 h-5 border-[3px] rounded-full border-white border-t-[#16a24a] animate-spin"></div> : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
