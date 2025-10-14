import React from 'react'

const Termscondition = () => {
  return (
    <div className="flex justify-center px-10  min-h-screen  p-6">
      <div className="w-full bg-white shadow-lg rounded p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Terms & Conditions
        </h1>

        {/* Scrollable Content */}
        <div className="h-[600px] overflow-y-scroll pr-4 space-y-6 text-gray-700 leading-relaxed">
          <section>
            <p>
              Welcome to Pixelgenix. By accessing or using our website, services,
              and job portal, you agree to comply with and be bound by these Terms
              & Conditions. Please read them carefully before using our platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">1. Eligibility</h2>
            <p>
              You must be at least 18 years old or the age of majority in your
              jurisdiction to use our services. By registering, you confirm that
              you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">2. Account Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>You agree to provide accurate and updated information.</li>
              <li>You are responsible for all activities under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. Use of Services</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the platform only for lawful purposes (e.g., job searching, recruiting).</li>
              <li>Do not misuse, hack, or disrupt the platform in any way.</li>
              <li>Do not post false, misleading, or fraudulent job applications or job listings.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">4. Content Ownership</h2>
            <p>
              All content, branding, and intellectual property on Pixelgenix remain
              the property of Pixelgenix unless otherwise stated. You may not copy,
              distribute, or use our content without permission.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">5. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites or services.
              We are not responsible for the content, policies, or practices of
              third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">6. Limitation of Liability</h2>
            <p>
              Pixelgenix will not be held liable for any damages arising from your
              use of the platform, including loss of data, employment, or business
              opportunities.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you
              violate these Terms & Conditions or misuse our services.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">8. Changes to Terms</h2>
            <p>
              Pixelgenix may update these Terms & Conditions from time to time. We
              encourage you to review this page regularly for any changes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms & Conditions, please
              contact us at <span className="text-blue-600">support@pixelgenix.com</span>.
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

export default Termscondition
