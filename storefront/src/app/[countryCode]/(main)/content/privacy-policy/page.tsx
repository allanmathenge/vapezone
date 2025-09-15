import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans text-gray-800">
      {/* Header Section */}
      <div className="text-center mb-10 border-b border-gray-200 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm">Last Updated: May 29, 2025</p>
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <p className="text-green-700 font-medium">
            At Vapezone Kenya, we committed to protecting your privacy and ensuring transparency about how we handle your personal information.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
            Introduction
          </h2>
          <p className="mb-3">Welcome to <span className="font-semibold">Vapezone Kenya</span>. We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit our website, make a purchase, or interact with us.</p>
          <p className="mb-3">We operate in compliance with the Kenyan Data Protection Act, 2019, and the regulations set by the Office of the Data Protection Commissioner (ODPC).</p>
          <p>By using our Site and services, you consent to the practices described in this policy.</p>
        </section>

        {/* Information We Collect */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
            Information We Collect
          </h2>
          <p className="mb-4">We collect information that you provide directly to us and information about your use of our Site.</p>
          
          <div className="mb-5">
            <h3 className="text-lg font-medium text-gray-800 mb-2">A. Information You Provide to Us:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Personal Identifiers:</span> Name, email address, phone number, shipping address, and age/date of birth for age verification.</li>
              <li><span className="font-medium">Order Information:</span> Details of products you purchase, transaction history, and customer service communications.</li>
              <li><span className="font-medium">Payment Information:</span> We use trusted third-party payment processors (e.g., M-Pesa, credit card processors). We do not store your full payment details on our servers.</li>
              <li><span className="font-medium">Account Information:</span> If you create an account, we collect an email, username and password.</li>
              <li><span className="font-medium">Communications:</span> Records of correspondence if you contact us via email, phone, or social media.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">B. Information Collected Automatically:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Device and Usage Data:</span> IP address, browser type, device information, pages you visit, time spent on pages, and other diagnostic data collected using cookies.</li>
              <li><span className="font-medium">Location Data:</span> We may derive a general geographic location from your IP address to ensure we can ship to your area and comply with Kenyan regulations.</li>
            </ul>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
            How We Use Your Information
          </h2>
          <p className="mb-4">We use your personal data for the following purposes, relying on the legal bases of performance of a contract, consent, and legitimate interests:</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">•</span>
              <span><span className="font-medium">To Process and Fulfill Your Orders:</span> To complete your purchase, arrange shipping, and send you invoices and order confirmations. <span className="text-green-600 text-sm">(Performance of a contract)</span></span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">•</span>
              <span><span className="font-medium">Age Verification:</span> To verify that you are <span className="font-semibold">18 years of age or older</span>, as required by law to purchase vaping products. <span className="text-green-600 text-sm">(Legal obligation and legitimate interest)</span></span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">•</span>
              <span><span className="font-medium">Customer Service:</span> To respond to your inquiries, comments, or complaints. <span className="text-green-600 text-sm">(Legitimate interest)</span></span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">•</span>
              <span><span className="font-medium">Marketing and Promotions (with your consent):</span> If you opt-in, we will send you information about new products, special offers, and updates. You can opt-out at any time. <span className="text-green-600 text-sm">(Consent)</span></span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">•</span>
              <span><span className="font-medium">Improving Our Site and Services:</span> To analyze trends, administer the site, and understand how users interact with our content. <span className="text-green-600 text-sm">(Legitimate interest)</span></span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">•</span>
              <span><span className="font-medium">Security and Fraud Prevention:</span> To protect our business and our customers from fraudulent transactions and other illegal activities. <span className="text-green-600 text-sm">(Legitimate interest and legal obligation)</span></span>
            </li>
          </ul>
        </section>

        {/* Data Protection Rights */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">6</span>
            Your Data Protection Rights
          </h2>
          <p className="mb-4">Under the Data Protection Act, 2019, you have the following rights regarding your personal data:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Right of Access</h3>
              <p className="text-sm">You can request a copy of the personal data we hold about you.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Right to Rectification</h3>
              <p className="text-sm">You can request that we correct any inaccurate or incomplete data.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Right to Erasure</h3>
              <p className="text-sm">You can request that we delete your personal data, subject to certain legal limitations.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Right to Restrict Processing</h3>
              <p className="text-sm">You can request that we suspend the processing of your personal data.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Right to Data Portability</h3>
              <p className="text-sm">You can request a copy of your data in a structured, machine-readable format.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Right to Object</h3>
              <p className="text-sm">You can object to the processing of your data based on our legitimate interests.</p>
            </div>
          </div>
          <p className="mt-4">To exercise any of these rights, please contact us using the details in Section 10.</p>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">10</span>
            Contact Us
          </h2>
          <p className="mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer:</p>
          <div className="bg-gray-50 p-5 rounded-lg">
            <div className="flex items-start mb-3">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">→</span>
              <div>
                <span className="font-medium">Email:</span> vapezonekenya@gmail.com
              </div>
            </div>
            <div className="flex items-start mb-3">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">→</span>
              <div>
                <span className="font-medium">Postal Address:</span> 00100 Accra Road, Now Raila Ondinga Way, Nairobi. White Angle Building.
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">→</span>
              <div>
                <span className="font-medium">Phone:</span> 0798769535
              </div>
            </div>
          </div>
          <p className="mt-4">If you are not satisfied with our response, you have the right to lodge a complaint with the <span className="font-semibold">Office of the Data Protection Commissioner (ODPC)</span> of Kenya.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;