import { useState } from "react";
import BackToTab from "../../components/BackToTab";
import { addTitleSection, deleteTitleSection, getTitleSection, updateTitleSection } from "../../api/firebase";
import { ITitleSectionProps } from "../../interfaces/interfaces";
import { Popconfirm, Table } from "antd";
import useFetch from "../../hooks/useFetch";
import { PencilLine, Trash2 } from "lucide-react";

export default function TitleSectionEdit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sectionKey, setSectionKey] = useState("");
  const [id, setId] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [editAction, setEditAction] = useState(false);

  const { data: TitleSectionData, refetch: RefetchData } = useFetch(getTitleSection)

  const handleAddTitleSection = async ({ title, description, sectionKey }: ITitleSectionProps) => {
    setLoadingAction(true);
    try {
      await addTitleSection({ title, description, sectionKey })
      setTitle("")
      setDescription("")
      setSectionKey("");
      RefetchData()
      setLoadingAction(false)
      alert("Section added successfully");
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditAction = async (item: ITitleSectionProps) => {
    setEditAction(true)
    setId(item.id as string)
    setTitle(item.title)
    setDescription(item.description)
    setSectionKey(item.sectionKey)
  }

  const handleDeleteAction = async (item: ITitleSectionProps) => {
    setId(item.id as string)
  }

  const handleUpdateTitleSection = async ({ id, title, description, sectionKey }: ITitleSectionProps) => {
    setLoadingAction(true);
    try {
      await updateTitleSection({ id, title, description, sectionKey })
      alert("Section updated successfully");
      RefetchData()
      setEditAction(false)
      setTitle("")
      setDescription("")
      setSectionKey("");
      setLoadingAction(false)
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteTitle = async (id: string) => {
    try {
      await deleteTitleSection(id)
      alert("Section deleted successfully");
      RefetchData()
    } catch (error) {
      console.error(error);
    }
  }

  interface DataType {
    key: string;
    title: string;
    description: string | number;
    sectionKey: string;
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "Section key",
      dataIndex: "sectionKey",
      key: "sectionKey",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const data: DataType[] = (TitleSectionData?.map((item) => {
    const titleSection = item as ITitleSectionProps;

    return {
      key: item.id, // Using the document ID as the key is more reliable than index
      title: titleSection.title || "",
      description: titleSection.description || "",
      sectionKey: titleSection.sectionKey || "",
      action: (
        <div className="flex items-center justify-center gap-2">
          <button
            className="px-3 py-1 bg-blue-600 rounded-md text-white"
            onClick={() => { handleEditAction(titleSection) }}
          >
            <PencilLine size={15} />
          </button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteTitle(id)}
            onCancel={() => console.log('Cancel')}
            okText="Yes"
            cancelText="No"
          >
            <button className="px-3 py-1 bg-rose-600 rounded-md text-white" onClick={() => handleDeleteAction(titleSection)}>
              <Trash2 size={15} />
            </button>
          </Popconfirm>
        </div>
      )
    };
  }) || []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <BackToTab />

      <div className="shadow-xl border border-gray-100 rounded-lg px-6 py-8 bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Edit Title Section</h2>

        <div className="my-3">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My Skills"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="bio"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description about title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Section key</label>
            <input
              type="text"
              id="title"
              value={sectionKey}
              onChange={(e) => setSectionKey(e.target.value)}
              placeholder="sectionKey"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
            />
          </div>

          <div className="pt-4">
            <div className="flex justify-end">
              {editAction ? (
                <div className="flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => handleUpdateTitleSection({ id, title, description, sectionKey })}
                  >
                    {loadingAction ? <div className="w-5 h-5 border-[3px] rounded-full border-white border-t-[#16a24a] animate-spin"></div> : 'Update'}
                  </button>

                  <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2"
                    onClick={() => { setEditAction(false), setTitle(''), setDescription(''), setSectionKey('') }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => handleAddTitleSection({ title, description, sectionKey })}
                >
                  {loadingAction ? <div className="w-5 h-5 border-[3px] rounded-full border-white border-t-[#16a24a] animate-spin"></div> : 'Save'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
