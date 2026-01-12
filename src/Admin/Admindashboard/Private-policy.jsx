import React from 'react'

const Privatepolicy = () => {
  return (
    <div className="flex justify-center px-10 mt-5 mb-5">
      <div className="w-full  bg-white shadow-lg rounded p-5">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Privacy Policy</h1>

        {/* Scrollable content */}
        <div className="h-[600px] overflow-y-scroll pr-4 space-y-6 text-gray-700 leading-relaxed">
          <section>
            <p>
              Pixelgenix ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, and
              safeguard your personal information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal details: name, email address, phone number, location.</li>
              <li>Profile information: resume, work experience, skills, education.</li>
              <li>Usage data: IP address, browser type, pages visited, login activity.</li>
              <li>Application history: jobs applied to, employers contacted.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Create and manage your account.</li>
              <li>Display your profile to employers when you apply for jobs.</li>
              <li>Improve our website, services, and user experience.</li>
              <li>Send relevant job alerts, updates, and notifications.</li>
              <li>Ensure security, prevent fraud, and comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. Sharing of Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>With employers/recruiters when you apply for a job.</li>
              <li>With service providers who help us operate the website (hosting, analytics, email).</li>
              <li>When required by law or to protect our rights, safety, or other users.</li>
              <li>We do not sell your personal data to third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">4. Data Security</h2>
            <p>
              We use industry-standard measures (encryption, secure servers, access
              controls) to protect your personal data. However, no online system is
              100% secure, and we cannot guarantee absolute protection.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">5. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Accessing and updating your personal data.</li>
              <li>Requesting deletion of your account and data.</li>
              <li>Opting out of marketing emails and notifications.</li>
              <li>Requesting a copy of your stored information.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">6. Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance user experience,
              remember login preferences, and analyze website performance. You can
              manage cookies through your browser settings.
            </p>
          </section>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Last updated: September 2025
        </div>
      </div>
    </div>
  )
}

export default Privatepolicy
