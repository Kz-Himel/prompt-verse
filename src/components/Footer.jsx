import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Marketplace',
      links: ['Explore Prompts', 'Categories', 'Top Creators', 'Latest Prompts'],
    },
    {
      title: 'Company',
      links: ['About Us', 'How It Works', 'Blog', 'Contact'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Refund Policy'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact Us', 'FAQ'],
    },
  ];

  return (
    <footer className="bg-[#0b1329] text-gray-400 font-sans text-sm py-12 px-6 sm:px-12 lg:px-24 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Logo & Description Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              {/* PromptHub Main Hexagon Star Logo SVG */}
              <svg className="w-7 h-7 text-[#5643ff]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <polygon points="12,6.5 13.5,9.5 16.8,9.5 14.2,11.5 15.2,14.8 12,12.8 8.8,14.8 9.8,11.5 7.2,9.5 10.5,9.5" fill="#fff" />
              </svg>
              <span className="text-white font-bold text-lg tracking-wide">PromptVerse</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xs leading-relaxed">
              The #1 marketplace for buying and selling premium AI prompts.
            </p>
            
            {/* Social Icons (All Premium Custom SVGs) */}
            <div className="flex space-x-3 pt-2">
              {/* Twitter / X */}
              <a href="#" aria-label="Twitter" className="p-2 bg-gray-800/40 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center w-8 h-8">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="p-2 bg-gray-800/40 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center w-8 h-8">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="p-2 bg-gray-800/40 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center w-8 h-8">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Pinterest */}
              <a href="#" aria-label="Pinterest" className="p-2 bg-gray-800/40 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center w-8 h-8">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.289 2C6.617 2 2 6.617 2 12.289c0 4.305 2.656 7.992 6.406 9.531-.086-.797-.164-2.016.031-2.89.18-.782 1.148-4.883 1.148-4.883s-.293-.586-.293-1.453c0-1.36.789-2.375 1.766-2.375.836 0 1.242.625 1.242 1.383 0 .844-.539 2.102-.812 3.266-.234.992.492 1.805 1.469 1.805 1.766 0 3.117-1.867 3.117-4.562 0-2.383-1.711-4.055-4.164-4.055-2.836 0-4.5 2.125-4.5 4.32 0 .859.328 1.781.742 2.281a.31.31 0 0 1 .07.297c-.078.328-.258 1.047-.297 1.203-.055.211-.18.258-.422.148-1.57-.727-2.547-3.008-2.547-4.844 0-3.945 2.867-7.57 8.266-7.57 4.344 0 7.719 3.094 7.719 7.227 0 4.312-2.719 7.781-6.492 7.781-1.266 0-2.453-.656-2.859-1.438 0 0-.625 2.383-.781 2.969-.281 1.094-1.047 2.461-1.563 3.297A10.27 10.27 0 0 0 12.29 22.6c5.672 0 10.289-4.617 10.289-10.289C22.6 6.617 17.961 2 12.289 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-white font-semibold text-sm tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-white text-xs sm:text-sm transition-colors duration-200 block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Divider line */}
        <hr className="border-gray-800/60 my-6" />

        {/* Copyright Section */}
        <div className="text-center text-xs text-gray-500">
          © {currentYear} PromptVerse. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
}