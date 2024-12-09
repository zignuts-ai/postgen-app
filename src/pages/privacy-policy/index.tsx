import React from 'react'

const PrivacyPolicy = () => {
  return (
    <section className='bg-[#232433]'>
      <div className='max-w-4xl mx-auto my-10 p-6 rounded-lg shadow-lg mb-0'>
        <h1 className='text-3xl font-bold text-blue-600 mb-4'>Privacy Policy</h1>
        <p className='mb-4'>
          At PostGen.ai, we are committed to protecting and respecting your privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit and use our platform. Please read this
          policy carefully to understand our views and practices regarding your personal data and how we will treat it.
        </p>
        <p className='mb-6'>By using our services, you consent to the practices described in this Privacy Policy.</p>

        <h2 className='text-2xl font-semibold text-blue-500 mb-3'>Information We Collect</h2>
        <ul className='list-disc list-inside mb-6'>
          <li>
            <strong>Personal Information:</strong> When you sign up or log in to PostGen.ai, we may collect personal
            details like your name, email address, and other identifiable information.
          </li>
          <li>
            <strong>Usage Data:</strong> We collect information on how you access and use the platform, including device
            information, log data, and interaction with the website, which helps us improve your experience.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to monitor
            activity on our platform and collect certain information to enhance user experience, such as preferences,
            session data, and analytics.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-blue-500 mb-3'>How We Use Your Information</h2>
        <ul className='list-disc list-inside mb-6'>
          <li>
            <strong>To Provide and Improve Services:</strong> Your data helps us create personalized content, improve
            our platform, and ensure optimal performance.
          </li>
          <li>
            <strong>To Communicate with You:</strong> We may use your email address to send updates, newsletters, and
            promotional materials related to our services, unless you opt out.
          </li>
          <li>
            <strong>To Enhance Security:</strong> We monitor activities on the platform to prevent misuse or
            unauthorized access.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-blue-500 mb-3'>How We Share Your Information</h2>
        <ul className='list-disc list-inside mb-6'>
          <li>
            <strong>Service Providers:</strong> We may share your data with trusted third-party vendors who assist us in
            providing the service (e.g., hosting, analytics, etc.).
          </li>
          <li>
            <strong>Legal Compliance:</strong> We may disclose your personal information if required by law, court
            order, or government regulation.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your
            information may be transferred as part of that transaction.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-blue-500 mb-3'>Your Data Protection Rights</h2>
        <ul className='list-disc list-inside mb-6'>
          <li>
            <strong>Access:</strong> You have the right to access the data we hold about you.
          </li>
          <li>
            <strong>Rectification:</strong> You may request that we correct any inaccurate or incomplete information.
          </li>
          <li>
            <strong>Deletion:</strong> You have the right to request the deletion of your personal data, subject to
            certain conditions.
          </li>
          <li>
            <strong>Opt-Out:</strong> You can opt out of marketing communications at any time by clicking the
            unsubscribe link in our emails.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold text-blue-500 mb-3'>Data Retention</h2>
        <p className='mb-6'>
          We retain your personal data only as long as necessary for the purposes outlined in this Privacy Policy,
          unless a longer retention period is required or permitted by law.
        </p>

        <h2 className='text-2xl font-semibold text-blue-500 mb-3'>Security of Your Information</h2>
        <p className='mb-6'>
          We take reasonable steps to protect your personal data from unauthorized access, use, or disclosure. However,
          no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className='text-2xl font-semibold text-blue-500 mb-3'>Changes to This Privacy Policy</h2>
        <p className='mb-4'>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other
          operational, legal, or regulatory reasons. We will notify you of any material changes by updating the
          effective date at the top of this policy.
        </p>
      </div>
    </section>
  )
}

export default PrivacyPolicy

PrivacyPolicy.publicGuard = true
