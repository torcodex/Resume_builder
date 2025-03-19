import React, { useState } from 'react';
import PreviewModal from '../components/PreviewModal';

const templates = [
  {
    id: 1,
    name: 'Andree Rocher',
    description: 'Professional and clean layout with clear section hierarchy',
    image: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    style: 'bg-white'
  },
  {
    id: 2,
    name: 'Chanchal Sharma',
    description: 'Minimalist design with elegant typography',
    image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    style: 'bg-white'
  },
  {
    id: 3,
    name: 'Danielle Brasseur',
    description: 'Modern template with a soft mint accent',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    style: 'bg-[#e8f3f1]'
  },
  {
    id: 4,
    name: 'Caleb Foster',
    description: 'Bold and impactful with red accents',
    image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    style: 'bg-white'
  },
  {
    id: 5,
    name: 'Michelle Wattz',
    description: 'Classic and sophisticated design',
    image: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    style: 'bg-white'
  }
];

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (template: any) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleSave = (content: any) => {
    console.log('Saving template with content:', content);
    // Here you would typically save the content to your backend
    setIsPreviewOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Select Your Template</h1>
        <p className="text-xl text-white/90">
          Choose from our collection of professional, ATS-friendly resume templates
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <div className={`aspect-[3/4] ${template.style} p-8 relative`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <div className="h-full flex items-center justify-center">
                <img
                  src={template.image}
                  alt={template.name}
                  className="max-h-full w-auto object-contain shadow-lg rounded-lg"
                />
              </div>
            </div>
            <div className="p-6 bg-white">
              <div className="flex space-x-3">
                <button 
                  onClick={() => handlePreview(template)}
                  className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
                >
                  Use Template
                </button>
                <button 
                  onClick={() => handlePreview(template)}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={selectedTemplate || templates[0]}
        onSave={handleSave}
      />
    </div>
  );
};

export default Templates;