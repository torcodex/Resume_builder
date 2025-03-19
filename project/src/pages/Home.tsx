import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-5xl font-bold text-white leading-tight">
            ATS Friendly Resume Builder
          </h1>
          <p className="text-xl text-white/90">
            The resume template builder that defines and secures your future. Making your dream job a reality with
            industrial standards and a massive library of templates.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/templates"
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-teal-600 hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              <FileText className="mr-2" />
              Build My Resume
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Resume Templates"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-semibold text-gray-800">ATS Optimized</p>
              <p className="text-xs text-gray-600">Guaranteed to pass ATS scans</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;