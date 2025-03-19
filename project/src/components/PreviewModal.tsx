import React, { useRef } from 'react';
import { X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun } from 'docx';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    name: string;
    content?: {
      name: string;
      title: string;
      email: string;
      phone: string;
      summary: string;
      experience: string[];
      education: string[];
      skills: string[];
    };
  };
  onSave: (content: any) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, template, onSave }) => {
  const [content, setContent] = React.useState({
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    summary: 'Experienced software engineer with a passion for building scalable applications.',
    experience: [
      'Senior Software Engineer at Tech Corp (2020-Present)',
      'Software Developer at StartUp Inc (2018-2020)'
    ],
    education: [
      'MS in Computer Science, State University (2018)',
      'BS in Computer Science, Tech Institute (2016)'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS']
  });

  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleChange = (field: string, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const exportAsHTML = () => {
    if (!resumeRef.current) return;
    
    const htmlContent = resumeRef.current.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${content.name.replace(/\s+/g, '_')}_resume.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportAsPNG = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current);
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${content.name.replace(/\s+/g, '_')}_resume.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsWord = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: content.name, bold: true, size: 32 })],
          }),
          new Paragraph({
            children: [new TextRun({ text: content.title, size: 24 })],
          }),
          new Paragraph({
            children: [new TextRun({ text: `${content.email} | ${content.phone}`, size: 20 })],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Summary', bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [new TextRun({ text: content.summary })],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Experience', bold: true, size: 24 })],
          }),
          ...content.experience.map(exp => new Paragraph({
            children: [new TextRun({ text: exp })],
          })),
          new Paragraph({
            children: [new TextRun({ text: 'Education', bold: true, size: 24 })],
          }),
          ...content.education.map(edu => new Paragraph({
            children: [new TextRun({ text: edu })],
          })),
          new Paragraph({
            children: [new TextRun({ text: 'Skills', bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [new TextRun({ text: content.skills.join(', ') })],
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${content.name.replace(/\s+/g, '_')}_resume.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] flex overflow-hidden">
        {/* Editor Panel */}
        <div className="w-1/3 bg-gray-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Edit Resume</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={content.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={content.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={content.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea
                value={content.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              {content.experience.map((exp, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={exp}
                    onChange={(e) => {
                      const newExp = [...content.experience];
                      newExp[index] = e.target.value;
                      handleChange('experience', newExp);
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              ))}
              <button
                onClick={() => handleChange('experience', [...content.experience, ''])}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                + Add Experience
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              {content.education.map((edu, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={edu}
                    onChange={(e) => {
                      const newEdu = [...content.education];
                      newEdu[index] = e.target.value;
                      handleChange('education', newEdu);
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              ))}
              <button
                onClick={() => handleChange('education', [...content.education, ''])}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                + Add Education
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <input
                type="text"
                value={content.skills.join(', ')}
                onChange={(e) => handleChange('skills', e.target.value.split(', '))}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Separate skills with commas"
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => onSave(content)}
              className="w-full px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
            >
              Save Changes
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={exportAsHTML}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                HTML
              </button>
              <button
                onClick={exportAsWord}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Word
              </button>
              <button
                onClick={exportAsPNG}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                PNG
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 p-8 overflow-y-auto bg-gray-100">
          <div ref={resumeRef} className="bg-white shadow-lg rounded-lg p-8 max-w-[800px] mx-auto">
            <h1 className="text-3xl font-bold mb-2">{content.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{content.title}</p>
            
            <div className="flex gap-4 text-sm text-gray-600 mb-6">
              <span>{content.email}</span>
              <span>{content.phone}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-gray-700">{content.summary}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Experience</h2>
              <ul className="list-disc list-inside space-y-2">
                {content.experience.map((exp, index) => (
                  <li key={index} className="text-gray-700">{exp}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              <ul className="list-disc list-inside space-y-2">
                {content.education.map((edu, index) => (
                  <li key={index} className="text-gray-700">{edu}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {content.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;