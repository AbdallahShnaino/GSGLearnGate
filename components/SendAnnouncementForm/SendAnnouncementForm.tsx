
export default function SendAnnouncementForm() {
  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-10"> 
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter Course Title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              {/* حيكون فيها الكورسيس الموجودين في الداتابيس ، في السيليكت بظهر اسم الكورس بس الي بنبعث في الفاليو هو الاي دي تبعه*/}
              <div className="space-y-2">
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="react">React.js</option>
                  <option value="node">Node.js</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Course Description"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/3 px-4 py-2 text-white bg-[#FFA41F] rounded-md shadow-sm text-sm font-medium hover:bg-orange-500 transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}