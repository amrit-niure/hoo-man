import React from 'react';
export const metadata = {
    title: 'Terms and Conditions - Hoo-Man HR & Payroll Management System',
    description: 'Terms and Conditions governing the use of Hoo-Man HR & Payroll Management System.',
  };

  
const TermsAndConditions = () => {
  return (
    <div className="terms-conditions container mx-auto px-4 py-8 max-w-4xl">

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms and Conditions</h1>
        <p className="text-lg text-gray-600"><strong>TO:</strong> Users of Hoo-Man Platform</p>
        <p className="text-lg text-gray-600"><strong>Effective Date:</strong> 04/17/2025</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          Hoo-Man provides HR and payroll management solutions for organizations to manage
          employee records, leave requests, attendance, and payroll processing. By using the
          platform, you agree to these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Definitions</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Company:</strong> The organization using Hoo-Man.</li>
          <li><strong>User:</strong> An individual authorized to use Hoo-Man (Employee, Admin, HR Staff).</li>
          <li><strong>Employee Data:</strong> Personal information related to employees.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Acceptable Use</h2>
        <p className="text-gray-700 mb-4">
          You may only use the platform for lawful purposes and in accordance with these Terms.
          Access is limited to authorized users registered by the Company.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. User Accounts</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Each user must maintain the security of their login credentials.</li>
          <li>Admins have elevated privileges to manage employee records and payroll.</li>
          <li>Users must promptly notify us of any unauthorized account use.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Privacy</h2>
        <p className="text-gray-700">
          We are committed to protecting your privacy. Our collection and use of personal data are
          governed by our Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. User Responsibilities</h2>
        <p className="text-gray-700 mb-4">
          You agree to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Provide accurate and current information</li>
          <li>Maintain confidentiality of your account credentials</li>
          <li>Use the platform only for its intended business purposes</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Prohibited Activities</h2>
        <p className="text-gray-700 mb-4">
          You agree not to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Engage in any unlawful activities using the platform</li>
          <li>Attempt to gain unauthorized access to the platform</li>
          <li>Share your access credentials with unauthorized individuals</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Intellectual Property</h2>
        <p className="text-gray-700">
          All rights, title, and interest in the Hoo-Man platform, including logos, trademarks, and
          software, are owned by us. You are granted a limited, non-exclusive license to use the
          platform for HR and payroll purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Termination</h2>
        <p className="text-gray-700">
          We reserve the right to suspend or terminate your access if you violate these Terms. Upon
          termination, all rights granted to you will immediately cease.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Disclaimer</h2>
        <p className="text-gray-700">
          Hoo-Man is provided 'as-is' without warranties of any kind. We do not guarantee that the
          platform will be error-free or uninterrupted.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Limitation of Liability</h2>
        <p className="text-gray-700">
          To the fullest extent permitted by law, we will not be liable for any indirect, incidental, or
          consequential damages arising from your use of the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Modifications</h2>
        <p className="text-gray-700">
          We may update these Terms at any time. Continued use of the platform after updates
          means you accept the new Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Governing Law</h2>
        <p className="text-gray-700">
          These Terms are governed by and construed in accordance with the laws of NSW, Australia.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Contact Information</h2>
        <p className="text-gray-700 mb-2">
          For any questions regarding these Terms, please contact us at:
        </p>
        <p className="text-gray-700">
          Email: <a href="mailto:support@hooman.com.au" className="text-blue-600 hover:underline">support@hooman.com.au</a>
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;