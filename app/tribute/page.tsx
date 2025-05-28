import Image from "next/image"

export default function TributePage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-surface-1">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          In Memory of Robert Gulden
        </h1>

        {/* Main content section with photo and bio */}
        <div className="bg-surface-2 rounded-2xl shadow-md overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            {/* Photo column */}
            <div className="md:w-1/3 p-6 bg-primary/5 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white shadow-lg border-4 border-white">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bob_Gulden-ABQt1GQoIZVSByka3x5yGfoMtsgJc6.png"
                  alt="Robert 'Bob' Gulden"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center font-medium">
                Robert "Bob" Gulden
                <br />
                <span className="text-xs">March 30, 1948 - November 30, 2022</span>
              </p>
            </div>

            {/* Bio column */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">The Legacy of "Bob"</h2>
              <div className="space-y-4 text-foreground/90">
                <p className="leading-relaxed">
                  Robert "Bob" Edgar Gulden (NSS 13188RL (FE)) was a dedicated speleologist who spent decades
                  meticulously documenting and maintaining what became the most comprehensive database of cave rankings
                  in the world. From 1976 until his death in 2022, Bob kept the world's best-known database of long and
                  deep caves, creating an invaluable resource for the global caving community.
                </p>
                <p className="leading-relaxed">
                  Born on March 30, 1948, in Starnberg, Germany, Bob began caving in 1964 while living in Okinawa,
                  Japan. He joined the National Speleological Society in 1971 and began his famous database in 1976
                  while helping to survey the Friars Hole Cave System in West Virginia. His passion for accuracy and
                  detail established standardized methods for measuring and comparing caves worldwide.
                </p>
                <p className="leading-relaxed">
                  Perhaps his largest contribution to caving cartography was the Friars Hole Cave System map, a cave
                  that is still being explored and mapped (most recently passed 50 miles of mapped passage). He also
                  helped explore and map Great Onyx Cave at Mammoth Cave National Park in Kentucky, Gap Cave in
                  Cumberland Gap National Historical Park in Virginia, and Siler's Cave in West Virginia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contributions section */}
        <div className="bg-secondary/50 rounded-2xl p-8 mb-12 shadow-md border border-secondary">
          <div className="flex items-center mb-6">
            <div className="h-10 w-2 bg-accent rounded-full mr-4"></div>
            <h3 className="text-xl font-semibold text-primary">Contributions to Speleology</h3>
          </div>
          <ul className="list-none space-y-3 pl-6">
            {[
              "Maintained the world's most comprehensive cave rankings database for over 45 years",
              "Created the definitive map of the Friars Hole Cave System",
              "Collaborated with international speleological organizations to standardize measurement practices",
              'Belonged to the "Gangsta Mappers," a group of guerrilla cartographers who remapped previously explored caves with greater detail',
              "Received the prestigious Karst Award in March 2022 from the Karst Waters Institute",
              "Mentored numerous young cavers and researchers",
              "Published regular updates to ensure the caving community had access to the most current information",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary mr-3 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Legacy section */}
        <div className="bg-gradient-to-br from-surface-2 to-surface-3 rounded-2xl p-8 mb-12 shadow-md border-l-4 border-primary">
          <div className="flex items-center mb-6">
            <div className="h-10 w-2 bg-accent rounded-full mr-4"></div>
            <h3 className="text-xl font-semibold text-primary">Continuing Bob's Legacy</h3>
          </div>
          <div className="space-y-4 text-foreground/90">
            <p className="leading-relaxed">
              Following Bob's passing in November 2022, his work is now being continued by a dedicated successor
              affectionately known in the caving community as "Little Bob." Committed to maintaining the same high
              standards of accuracy and thoroughness that Bob established, Little Bob has taken on the responsibility of
              updating and expanding the database that Bob so carefully built throughout his lifetime.
            </p>
            <p className="leading-relaxed">
              CaverBob.org is named in honor of both Bobs, serving as a living memorial to Robert Gulden's legacy while
              ensuring that his life's work continues to benefit speleologists, researchers, and cave enthusiasts
              worldwide. Through this platform, the torch has been passed to a new generation, preserving the invaluable
              resource that Bob created while incorporating modern technology to make it more accessible than ever
              before.
            </p>
          </div>
        </div>

        {/* Personal life section */}
        <div className="bg-surface-2 rounded-2xl p-8 shadow-md border border-primary/20">
          <div className="flex items-center mb-6">
            <div className="h-10 w-2 bg-accent rounded-full mr-4"></div>
            <h3 className="text-xl font-semibold text-primary">Personal Life and Remembrance</h3>
          </div>
          <div className="space-y-4 text-foreground/90">
            <p className="leading-relaxed">
              Bob's wife Janice Louise Gulden preceded him in death. He is survived by his sister, Margret Noel; son,
              Dustin Robert; daughter-in-law, Nicole Sophia; and grandsons, Odin Dustin and Orion Robert.
            </p>
            <p className="leading-relaxed">
              Following his wishes, some of Bob's ashes were sprinkled in the North Stream of Friars Hole, where they
              can make their way to Monster Cavern, a fitting final journey for a man who dedicated his life to
              exploring and documenting the hidden wonders beneath our feet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
