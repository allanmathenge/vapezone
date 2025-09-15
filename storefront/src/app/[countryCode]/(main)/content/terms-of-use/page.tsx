"use client"

import React, { useState } from 'react';

const Terms_Of_Use = () => {
  const [activeSection, setActiveSection] = useState(null);
  
  const toggleSection = (section: any) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Terms of Use & Service Agreement</h1>
        <p className="text-gray-600">Last Updated: May 29, 2025</p>
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Website: https://www.vapezone.co.ke
          </span>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Table of Contents - Sticky on desktop */}
        <aside className="md:w-1/4">
          <div className="md:sticky md:top-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Contents</h2>
            <nav className="space-y-2">
              {[
                'Acceptance of Terms',
                'Eligibility',
                'Product Information',
                'User Account',
                'Orders & Pricing',
                'Shipping',
                'Returns',
                'Intellectual Property',
                'Liability',
                'Indemnification',
                'Governing Law',
                'Changes to Terms',
                'Contact'
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => toggleSection(index)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === index
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <article className="md:w-3/4 bg-white rounded-xl shadow-sm p-6">
          {/* 1. Acceptance of Terms */}
          <section id="acceptance" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to Vapezone Kenya. By accessing, browsing, or using our website located at 
              <a href="https://www.vapezone.co.ke" className="text-blue-600 hover:underline mx-1">Vapezone Kenya</a> 
              and purchasing products from us, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use, 
              our Privacy Policy, and our Returns & Refunds Policy, which are incorporated herein by reference.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
              <p className="text-yellow-700 font-medium">If you do not agree to all these Terms, you must not access or use the Site.</p>
            </div>
          </section>

          {/* 2. Eligibility */}
          <section id="eligibility" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
              Eligibility: Age and Location Verification
            </h2>
            
            <h3 className="font-medium text-gray-700 mb-2">2.1. Age Restriction.</h3>
            <p className="text-gray-700 mb-4">
              The sale of vaping products is strictly age-restricted. By using this Site and purchasing our Products, you represent and warrant that:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
              <li>You are at least <span className="font-semibold">18 (eighteen) years of age</span>.</li>
              <li>You are of legal age to purchase vaping products in your specific location within the Republic of Kenya.</li>
              <li>You will not provide our Products to any person under the legal age.</li>
            </ul>
            
            <h3 className="font-medium text-gray-700 mb-2">2.2. Verification.</h3>
            <p className="text-gray-700 mb-4">
              We reserve the right to verify your age at any time, including upon delivery. Verification methods may include requesting a government-issued photo ID (National ID, Passport). 
              Failure to provide valid age verification will result in order cancellation and a refund, minus any processing fees.
            </p>
            
            <h3 className="font-medium text-gray-700 mb-2">2.3. Geographic Restrictions.</h3>
            <p className="text-gray-700">
              We only sell and ship Products to addresses within the Republic of Kenya. We do not ship internationally. By placing an order, you confirm the delivery address is within Kenya.
            </p>
          </section>

          {/* 3. Product Information */}
          <section id="products" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
              Product Information and Health Disclaimer
            </h2>
            
            <h3 className="font-medium text-gray-700 mb-2">3.1. Product Purpose.</h3>
            <p className="text-gray-700 mb-4">
              Our Products are intended for use by adult smokers and vapers as an alternative to traditional tobacco cigarettes. 
              They are <span className="font-semibold">not</span> marketed as smoking cessation devices.
            </p>
            
            <h3 className="font-medium text-gray-700 mb-2">3.2. Health Warning.</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-red-800">WARNING:</p>
                  <p className="text-red-700">Vaping products contain nicotine, a highly addictive chemical. Nicotine is not risk-free and is addictive.</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Our products are <span className="font-semibold">NOT</span> recommended for use by non-smokers, persons under the age of 18, pregnant or breastfeeding women, 
              or persons with underlying health conditions (including but not limited to heart disease, high blood pressure, diabetes, or respiratory conditions).
            </p>
            <p className="text-gray-700 mb-4">
              You should consult with a healthcare professional before using vaping products, especially if you have any pre-existing health conditions.
            </p>
            
            <h3 className="font-medium text-gray-700 mb-2">3.3. Accuracy of Information.</h3>
            <p className="text-gray-700">
              While we strive to provide accurate descriptions, images, and specifications for our Products, we do not warrant that such information is entirely accurate, 
              complete, reliable, current, or error-free. Product colours may vary slightly due to photography lighting and individual monitor settings.
            </p>
          </section>

          {/* 4. User Account */}
          <section id="account" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
              User Account and Conduct
            </h2>
            
            <h3 className="font-medium text-gray-700 mb-2">4.1. Account Creation.</h3>
            <p className="text-gray-700 mb-4">
              You may be required to create an account to place an order. You are responsible for maintaining the confidentiality of your account credentials 
              and for all activities that occur under your account.
            </p>
            
            <h3 className="font-medium text-gray-700 mb-2">4.2. Prohibited Conduct.</h3>
            <p className="text-gray-700 mb-2">You agree not to:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Use the Site for any illegal purpose or in violation of any local, national, or international law or regulation.</li>
              <li>Provide false, inaccurate, or misleading information.</li>
              <li>Attempt to circumvent our age verification processes.</li>
              <li>Upload or transmit any malicious code, viruses, or other harmful software.</li>
              <li>Use the Site in any way that could damage, disable, overburden, or impair the Site.</li>
            </ul>
          </section>

          {/* Continue with other sections following the same pattern */}

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">For any questions about these Terms of Use, please contact us at:</p>
            <div className="space-y-2">
              <p className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>vapezonekenya@gmail.com</span>
              </p>
              <p className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Postal Address: 00100 Accra Road, Now Raila Ondinga Way, Nairobi. White Angle Building.</span>
              </p>
              <p className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0798769535</span>
              </p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default Terms_Of_Use;