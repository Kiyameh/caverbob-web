export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-6">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using CaverBob.org, you accept and agree to be
            bound by the terms and provisions of this agreement. If you do not
            agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section className="mb-6">
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily view the materials on
            CaverBob.org for personal, non-commercial use only. This is the
            grant of a license, not a transfer of title, and under this license
            you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>
              Attempt to decompile or reverse engineer any software contained on
              CaverBob.org
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials
            </li>
            <li>
              Transfer the materials to another person or "mirror" the materials
              on any other server
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2>3. User Contributions</h2>
          <p>
            Users may submit cave data, comments, and participate in
            discussions. By submitting content, you grant CaverBob.org a
            non-exclusive, royalty-free, perpetual, irrevocable right to use,
            reproduce, modify, adapt, publish, translate, create derivative
            works from, distribute, and display such content throughout the
            world in any media.
          </p>
        </section>

        <section className="mb-6">
          <h2>4. Accuracy of Materials</h2>
          <p>
            While we strive for accuracy, the materials appearing on
            CaverBob.org could include technical, typographical, or photographic
            errors. CaverBob.org does not warrant that any of the materials on
            its website are accurate, complete, or current.
          </p>
        </section>

        <section>
          <h2>5. Modifications</h2>
          <p>
            CaverBob.org may revise these terms of service at any time without
            notice. By using this website, you are agreeing to be bound by the
            then current version of these terms of service.
          </p>
        </section>
      </div>
    </div>
  )
}
