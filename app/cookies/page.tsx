export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-6">
          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to the owners of the
            site.
          </p>
        </section>

        <section className="mb-6">
          <h2>2. How We Use Cookies</h2>
          <p>CaverBob.org uses cookies for the following purposes:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> These are necessary for the website to function properly.
            </li>
            <li>
              <strong>Functionality cookies:</strong> These remember choices you make to improve your experience.
            </li>
            <li>
              <strong>Analytical/performance cookies:</strong> These help us understand how visitors interact with our
              website.
            </li>
            <li>
              <strong>Authentication cookies:</strong> These help us identify users who have logged into the site.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>3. Types of Cookies We Use</h2>
          <p>
            <strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser. They
            enable the website to recognize you as you navigate between pages.
          </p>
          <p>
            <strong>Persistent Cookies:</strong> These remain on your device until they expire or you delete them. They
            enable the website to remember your preferences for the next time you visit.
          </p>
        </section>

        <section className="mb-6">
          <h2>4. Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings. You can usually find these settings
            in the "Options" or "Preferences" menu of your browser. You can also configure your browser to reject all
            cookies, but this may affect the functionality of many websites, including ours.
          </p>
        </section>

        <section>
          <h2>5. Changes to Our Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. Any changes will be posted on this page and, where
            appropriate, notified to you when you next visit our website.
          </p>
        </section>
      </div>
    </div>
  )
}
