export default function CompaniesPage() {
    // Structure strictly adhering to PDF Page 8
    
    const universityCollabs = [
      { name: "UFAR", logo: "UFAR", desc: "Teaching advanced Computer Science and Data Analysis courses.", type: "Academic Affiliation", timeline: "2018 - Present" },
      { name: "Polytechnic University (NPUA)", logo: "NPUA", desc: "Collaborating on engineering research and AI curriculum development.", type: "Research & Teaching", timeline: "2015 - Present" }
    ];
  
    const trainingCenters = [
      { name: "ARDY Academy", logo: "ARDY", desc: "Delivering intensive Bootcamps on Machine Learning and Python.", type: "Training Partner", timeline: "2021 - Present" },
      { name: "Picsart Academy", logo: "Picsart", desc: "Conducting specialized workshops on Computer Vision and Generative AI.", type: "Corporate Training", timeline: "2022 - Present" },
      { name: "Microsoft Academy", logo: "Microsoft", desc: "Partnering for official Microsoft Azure AI certification paths.", type: "Educational Partner", timeline: "2020 - Present" }
    ];
  
    const companiesAndNGOs = [
      { name: "Luseen Mobile", logo: "Luseen", desc: "Co-Founder and CTO leading AI integrations in mobile apps.", type: "Corporate (Co-Founder)", timeline: "2019 - Present" },
      { name: "FAST Foundation", logo: "FAST", desc: "Advising on national AI adoption strategies and tech community building.", type: "NGO Advisory", timeline: "2021 - Present" },
      { name: "SASTIC", logo: "SASTIC", desc: "Strategic collaboration for advancing tech education in Armenia.", type: "NGO Partnership", timeline: "2023 - Present" }
    ];
  
    // Helper component to render the organization cards
    const OrgSection = ({ title, data }: { title: string, data: any[] }) => (
      <div className="mb-16">
        <h2 className="text-2xl font-extrabold text-deepBlue mb-8 border-b-2 border-neutralLight pb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((org, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                {/* Logo Placeholder (PDF Page 8) */}
                <div className="w-16 h-16 bg-gradient-to-br from-neutralLight to-gray-200 rounded-xl flex items-center justify-center font-bold text-aiPurple border border-gray-300">
                  {org.logo}
                </div>
                <div>
                  <h3 className="font-bold text-deepBlue text-lg">{org.name}</h3>
                  <span className="text-xs font-bold text-white bg-cyan px-2 py-1 rounded uppercase tracking-wider">{org.type}</span>
                </div>
              </div>
              <p className="text-neutralDark text-sm mb-4 leading-relaxed">{org.desc}</p>
              <div className="flex items-center text-xs font-semibold text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {org.timeline}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  
    return (
      <div className="w-full bg-white min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-deepBlue mb-4">Companies & Organizations</h1>
            <p className="text-lg text-neutralDark max-w-2xl mx-auto">
              A dedicated overview of academic affiliations, training partnerships, and corporate collaborations.
            </p>
          </div>
  
          {/* SECTIONS BASED ON PDF PAGE 8 CATEGORIES */}
          <OrgSection title="Universities" data={universityCollabs} />
          <OrgSection title="Training Centers" data={trainingCenters} />
          <OrgSection title="Technology Companies, NGOs & Foundations" data={companiesAndNGOs} />
  
        </div>
      </div>
    );
  }