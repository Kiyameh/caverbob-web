export default function PolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-6">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information when you register on our site, submit cave data, participate in discussion forums, or
            fill out a form. The information collected may include your name, email address, and profile information if
            you choose to register.
          </p>
        </section>

        <section className="mb-6">
          <h2>2. How We Use Your Information</h2>
          <p>We may use the information we collect from you in the following ways:</p>
          <ul>
            <li>To personalize your experience and respond to your individual needs</li>
            <li>To improve our website based on the feedback you provide</li>
            <li>To process submissions and maintain the cave rankings database</li>
            <li>To send periodic emails regarding your submissions or other website features</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>3. Data Protection</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your
            personal information is contained behind secured networks and is only accessible by a limited number of
            persons who have special access rights to such systems.
          </p>
        </section>

        <section className="mb-6">
          <h2>4. Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information
            unless we provide users with advance notice. This does not include website hosting partners and other
            parties who assist us in operating our website, conducting our business, or serving our users.
          </p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to our use and processing of your personal data</li>
            <li>Request that we limit our use and processing of your personal data</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
