export default function Loading() {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-[999] overflow-hidden">
        <div className="w-10 h-10 border-[4px] border-gray-100 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    )
  }