'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type Language = 'en' | 'es' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

// Translations
const translations = {
  en: {
    // Navigation
    'nav.rankings': 'Rankings',
    'nav.discussion': 'Discussion',
    'nav.sources': 'Sources',
    'nav.about': 'About',
    'nav.tribute': 'Tribute to Bob',
    'nav.support': 'Support',
    'nav.signin': 'Sign in with Google',

    // Home page
    'home.title': 'Worldwide Cave Rankings',
    'home.tab.longest': 'Longest Caves',
    'home.tab.deepest': 'Deepest Caves',
    'home.tab.pits': 'Deep Pits',
    'home.tab.chambers': 'Largest Chambers',

    // Cave details
    'cave.back': 'Back to Rankings',
    'cave.info': 'Cave Information',
    'cave.location': 'Location Details',
    'cave.rank': 'Rank',
    'cave.length': 'Length',
    'cave.depth': 'Depth',
    'cave.entrances': 'Entrances',
    'cave.terrain': 'Terrain Type',
    'cave.country': 'Country',
    'cave.state': 'State/Province',
    'cave.massif': 'Massif',
    'cave.source': 'Source',
    'cave.updated': 'Last Updated',

    // Discussion
    'discussion.title': 'Discussion Forum',
    'discussion.description':
      'Join the community discussion about cave rankings, new discoveries, and methodology. Below are the most recent conversations happening across different caves.',
    'discussion.empty': 'No discussions yet',
    'discussion.empty.description':
      'Be the first to start a discussion by visiting a cave page and leaving a comment.',
    'discussion.browse': 'Browse Caves',
    'discussion.comments': 'comments',
    'discussion.comment': 'comment',
    'discussion.view': 'View full discussion',
    'discussion.section': 'Discussion',
    'discussion.placeholder':
      'Share your knowledge or ask a question about this cave...',
    'discussion.posting': 'Posting as',
    'discussion.post': 'Post Comment',
    'discussion.posting.action': 'Posting...',
    'discussion.signin': 'Sign in to join the discussion about this cave.',
    'discussion.signin.action': 'Sign In',
    'discussion.loading': 'Loading comments...',
    'discussion.count': 'Comments',
    'discussion.no.comments':
      'No comments yet. Be the first to share your thoughts!',

    // About page
    'about.title': 'About CaverBob.org',
    'about.mission.title': 'Our Mission',
    'about.mission.text':
      "CaverBob.org is dedicated to maintaining and providing accurate, up-to-date information about the world's most remarkable caves. Our mission is to serve as the definitive resource for cave rankings worldwide, continuing the legacy of Robert Gulden's meticulous work in documenting these natural wonders.",
    'about.community.title': 'Community-Driven',
    'about.community.text':
      'We believe in the power of the global caving community. CaverBob.org is designed to be a collaborative platform where cavers, researchers, and enthusiasts can contribute to our growing database through verified submissions and participate in discussions about methodology and new discoveries.',
    'about.future.title': 'The Future of CaverBob.org',
    'about.future.text':
      'We are committed to continuous improvement of this platform. Future plans include enhanced visualization tools, expanded data sets, and improved community features. Our goal is to create a comprehensive resource that serves both the scientific community and cave enthusiasts alike.',

    // Sources page
    'sources.title': 'Sources & Methodology',
    'sources.collection.title': 'Data Collection Process',
    'sources.collection.text':
      'The data presented on CaverBob.org is collected through a rigorous process that ensures accuracy and reliability. Our rankings are based on verified measurements and reports from speleological organizations, research papers, and trusted sources within the caving community.',
    'sources.standards.title': 'Verification Standards',
    'sources.standards.text':
      'For a cave to be included in our rankings, we require:',
    'sources.standards.item1': 'Documented survey data with clear methodology',
    'sources.standards.item2':
      'Verification by recognized speleological organizations when possible',
    'sources.standards.item3':
      'Cross-referencing with multiple sources when available',
    'sources.standards.item4':
      'Clear documentation of measurement techniques and standards',
    'sources.primary.title': 'Primary Sources',
    'sources.primary.text':
      'Our database builds upon the foundational work of Robert Gulden, with additional sources including:',
    'sources.primary.item1':
      'International Union of Speleology (UIS) publications',
    'sources.primary.item2': 'National speleological society reports',
    'sources.primary.item3': 'Peer-reviewed research papers',
    'sources.primary.item4':
      'Expedition reports from recognized caving organizations',

    // Tribute page
    'tribute.title': 'In Memory of Robert Gulden',
    'tribute.legacy': 'The Legacy of "Bob"',
    'tribute.bio.p1':
      'Robert "Bob" Edgar Gulden (NSS 13188RL (FE)) was a dedicated speleologist who spent decades meticulously documenting and maintaining what became the most comprehensive database of cave rankings in the world. From 1976 until his death in 2022, Bob kept the world\'s best-known database of long and deep caves, creating an invaluable resource for the global caving community.',
    'tribute.bio.p2':
      'Born on March 30, 1948, in Starnberg, Germany, Bob began caving in 1964 while living in Okinawa, Japan. He joined the National Speleological Society in 1971 and began his famous database in 1976 while helping to survey the Friars Hole Cave System in West Virginia. His passion for accuracy and detail established standardized methods for measuring and comparing caves worldwide.',
    'tribute.bio.p3':
      "Perhaps his largest contribution to caving cartography was the Friars Hole Cave System map, a cave that is still being explored and mapped (most recently passed 50 miles of mapped passage). He also helped explore and map Great Onyx Cave at Mammoth Cave National Park in Kentucky, Gap Cave in Cumberland Gap National Historical Park in Virginia, and Siler's Cave in West Virginia.",
    'tribute.contributions.title': 'Contributions to Speleology',
    'tribute.contributions.item1':
      "Maintained the world's most comprehensive cave rankings database for over 45 years",
    'tribute.contributions.item2':
      'Created the definitive map of the Friars Hole Cave System',
    'tribute.contributions.item3':
      'Collaborated with international speleological organizations to standardize measurement practices',
    'tribute.contributions.item4':
      'Belonged to the "Gangsta Mappers," a group of guerrilla cartographers who remapped previously explored caves with greater detail',
    'tribute.contributions.item5':
      'Received the prestigious Karst Award in March 2022 from the Karst Waters Institute',
    'tribute.contributions.item6':
      'Mentored numerous young cavers and researchers',
    'tribute.contributions.item7':
      'Published regular updates to ensure the caving community had access to the most current information',
    'tribute.legacy.title': "Continuing Bob's Legacy",
    'tribute.legacy.p1':
      'Following Bob\'s passing in November 2022, his work is now being continued by a dedicated successor affectionately known in the caving community as "Little Bob." Committed to maintaining the same high standards of accuracy and thoroughness that Bob established, Little Bob has taken on the responsibility of updating and expanding the database that Bob so carefully built throughout his lifetime.',
    'tribute.legacy.p2':
      "CaverBob.org is named in honor of both Bobs, serving as a living memorial to Robert Gulden's legacy while ensuring that his life's work continues to benefit speleologists, researchers, and cave enthusiasts worldwide. Through this platform, the torch has been passed to a new generation, preserving the invaluable resource that Bob created while incorporating modern technology to make it more accessible than ever before.",
    'tribute.personal.title': 'Personal Life and Remembrance',
    'tribute.personal.p1':
      "Bob's wife Janice Louise Gulden preceded him in death. He is survived by his sister, Margret Noel; son, Dustin Robert; daughter-in-law, Nicole Sophia; and grandsons, Odin Dustin and Orion Robert.",
    'tribute.personal.p2':
      "Following his wishes, some of Bob's ashes were sprinkled in the North Stream of Friars Hole, where they can make their way to Monster Cavern, a fitting final journey for a man who dedicated his life to exploring and documenting the hidden wonders beneath our feet.",

    // Footer
    'footer.description':
      'The central repository for worldwide cave rankings, dedicated to the memory of Robert Gulden.',
    'footer.links': 'Quick Links',
    'footer.legal': 'Legal',
    'footer.copyright': 'All rights reserved.',

    // Measurement
    'measurement.metric': 'Metric',
    'measurement.imperial': 'Imperial',

    // Language
    'language.en': 'English',
    'language.es': 'Spanish',
    'language.fr': 'French',

    // Table
    'table.search': 'Search caves...',
    'table.filter': 'Filter',
    'table.terrain.title': 'Filter by Terrain Type',
    'table.terrain.all': 'All',
    'table.terrain.none': 'None',
    'table.showing': 'Showing',
    'table.of': 'of',
    'table.caves': 'caves',
    'table.previous': 'Previous',
    'table.next': 'Next',
    'table.na': 'N/A',

    // Support page
    'support.title': 'Support CaverBob.org',
    'support.description':
      "CaverBob.org is a labor of love, dedicated to preserving and sharing the legacy of Robert Gulden's work. While we're committed to keeping this resource free and accessible to all, maintaining the platform comes with some costs - from domain registration to hosting services.",
    'support.help':
      "Your support, no matter how small, helps us keep this valuable resource alive and growing. Every contribution makes a difference in our mission to document and share the world's most remarkable caves.",
    'support.coffee': 'Buy us a coffee',

    // Report Dialog
    'report.title': 'Report New Information',
    'report.description':
      'Help us keep the information up to date. Please provide the details below.',
    'report.reporter': 'Reporter Name',
    'report.contact': 'Contact Information',
    'report.contact.placeholder': 'Email or phone number',
    'report.contact.warning':
      'Please provide accurate contact information so we can reach you if we need to verify the information.',
    'report.cave': 'Cave Name',
    'report.info': 'New Information',
    'report.source': 'Data Source',
    'report.submit': 'Submit Report',
    'report.submitting': 'Submitting...',
    'report.success': 'Report Submitted',
    'report.success.description':
      'Thank you for your contribution. We will review the information and update it soon.',
    'report.error': 'Error',
    'report.error.description':
      'There was an error submitting the report. Please try again.',
    'report.button': 'Report Information',

    // Contact Form
    'contact.title': 'Contact Us',
    'contact.description':
      "Found an error or have a suggestion? We'd love to hear from you! Please use the form below to report any issues or share your ideas for improving CaverBob.org.",
    'contact.name': 'Name',
    'contact.name.placeholder': 'Your name',
    'contact.email': 'Email',
    'contact.email.placeholder': 'your.email@example.com',
    'contact.email.warning':
      'Please provide a valid email address so we can respond to your message.',
    'contact.subject': 'Subject',
    'contact.subject.placeholder': 'What is this about?',
    'contact.message': 'Message',
    'contact.message.placeholder': 'Tell us about the error or suggestion...',
    'contact.submit': 'Send Message',
    'contact.submitting': 'Sending...',
    'contact.success': 'Message Sent',
    'contact.success.description':
      'Thank you for your feedback. We will review it and get back to you soon.',
    'contact.error': 'Error',
    'contact.error.description':
      'There was an error sending your message. Please try again.',

    // Version Card
    'version.title': 'Current Version',
    'version.latest.title': 'Latest Updates',
    'version.latest.item1':
      'Added contact form for reporting issues and suggestions',
    'version.latest.item2':
      'Implemented new information reporting system for caves',
    'version.latest.item3': 'Added French language support',
  },
  es: {
    // Navigation
    'nav.rankings': 'Clasificaciones',
    'nav.discussion': 'Discusión',
    'nav.sources': 'Fuentes',
    'nav.about': 'Acerca de',
    'nav.tribute': 'Tributo a Bob',
    'nav.support': 'Soporte',
    'nav.signin': 'Iniciar sesión con Google',

    // Home page
    'home.title': 'Clasificación Mundial de Cuevas',
    'home.tab.longest': 'Cuevas más Largas',
    'home.tab.deepest': 'Cuevas más Profundas',
    'home.tab.pits': 'Pozos Profundos',
    'home.tab.chambers': 'Cámaras más Grandes',

    // Cave details
    'cave.back': 'Volver a Clasificaciones',
    'cave.info': 'Información de la Cueva',
    'cave.location': 'Detalles de Ubicación',
    'cave.rank': 'Rango',
    'cave.length': 'Longitud',
    'cave.depth': 'Profundidad',
    'cave.entrances': 'Entradas',
    'cave.terrain': 'Tipo de Terreno',
    'cave.country': 'País',
    'cave.state': 'Estado/Provincia',
    'cave.massif': 'Macizo',
    'cave.source': 'Fuente',
    'cave.updated': 'Última Actualización',

    // Discussion
    'discussion.title': 'Foro de Discusión',
    'discussion.description':
      'Únete a la discusión comunitaria sobre clasificaciones de cuevas, nuevos descubrimientos y metodología. A continuación se muestran las conversaciones más recientes en diferentes cuevas.',
    'discussion.empty': 'Aún no hay discusiones',
    'discussion.empty.description':
      'Sé el primero en iniciar una discusión visitando una página de cueva y dejando un comentario.',
    'discussion.browse': 'Explorar Cuevas',
    'discussion.comments': 'comentarios',
    'discussion.comment': 'comentario',
    'discussion.view': 'Ver discusión completa',
    'discussion.section': 'Discusión',
    'discussion.placeholder':
      'Comparte tu conocimiento o haz una pregunta sobre esta cueva...',
    'discussion.posting': 'Publicando como',
    'discussion.post': 'Publicar Comentario',
    'discussion.posting.action': 'Publicando...',
    'discussion.signin':
      'Inicia sesión para unirte a la discusión sobre esta cueva.',
    'discussion.signin.action': 'Iniciar Sesión',
    'discussion.loading': 'Cargando comentarios...',
    'discussion.count': 'Comentarios',
    'discussion.no.comments':
      'Aún no hay comentarios. ¡Sé el primero en compartir tus pensamientos!',

    // About page
    'about.title': 'Acerca de CaverBob.org',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.text':
      'CaverBob.org está dedicado a mantener y proporcionar información precisa y actualizada sobre las cuevas más notables del mundo. Nuestra misión es servir como el recurso definitivo para la clasificación de cuevas a nivel mundial, continuando el legado del meticuloso trabajo de Robert Gulden en la documentación de estas maravillas naturales.',
    'about.community.title': 'Impulsado por la Comunidad',
    'about.community.text':
      'Creemos en el poder de la comunidad global de espeleología. CaverBob.org está diseñado para ser una plataforma colaborativa donde espeleólogos, investigadores y entusiastas pueden contribuir a nuestra creciente base de datos a través de presentaciones verificadas y participar en discusiones sobre metodología y nuevos descubrimientos.',
    'about.future.title': 'El Futuro de CaverBob.org',
    'about.future.text':
      'Estamos comprometidos con la mejora continua de esta plataforma. Los planes futuros incluyen herramientas de visualización mejoradas, conjuntos de datos ampliados y características comunitarias mejoradas. Nuestro objetivo es crear un recurso integral que sirva tanto a la comunidad científica como a los entusiastas de las cuevas.',

    // Sources page
    'sources.title': 'Fuentes y Metodología',
    'sources.collection.title': 'Proceso de Recolección de Datos',
    'sources.collection.text':
      'Los datos presentados en CaverBob.org se recopilan a través de un proceso riguroso que garantiza la precisión y fiabilidad. Nuestras clasificaciones se basan en mediciones verificadas e informes de organizaciones espeleológicas, trabajos de investigación y fuentes confiables dentro de la comunidad de espeleología.',
    'sources.standards.title': 'Estándares de Verificación',
    'sources.standards.text':
      'Para que una cueva sea incluida en nuestras clasificaciones, requerimos:',
    'sources.standards.item1':
      'Datos de estudio documentados con metodología clara',
    'sources.standards.item2':
      'Verificación por organizaciones espeleológicas reconocidas cuando sea posible',
    'sources.standards.item3':
      'Referencias cruzadas con múltiples fuentes cuando estén disponibles',
    'sources.standards.item4':
      'Documentación clara de técnicas y estándares de medición',
    'sources.primary.title': 'Fuentes Primarias',
    'sources.primary.text':
      'Nuestra base de datos se basa en el trabajo fundamental de Robert Gulden, con fuentes adicionales que incluyen:',
    'sources.primary.item1':
      'Publicaciones de la Unión Internacional de Espeleología (UIS)',
    'sources.primary.item2': 'Informes de sociedades espeleológicas nacionales',
    'sources.primary.item3': 'Trabajos de investigación revisados por pares',
    'sources.primary.item4':
      'Informes de expediciones de organizaciones espeleológicas reconocidas',

    // Tribute page
    'tribute.title': 'En Memoria de Robert Gulden',
    'tribute.legacy': 'El Legado de "Bob"',
    'tribute.bio.p1':
      'Robert "Bob" Edgar Gulden (NSS 13188RL (FE)) fue un espeleólogo dedicado que pasó décadas documentando meticulosamente y manteniendo lo que se convirtió en la base de datos más completa de clasificaciones de cuevas en el mundo. Desde 1976 hasta su muerte en 2022, Bob mantuvo la base de datos más conocida del mundo de cuevas largas y profundas, creando un recurso invaluable para la comunidad global de espeleología.',
    'tribute.bio.p2':
      'Nacido el 30 de marzo de 1948 en Starnberg, Alemania, Bob comenzó a explorar cuevas en 1964 mientras vivía en Okinawa, Japón. Se unió a la Sociedad Nacional de Espeleología en 1971 y comenzó su famosa base de datos en 1976 mientras ayudaba a estudiar el Sistema de Cuevas Friars Hole en Virginia Occidental. Su pasión por la precisión y el detalle estableció métodos estandarizados para medir y comparar cuevas en todo el mundo.',
    'tribute.bio.p3':
      "Quizás su mayor contribución a la cartografía espeleológica fue el mapa del Sistema de Cuevas Friars Hole, una cueva que todavía se está explorando y mapeando (recientemente superó las 50 millas de pasaje mapeado). También ayudó a explorar y mapear Great Onyx Cave en el Parque Nacional Mammoth Cave en Kentucky, Gap Cave en el Parque Histórico Nacional Cumberland Gap en Virginia y Siler's Cave en Virginia Occidental.",
    'tribute.contributions.title': 'Contribuciones a la Espeleología',
    'tribute.contributions.item1':
      'Mantuvo la base de datos más completa del mundo de clasificaciones de cuevas durante más de 45 años',
    'tribute.contributions.item2':
      'Creó el mapa definitivo del Sistema de Cuevas Friars Hole',
    'tribute.contributions.item3':
      'Colaboró con organizaciones espeleológicas internacionales para estandarizar prácticas de medición',
    'tribute.contributions.item4':
      'Perteneció a los "Gangsta Mappers", un grupo de cartógrafos guerrilleros que remapearon cuevas previamente exploradas con mayor detalle',
    'tribute.contributions.item5':
      'Recibió el prestigioso Premio Karst en marzo de 2022 del Instituto de Aguas Kársticas',
    'tribute.contributions.item6':
      'Mentorizó a numerosos jóvenes espeleólogos e investigadores',
    'tribute.contributions.item7':
      'Publicó actualizaciones regulares para asegurar que la comunidad espeleológica tuviera acceso a la información más actualizada',
    'tribute.legacy.title': 'Continuando el Legado de Bob',
    'tribute.legacy.p1':
      'Tras el fallecimiento de Bob en noviembre de 2022, su trabajo ahora está siendo continuado por un sucesor dedicado conocido cariñosamente en la comunidad espeleológica como "Little Bob". Comprometido a mantener los mismos altos estándares de precisión y minuciosidad que Bob estableció, Little Bob ha asumido la responsabilidad de actualizar y expandir la base de datos que Bob construyó tan cuidadosamente a lo largo de su vida.',
    'tribute.legacy.p2':
      'CaverBob.org lleva el nombre en honor a ambos Bobs, sirviendo como un memorial viviente al legado de Robert Gulden mientras asegura que el trabajo de su vida continúe beneficiando a espeleólogos, investigadores y entusiastas de las cuevas en todo el mundo. A través de esta plataforma, la antorcha ha sido pasada a una nueva generación, preservando el invaluable recurso que Bob creó mientras incorpora tecnología moderna para hacerlo más accesible que nunca.',
    'tribute.personal.title': 'Vida Personal y Recuerdo',
    'tribute.personal.p1':
      'La esposa de Bob, Janice Louise Gulden, falleció antes que él. Le sobreviven su hermana, Margret Noel; su hijo, Dustin Robert; su nuera, Nicole Sophia; y sus nietos, Odin Dustin y Orion Robert.',
    'tribute.personal.p2':
      'Siguiendo sus deseos, algunas de las cenizas de Bob fueron esparcidas en el North Stream de Friars Hole, donde pueden hacer su camino hacia Monster Cavern, un viaje final apropiado para un hombre que dedicó su vida a explorar y documentar las maravillas ocultas bajo nuestros pies.',

    // Footer
    'footer.description':
      'El repositorio central para clasificaciones mundiales de cuevas, dedicado a la memoria de Robert Gulden.',
    'footer.links': 'Enlaces Rápidos',
    'footer.legal': 'Legal',
    'footer.copyright': 'Todos los derechos reservados.',

    // Measurement
    'measurement.metric': 'Métrico',
    'measurement.imperial': 'Imperial',

    // Language
    'language.en': 'Inglés',
    'language.es': 'Español',
    'language.fr': 'Francés',

    // Table
    'table.search': 'Buscar cuevas...',
    'table.filter': 'Filtrar',
    'table.terrain.title': 'Filtrar por Tipo de Terreno',
    'table.terrain.all': 'Todos',
    'table.terrain.none': 'Ninguno',
    'table.showing': 'Mostrando',
    'table.of': 'de',
    'table.caves': 'cuevas',
    'table.previous': 'Anterior',
    'table.next': 'Siguiente',
    'table.na': 'N/D',

    // Support page
    'support.title': 'Apoya a CaverBob.org',
    'support.description':
      'CaverBob.org es un trabajo de amor, dedicado a preservar y compartir el legado del trabajo de Robert Gulden. Aunque estamos comprometidos a mantener este recurso gratuito y accesible para todos, mantener la plataforma conlleva algunos gastos - desde el registro del dominio hasta los servicios de alojamiento.',
    'support.help':
      'Tu apoyo, por pequeño que sea, nos ayuda a mantener vivo y en crecimiento este valioso recurso. Cada contribución marca la diferencia en nuestra misión de documentar y compartir las cuevas más notables del mundo.',
    'support.coffee': 'Invítanos un café',

    // Report Dialog
    'report.title': 'Reportar Nueva Información',
    'report.description':
      'Ayúdanos a mantener la información actualizada. Por favor, proporciona los detalles a continuación.',
    'report.reporter': 'Nombre del Reportante',
    'report.contact': 'Información de Contacto',
    'report.contact.placeholder': 'Correo electrónico o número de teléfono',
    'report.contact.warning':
      'Por favor, proporciona información de contacto precisa para que podamos contactarte si necesitamos verificar la información.',
    'report.cave': 'Nombre de la Cueva',
    'report.info': 'Nueva Información',
    'report.source': 'Fuente de los Datos',
    'report.submit': 'Enviar Reporte',
    'report.submitting': 'Enviando...',
    'report.success': 'Reporte Enviado',
    'report.success.description':
      'Gracias por tu contribución. Revisaremos la información y la actualizaremos pronto.',
    'report.error': 'Error',
    'report.error.description':
      'Hubo un error al enviar el reporte. Por favor, inténtalo de nuevo.',
    'report.button': 'Reportar Información',

    // Contact Form
    'contact.title': 'Contáctanos',
    'contact.description':
      '¿Encontraste un error o tienes una sugerencia? ¡Nos encantaría escucharte! Por favor, utiliza el formulario de abajo para reportar cualquier problema o compartir tus ideas para mejorar CaverBob.org.',
    'contact.name': 'Nombre',
    'contact.name.placeholder': 'Tu nombre',
    'contact.email': 'Correo Electrónico',
    'contact.email.placeholder': 'tu.correo@ejemplo.com',
    'contact.email.warning':
      'Por favor, proporciona una dirección de correo electrónico válida para que podamos responderte.',
    'contact.subject': 'Asunto',
    'contact.subject.placeholder': '¿De qué se trata?',
    'contact.message': 'Mensaje',
    'contact.message.placeholder':
      'Cuéntanos sobre el error o la sugerencia...',
    'contact.submit': 'Enviar Mensaje',
    'contact.submitting': 'Enviando...',
    'contact.success': 'Mensaje Enviado',
    'contact.success.description':
      'Gracias por tu retroalimentación. La revisaremos y te responderemos pronto.',
    'contact.error': 'Error',
    'contact.error.description':
      'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.',

    // Version Card
    'version.title': 'Versión Actual',
    'version.latest.title': 'Últimas Actualizaciones',
    'version.latest.item1':
      'Añadido formulario de contacto para reportar problemas y sugerencias',
    'version.latest.item2':
      'Implementado sistema de reporte de nueva información para cuevas',
    'version.latest.item3': 'Añadido soporte para el idioma francés',
  },
  fr: {
    // Navigation
    'nav.rankings': 'Classements',
    'nav.discussion': 'Discussion',
    'nav.sources': 'Sources',
    'nav.about': 'À propos',
    'nav.tribute': 'Hommage à Bob',
    'nav.support': 'Support',
    'nav.signin': 'Se connecter avec Google',

    // Home page
    'home.title': 'Classement Mondial des Grottes',
    'home.tab.longest': 'Grottes les Plus Longues',
    'home.tab.deepest': 'Grottes les Plus Profondes',
    'home.tab.pits': 'Puits Profonds',
    'home.tab.chambers': 'Plus Grandes Salles',

    // Cave details
    'cave.back': 'Retour aux Classements',
    'cave.info': 'Informations sur la Grotte',
    'cave.location': "Détails de l'Emplacement",
    'cave.rank': 'Rang',
    'cave.length': 'Longueur',
    'cave.depth': 'Profondeur',
    'cave.entrances': 'Entrées',
    'cave.terrain': 'Type de Terrain',
    'cave.country': 'Pays',
    'cave.state': 'État/Province',
    'cave.massif': 'Massif',
    'cave.source': 'Source',
    'cave.updated': 'Dernière Mise à Jour',

    // Discussion
    'discussion.title': 'Forum de Discussion',
    'discussion.description':
      'Rejoignez la discussion communautaire sur les classements des grottes, les nouvelles découvertes et la méthodologie. Ci-dessous se trouvent les conversations les plus récentes concernant différentes grottes.',
    'discussion.empty': 'Pas encore de discussions',
    'discussion.empty.description':
      'Soyez le premier à démarrer une discussion en visitant une page de grotte et en laissant un commentaire.',
    'discussion.browse': 'Parcourir les Grottes',
    'discussion.comments': 'commentaires',
    'discussion.comment': 'commentaire',
    'discussion.view': 'Voir la discussion complète',
    'discussion.section': 'Discussion',
    'discussion.placeholder':
      'Partagez vos connaissances ou posez une question sur cette grotte...',
    'discussion.posting': 'Publication en tant que',
    'discussion.post': 'Publier un Commentaire',
    'discussion.posting.action': 'Publication en cours...',
    'discussion.signin':
      'Connectez-vous pour rejoindre la discussion sur cette grotte.',
    'discussion.signin.action': 'Se Connecter',
    'discussion.loading': 'Chargement des commentaires...',
    'discussion.count': 'Commentaires',
    'discussion.no.comments':
      'Pas encore de commentaires. Soyez le premier à partager vos pensées !',

    // About page
    'about.title': 'À propos de CaverBob.org',
    'about.mission.title': 'Notre Mission',
    'about.mission.text':
      "CaverBob.org est dédié à maintenir et à fournir des informations précises et à jour sur les grottes les plus remarquables du monde. Notre mission est de servir de ressource définitive pour les classements de grottes dans le monde entier, poursuivant l'héritage du travail méticuleux de Robert Gulden dans la documentation de ces merveilles naturelles.",
    'about.community.title': 'Communauté Participative',
    'about.community.text':
      'Nous croyons en la puissance de la communauté mondiale de spéléologie. CaverBob.org est conçu pour être une plateforme collaborative où les spéléologues, les chercheurs et les passionnés peuvent contribuer à notre base de données croissante par le biais de soumissions vérifiées et participer à des discussions sur la méthodologie et les nouvelles découvertes.',
    'about.future.title': "L'Avenir de CaverBob.org",
    'about.future.text':
      'Nous nous engageons à améliorer continuellement cette plateforme. Les plans futurs comprennent des outils de visualisation améliorés, des ensembles de données élargis et des fonctionnalités communautaires améliorées. Notre objectif est de créer une ressource complète qui serve à la fois la communauté scientifique et les passionnés de grottes.',

    // Sources page
    'sources.title': 'Sources et Méthodologie',
    'sources.collection.title': 'Processus de Collecte de Données',
    'sources.collection.text':
      "Les données présentées sur CaverBob.org sont collectées par un processus rigoureux qui garantit l'exactitude et la fiabilité. Nos classements sont basés sur des mesures vérifiées et des rapports d'organisations spéléologiques, de documents de recherche et de sources fiables au sein de la communauté spéléologique.",
    'sources.standards.title': 'Normes de Vérification',
    'sources.standards.text':
      "Pour qu'une grotte soit incluse dans nos classements, nous exigeons :",
    'sources.standards.item1':
      "Des données d'étude documentées avec une méthodologie claire",
    'sources.standards.item2':
      'Vérification par des organisations spéléologiques reconnues lorsque possible',
    'sources.standards.item3':
      'Recoupement avec plusieurs sources lorsque disponibles',
    'sources.standards.item4':
      'Documentation claire des techniques et normes de mesure',
    'sources.primary.title': 'Sources Primaires',
    'sources.primary.text':
      "Notre base de données s'appuie sur le travail fondamental de Robert Gulden, avec des sources supplémentaires comprenant :",
    'sources.primary.item1':
      "Publications de l'Union Internationale de Spéléologie (UIS)",
    'sources.primary.item2': 'Rapports des sociétés spéléologiques nationales',
    'sources.primary.item3': 'Articles de recherche évalués par des pairs',
    'sources.primary.item4':
      "Rapports d'expédition d'organisations spéléologiques reconnues",

    // Tribute page
    'tribute.title': 'À la Mémoire de Robert Gulden',
    'tribute.legacy': 'L\'Héritage de "Bob"',
    'tribute.bio.p1':
      'Robert "Bob" Edgar Gulden (NSS 13188RL (FE)) était un spéléologue dévoué qui a passé des décennies à documenter méticuleusement et à maintenir ce qui est devenu la base de données la plus complète de classements de grottes au monde. De 1976 jusqu\'à sa mort en 2022, Bob a tenu la base de données la plus connue au monde des grottes longues et profondes, créant une ressource inestimable pour la communauté spéléologique mondiale.',
    'tribute.bio.p2':
      "Né le 30 mars 1948 à Starnberg, en Allemagne, Bob a commencé la spéléologie en 1964 alors qu'il vivait à Okinawa, au Japon. Il a rejoint la National Speleological Society en 1971 et a commencé sa célèbre base de données en 1976 tout en aidant à étudier le système de grottes Friars Hole en Virginie-Occidentale. Sa passion pour la précision et le détail a établi des méthodes standardisées pour mesurer et comparer les grottes dans le monde entier.",
    'tribute.bio.p3':
      "Sa plus grande contribution à la cartographie spéléologique est peut-être la carte du système de grottes Friars Hole, une grotte qui est encore explorée et cartographiée (récemment dépassé 50 miles de passage cartographié). Il a également aidé à explorer et à cartographier Great Onyx Cave au Parc National de Mammoth Cave dans le Kentucky, Gap Cave dans le Parc Historique National de Cumberland Gap en Virginie, et Siler's Cave en Virginie-Occidentale.",
    'tribute.contributions.title': 'Contributions à la Spéléologie',
    'tribute.contributions.item1':
      'A maintenu la base de données la plus complète au monde des classements de grottes pendant plus de 45 ans',
    'tribute.contributions.item2':
      'A créé la carte définitive du système de grottes Friars Hole',
    'tribute.contributions.item3':
      'A collaboré avec des organisations spéléologiques internationales pour standardiser les pratiques de mesure',
    'tribute.contributions.item4':
      'Appartenait aux "Gangsta Mappers", un groupe de cartographes guérilleros qui ont recartographié des grottes précédemment explorées avec plus de détails',
    'tribute.contributions.item5':
      'A reçu le prestigieux Prix Karst en mars 2022 du Karst Waters Institute',
    'tribute.contributions.item6':
      'A encadré de nombreux jeunes spéléologues et chercheurs',
    'tribute.contributions.item7':
      "A publié des mises à jour régulières pour s'assurer que la communauté spéléologique avait accès aux informations les plus récentes",
    'tribute.legacy.title': "Poursuivre l'Héritage de Bob",
    'tribute.legacy.p1':
      'Suite au décès de Bob en novembre 2022, son travail est maintenant poursuivi par un successeur dévoué affectueusement connu dans la communauté spéléologique sous le nom de "Little Bob". Engagé à maintenir les mêmes normes élevées de précision et de rigueur que Bob a établies, Little Bob a pris la responsabilité de mettre à jour et d\'élargir la base de données que Bob a si soigneusement construite tout au long de sa vie.',
    'tribute.legacy.p2':
      "CaverBob.org est nommé en l'honneur des deux Bob, servant de mémorial vivant à l'héritage de Robert Gulden tout en assurant que l'œuvre de sa vie continue à bénéficier aux spéléologues, chercheurs et passionnés de grottes du monde entier. Grâce à cette plateforme, le flambeau a été transmis à une nouvelle génération, préservant la ressource inestimable que Bob a créée tout en incorporant la technologie moderne pour la rendre plus accessible que jamais.",
    'tribute.personal.title': 'Vie Personnelle et Souvenir',
    'tribute.personal.p1':
      "L'épouse de Bob, Janice Louise Gulden, l'a précédé dans la mort. Il laisse dans le deuil sa sœur, Margret Noel; son fils, Dustin Robert; sa belle-fille, Nicole Sophia; et ses petits-fils, Odin Dustin et Orion Robert.",
    'tribute.personal.p2':
      'Selon ses souhaits, une partie des cendres de Bob a été répandue dans le North Stream de Friars Hole, où elles peuvent faire leur chemin vers Monster Cavern, un voyage final approprié pour un homme qui a consacré sa vie à explorer et à documenter les merveilles cachées sous nos pieds.',

    // Footer
    'footer.description':
      'Le dépôt central pour les classements mondiaux de grottes, dédié à la mémoire de Robert Gulden.',
    'footer.links': 'Liens Rapides',
    'footer.legal': 'Légal',
    'footer.copyright': 'Tous droits réservés.',

    // Measurement
    'measurement.metric': 'Métrique',
    'measurement.imperial': 'Impérial',

    // Language
    'language.en': 'Anglais',
    'language.es': 'Espagnol',
    'language.fr': 'Français',

    // Table
    'table.search': 'Rechercher des grottes...',
    'table.filter': 'Filtrer',
    'table.terrain.title': 'Filtrer par Type de Terrain',
    'table.terrain.all': 'Tous',
    'table.terrain.none': 'Aucun',
    'table.showing': 'Affichage de',
    'table.of': 'sur',
    'table.caves': 'grottes',
    'table.previous': 'Précédent',
    'table.next': 'Suivant',
    'table.na': 'N/D',

    // Support page
    'support.title': 'Soutenir CaverBob.org',
    'support.description':
      "CaverBob.org est un travail d'amour, dédié à préserver et partager l'héritage du travail de Robert Gulden. Bien que nous soyons engagés à maintenir cette ressource gratuite et accessible à tous, le maintien de la plateforme entraîne certains coûts - de l'enregistrement du domaine aux services d'hébergement.",
    'support.help':
      'Votre soutien, aussi petit soit-il, nous aide à maintenir vivante et en croissance cette ressource précieuse. Chaque contribution fait la différence dans notre mission de documenter et partager les grottes les plus remarquables du monde.',
    'support.coffee': 'Offrez-nous un café',

    // Report Dialog
    'report.title': 'Signaler de Nouvelles Informations',
    'report.description':
      'Aidez-nous à maintenir les informations à jour. Veuillez fournir les détails ci-dessous.',
    'report.reporter': 'Nom du Signaleur',
    'report.contact': 'Informations de Contact',
    'report.contact.placeholder': 'Email ou numéro de téléphone',
    'report.contact.warning':
      'Veuillez fournir des informations de contact précises afin que nous puissions vous contacter si nous devons vérifier les informations.',
    'report.cave': 'Nom de la Grotte',
    'report.info': 'Nouvelles Informations',
    'report.source': 'Source des Données',
    'report.submit': 'Envoyer le Signalement',
    'report.submitting': 'Envoi en cours...',
    'report.success': 'Signalement Envoyé',
    'report.success.description':
      'Merci pour votre contribution. Nous examinerons les informations et les mettrons à jour bientôt.',
    'report.error': 'Erreur',
    'report.error.description':
      "Une erreur est survenue lors de l'envoi du signalement. Veuillez réessayer.",
    'report.button': 'Signaler des Informations',

    // Contact Form
    'contact.title': 'Contactez-nous',
    'contact.description':
      'Vous avez trouvé une erreur ou avez une suggestion ? Nous aimerions avoir de vos nouvelles ! Veuillez utiliser le formulaire ci-dessous pour signaler tout problème ou partager vos idées pour améliorer CaverBob.org.',
    'contact.name': 'Nom',
    'contact.name.placeholder': 'Votre nom',
    'contact.email': 'Email',
    'contact.email.placeholder': 'votre.email@exemple.com',
    'contact.email.warning':
      'Veuillez fournir une adresse email valide pour que nous puissions vous répondre.',
    'contact.subject': 'Sujet',
    'contact.subject.placeholder': "De quoi s'agit-il ?",
    'contact.message': 'Message',
    'contact.message.placeholder':
      "Parlez-nous de l'erreur ou de la suggestion...",
    'contact.submit': 'Envoyer le Message',
    'contact.submitting': 'Envoi en cours...',
    'contact.success': 'Message Envoyé',
    'contact.success.description':
      "Merci pour votre retour. Nous l'examinerons et vous répondrons bientôt.",
    'contact.error': 'Erreur',
    'contact.error.description':
      "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",

    // Version Card
    'version.title': 'Version Actuelle',
    'version.latest.title': 'Dernières Mises à Jour',
    'version.latest.item1':
      "Ajout d'un formulaire de contact pour signaler les problèmes et les suggestions",
    'version.latest.item2':
      "Mise en place d'un système de signalement de nouvelles informations pour les grottes",
    'version.latest.item3': 'Ajout du support de la langue française',
  },
}

export function LanguageProvider({children}: {children: ReactNode}) {
  const [language, setLanguageState] = useState<Language>('en')

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['en', 'es', 'fr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language)
    // Update the html lang attribute
    document.documentElement.lang = language
  }, [language])

  // Translation function
  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    )
  }

  // Set language function
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{language, setLanguage, t}}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
