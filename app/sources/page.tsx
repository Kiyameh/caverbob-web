export default function SourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Sources & Methodology</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Data Collection Process</h2>
        <p className="text-lg text-gray-700 mb-4">
          The data presented on CaverBob.org is collected through a rigorous process that ensures accuracy and
          reliability. Our rankings are based on verified measurements and reports from speleological organizations,
          research papers, and trusted sources within the caving community.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Verification Standards</h2>
        <p className="text-lg text-gray-700 mb-4">For a cave to be included in our rankings, we require:</p>
        <ul className="list-disc pl-6 mb-4 text-lg text-gray-700">
          <li>Documented survey data with clear methodology</li>
          <li>Verification by recognized speleological organizations when possible</li>
          <li>Cross-referencing with multiple sources when available</li>
          <li>Clear documentation of measurement techniques and standards</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Primary Sources</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our database builds upon the foundational work of Robert Gulden, with additional sources including:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          <li>International Union of Speleology (UIS) publications</li>
          <li>National speleological society reports</li>
          <li>Peer-reviewed research papers</li>
          <li>Expedition reports from recognized caving organizations</li>
        </ul>
      </section>
    </div>
  )
}
