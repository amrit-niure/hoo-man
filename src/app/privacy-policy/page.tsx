export const metadata = {
    title: 'Privacy Policy - Hoo-Man HR & Payroll Management System',
    description: 'Hoo-Man\'s Privacy Policy outlining how we collect, use, and protect your personal and employment-related information.',
  };
  
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy container mx-auto px-4 py-8 max-w-4xl">

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
        <p className="text-lg text-gray-600"><strong>Effective Date:</strong>04/17/2025</p>
        <p className="text-lg text-gray-600"><strong>Project Name:</strong> Hoo-Man – HR & Payroll Management System</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          We value your privacy at Hoo-Man. When you use our HR and payroll management platform, this Privacy Policy explains how we collect, use, store, and protect your personal information. You consent to the policies outlined in this policy by using Hoo-Man.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect the following types of personal and employment-related information:
        </p>
        <div className="ml-6">
          <h3 className="text-xl font-medium text-gray-800 mb-2">From Employees:</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Full Name, Date of Birth, Contact Details</li>
            <li>Email Address and Password (hashed)</li>
            <li>Employment Details (position, department, salary)</li>
            <li>Attendance Records (clock-in, clock-out times)</li>
            <li>Leave Requests and Status</li>
            <li>Payslip Information (pay period, gross/net amounts, deductions)</li>
            <li>Onboarding Documents (if provided)</li>
          </ul>
          <h3 className="text-xl font-medium text-gray-800 mb-2">From Employers/Admins:</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Company Profile Information</li>
            <li>Job Postings and Applicant Data</li>
            <li>Payroll Preferences and Payment Details</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use your data to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Manage employee attendance, leaves, and payroll processing</li>
          <li>Generate and distribute digital payslips</li>
          <li>Facilitate secure salary payments via Stripe</li>
          <li>Enable user onboarding and job application processing</li>
          <li>Maintain compliance with employment and financial regulations</li>
          <li>Allow employees to access self-service features (leave application, profile updates, etc.)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Sharing</h2>
        <p className="text-gray-700 mb-4">
          We do not sell your personal data.
          We may share data with trusted third parties only when necessary:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Stripe for secure payment processing</li>
          <li>Better-Auth for authentication and user login security</li>
          <li>Hosting providers or external APIs for platform operation</li>
          <li>Legal or regulatory bodies, when required by law</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Security Measures</h2>
        <p className="text-gray-700 mb-4">
          We use the latest security practices to protect your information:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Passwords are securely hashed</li>
          <li>Data is encrypted in transit (HTTPS) and at rest (where supported)</li>
          <li>Role-based access control ensures only authorized users access sensitive data</li>
          <li>Regular backups to prevent data loss</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
        <p className="text-gray-700 mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Access or update your personal information</li>
          <li>Request data deletion (subject to legal requirements)</li>
          <li>Withdraw consent for data processing</li>
          <li>File a complaint with your local data protection authority</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies and Tracking</h2>
        <p className="text-gray-700 mb-4">
          We use cookies to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li>Maintain user sessions</li>
          <li>Improve performance and user experience</li>
          <li>Track application usage (for analytics)</li>
        </ul>
        <p className="text-gray-700">
          You may control cookies through your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Data Retention</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Employee records are retained for the duration of employment and a set period after termination (as per business/legal needs).</li>
          <li>Payroll and attendance records are retained, in accordance with employment and tax laws.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Children's Privacy</h2>
        <p className="text-gray-700">
          This platform is intended for authorized users only (HR staff, employers, and employees) and is not designed for children under 16.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to this Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy occasionally. You will be notified of major changes through in-app announcements or email.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Us</h2>
        <p className="text-gray-700">
          For privacy questions or concerns, please contact:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
          <li>📧 Email: support@hooman.com.au</li>
          <li>🌐 Website: https://hoo-man.vercel.app</li>
          <li>📍 Company Address: 545 Kent Street, NSW Sydney, 2000</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;