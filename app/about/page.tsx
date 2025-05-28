export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">About CaverBob.org</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          CaverBob.org is dedicated to maintaining and providing accurate, up-to-date information about the world's most
          remarkable caves. Our mission is to serve as the definitive resource for cave rankings worldwide, continuing
          the legacy of Robert Gulden's meticulous work in documenting these natural wonders.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Community-Driven</h2>
        <p className="text-lg text-gray-700 mb-4">
          We believe in the power of the global caving community. CaverBob.org is designed to be a collaborative
          platform where cavers, researchers, and enthusiasts can contribute to our growing database through verified
          submissions and participate in discussions about methodology and new discoveries.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">The Future of CaverBob.org</h2>
        <p className="text-lg text-gray-700 mb-4">
          We are committed to continuous improvement of this platform. Future plans include enhanced visualization
          tools, expanded data sets, and improved community features. Our goal is to create a comprehensive resource
          that serves both the scientific community and cave enthusiasts alike.
        </p>
      </section>
    </div>
  )
}
