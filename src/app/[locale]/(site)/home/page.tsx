"use client";
import React from 'react';
import { Menu, X, ChevronRight, Database, Upload, Users, Play, Image, Music } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-10 w-auto" src="/api/placeholder/40/40" alt="Tamazight Logo" />
                <span className="ml-2 text-2xl font-bold text-indigo-700">Tamazight Treasures</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Database
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Contribute
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign In
              </button>
            </div>
            <div className="flex items-center sm:hidden">
              <button 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Home
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                About
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Database
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Contribute
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="/api/placeholder/1600/800" alt="Mountains of Kabylie" />
          <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
            Preserving the Rich Heritage of Kabylie
          </h1>
          <p className="mt-6 max-w-xl text-xl text-white drop-shadow-md">
            Discover, explore, and contribute to the largest digital collection of Kabyle cultural treasures.
          </p>
          <div className="mt-10">
            <div className="sm:flex">
              <a href="#explore" className="rounded-md shadow bg-indigo-600 px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-indigo-700">
                Explore Database
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#" className="mt-3 sm:mt-0 sm:ml-3 rounded-md shadow bg-white px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-gray-50">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Tamazight Treasures</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Preserving Our Heritage for Future Generations
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              A comprehensive digital archive of Kabyle cultural artifacts, stories, music, and more.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Database className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Extensive Database</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Access thousands of videos, images, audio recordings, and documents showcasing Kabyle culture.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Community Contributions</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Share your own cultural artifacts and stories to help preserve our collective heritage.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Student-Led Initiative</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Created by students from Kabylie dedicated to preserving our cultural identity.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <ChevronRight className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Educational Resource</h3>
                  <p className="mt-2 text-base text-gray-500">
                    A valuable tool for researchers, students, and anyone interested in Amazigh culture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Preview Section */}
      <div id="explore" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Explore Our Database</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Discover the Riches of Kabyle Culture
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Browse our growing collection of cultural treasures categorized for easy exploration.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Category 1 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src="/api/placeholder/600/400" alt="Video Category" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white opacity-80" />
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Videos</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Historical footage, documentaries, interviews, and more.
                  </p>
                  <div className="mt-4">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Explore Videos <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Category 2 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src="/api/placeholder/600/400" alt="Images Category" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Image className="h-16 w-16 text-white opacity-80" />
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Images</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Photographs, artwork, traditional designs, and historical images.
                  </p>
                  <div className="mt-4">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Explore Images <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Category 3 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src="/api/placeholder/600/400" alt="Audio Category" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Music className="h-16 w-16 text-white opacity-80" />
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Audio</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Traditional music, oral histories, interviews, and spoken word.
                  </p>
                  <div className="mt-4">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Explore Audio <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Help Preserve Our Heritage</span>
            <span className="block">Contribute to Our Collection Today</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-100">
            Share your family's stories, photos, recordings, or documents to help build a comprehensive archive of Kabyle culture.
          </p>
          <a href="#" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
            Contribute Now
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <img className="h-10 w-auto" src="/api/placeholder/40/40" alt="Tamazight Logo" />
                <span className="ml-2 text-2xl font-bold text-white">Tamazight Treasures</span>
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Preserving and celebrating the cultural heritage of Kabylie for future generations.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Database</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Contribute</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
              <p className="mt-4 text-base text-gray-300">
                Have questions or suggestions? Reach out to our team.
              </p>
              <p className="mt-4 text-base text-gray-300">
                Email: contact@tamazighttreasures.org
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2025 Tamazight Treasures. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;