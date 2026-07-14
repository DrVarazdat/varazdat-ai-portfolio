export default function AdminDashboard() {
    return (
      <div>
        <h1 className="text-3xl font-extrabold text-deepBlue mb-8">System Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Total Courses</h3>
            <p className="text-4xl font-black text-deepBlue">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Total Events</h3>
            <p className="text-4xl font-black text-deepBlue">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Active Articles</h3>
            <p className="text-4xl font-black text-deepBlue">0</p>
          </div>
        </div>
  
        <div className="mt-12 bg-gradient-to-r from-aiPurple/10 to-cyan/10 p-8 rounded-3xl border border-aiPurple/20">
          <h2 className="text-2xl font-bold text-deepBlue mb-2">Welcome to the Varazdat AI CMS</h2>
          <p className="text-neutralDark max-w-2xl leading-relaxed">
            From here, you can manage every aspect of your website without writing code. 
            Use the <strong>AI Auto-Manager</strong> to instantly upload PDFs of your upcoming lectures, and the AI will extract the data and generate the website content automatically.
          </p>
        </div>
      </div>
    );
  }
  