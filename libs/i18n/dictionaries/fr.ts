import type { Dictionary } from "./en";

export const fr: Dictionary = {
  metadata: {
    root: {
      title: "Museo.mg",
      description: "Maillots vintage d'exception",
    },
  },
  header: {
    home: "Accueil",
    collection: "Collection",
    language: "Langue",
    french: "FR",
    english: "EN",
    switchToFrench: "Passer en français",
    switchToEnglish: "Passer en anglais",
  },
  banner: {
    messages: ["100 % authentique", "Sur commande", "Livraison partout"],
  },
  hero: {
    title: "Découvrez notre collection",
    cta: "Découvrir",
    imageAlts: [
      "Maillot vintage d'exception exposé",
      "Maillot vintage d'exception, pièce centrale",
      "Détail d'un maillot vintage d'exception",
    ],
  },
  home: {
    metadata: {
      title: "Museo.mg — Maillots vintage d'exception",
      description:
        "Des maillots vintage d'exception, sélectionnés comme une archive.",
    },
    lastDrops: "Nos dernières pièces",
    empty: "Commencez votre archive. Découvrez nos pièces actuelles.",
    loading: "Chargement de nos dernières pièces…",
    pause: "Pause",
    play: "Lecture",
    loadError: "Impossible de charger l'archive",
  },
  whyUs: {
    eyebrow: "Le standard Museo",
    title: "Pourquoi Museo",
    subtitle: "Des maillots vintage, élevés au standard d'une galerie.",
    pillars: [
      {
        eyebrow: "Provenance",
        title: "2 ans de confiance",
        description:
          "Une évaluation honnête et des prix justes depuis le premier jour, pour que les collectionneurs sachent exactement ce qu'ils achètent.",
      },
      {
        eyebrow: "L'Archive",
        title: "Plus de 100 maillots en circulation",
        description:
          "Regardez attentivement les tribunes lors d'un match local. Vous y verrez probablement l'un des nôtres.",
      },
      {
        eyebrow: "Dévotion",
        title: "Dirigé par un passionné",
        description:
          "Museo est dirigé par un supporter et collectionneur de toujours, qui traite chaque pièce comme la sienne.",
      },
    ],
  },
  collection: {
    title: "La Collection",
    subtitle: "Chaque pièce de l'archive, prête à être découverte.",
    piecesOne: "pièce",
    piecesMany: "pièces",
    clearFiltersWithCount: "Effacer les filtres ({count})",
    clearFilters: "Effacer les filtres",
    filters: "Filtres",
    noMatches: "Aucune pièce ne correspond à vos filtres.",
    empty: "Commencez votre archive. Découvrez nos pièces actuelles.",
    loading: "Chargement de la collection…",
    refreshing: "Actualisation…",
    pagination: "Pagination",
    previous: "Précédent",
    next: "Suivant",
    pageOf: "Page {page} sur {totalPages}",
    backToHome: "Retour à l'accueil",
    loadError: "Impossible de charger la collection",
    priceRangeError: "Impossible de charger la fourchette de prix",
    somethingWrong: "Une erreur est survenue",
  },
  filters: {
    title: "Filtres",
    close: "Fermer les filtres",
    name: "Nom",
    searchPlaceholder: "Rechercher des pièces…",
    priceRange: "Fourchette de prix",
    unavailable: "Le filtrage par prix est indisponible pour le moment.",
    sort: "Trier",
    orderBy: "Trier par",
    createdDate: "Date de création",
    nameOption: "Nom",
    price: "Prix",
    order: "Ordre",
    descending: "Décroissant",
    ascending: "Croissant",
    reset: "Réinitialiser les filtres",
    minPrice: "Prix minimum",
    maxPrice: "Prix maximum",
  },
  jerseyCard: {
    archivePiece: "Pièce d'archive",
    curated: "Pièce d'archive sélectionnée",
    explore: "Explorer",
    poa: "Prix sur demande",
  },
  detail: {
    loading: "Chargement de cette pièce…",
    loadError: "Impossible de charger cette pièce",
    somethingWrong: "Une erreur est survenue",
    notFound: "Nous n'avons pas pu localiser cet artefact.",
    backToCollection: "Retour à la collection",
    viewImage: "Voir {title}",
    noImage: "Cette pièce attend son témoignage visuel.",
    noDescription: "Cette pièce attend son histoire.",
  },
  footer: {
    tagline: "Archive de maillots vintage d'exception",
    quickLinks: "Liens rapides",
    admin: "Admin",
    faq: "FAQ",
    aboutUs: "À propos",
    aboutHeading: "À propos",
    description:
      "MUSEO sélectionne une collection de maillots vintage authentiques, célébrant les histoires derrière chaque époque du beau jeu.",
    copyright: "© {year} Museo.mg",
  },
  about: {
    metadata: {
      title: "À propos — Museo.mg",
      description:
        "Museo préserve l'héritage culturel du football en rendant les designs de maillots emblématiques accessibles, abordables et authentiques. Découvrez notre histoire, notre approche et nos valeurs.",
    },
    hero: {
      founded: "Fondé en 2024 · Antananarivo, Madagascar",
      title: "À propos de Museo",
      subtitle:
        "L'héritage du football appartient à tous. Nous l'archivons, une pièce à la fois.",
    },
    story: {
      title: "Notre histoire",
      intro: "Museo a été fondé en 2024 avec une conviction singulière : ",
      introStrong: "l'héritage du football appartient à tous.",
      body: "Tout a commencé par une passion personnelle pour la collection de maillots emblématiques, qui est devenue quelque chose de plus grand : la prise de conscience que les pièces les plus légendaires de l'histoire du football sont souvent enfermées, hors de prix, ou en train de disparaître de la mémoire collective.",
      quote:
        "Et si nous pouvions préserver ces artefacts, les reproduire fidèlement et les rendre accessibles aux collectionneurs, aux passionnés et aux supporters ordinaires qui les chérissent véritablement ?",
      closing: "Museo est né de cette question.",
    },
    believe: {
      title: "Ce que nous croyons",
      lead: "Le football est une identité, une mémoire et une fierté culturelle.",
      paragraphOne:
        "Le football est une langue parlée sur tous les continents et un fil qui relie les générations. Un maillot est un artefact. Il porte la sueur des légendes, le rugissement des stades et les larmes des supporters qui ont été témoins de quelque chose d'inoubliable.",
      paragraphTwo:
        "C'est pourquoi les maillots comptent, et pourquoi les histoires qu'ils portent appartiennent à tous, et non à des coffres climatisés ou à quelques privilégiés.",
    },
    approach: {
      title: "Notre approche",
      subtitle: "Pourquoi nous créons des reproductions, et non des originaux.",
      pillars: [
        {
          title: "Préserver sans raréfier",
          description:
            "Les pièces vintage authentiques risquent de se dégrader, de se perdre ou de disparaître dans des collections privées. En reproduisant fidèlement des designs légendaires, ces pièces restent au cœur de la conversation vivante sur la culture du football.",
        },
        {
          title: "L'accès plutôt que l'exclusivité",
          description:
            "L'héritage emblématique du football doit être porté, célébré et transmis, et non enfermé derrière des prix que seule l'élite peut se permettre. Chaque collectionneur et chaque supporter mérite de posséder une part de cette histoire.",
        },
        {
          title: "L'artisanat plutôt que la marchandisation",
          description:
            "Chaque maillot est réalisé avec la même rigueur et le même respect qu'un conservateur de musée applique à une exposition. Ce sont des documents culturels, pas de simples produits.",
        },
      ],
    },
    work: {
      title: "Notre façon de travailler",
      subtitle:
        "De la recherche à vos mains, chaque étape répond à un standard curatorial.",
      steps: [
        {
          title: "Sourcer avec intégrité",
          description:
            "Chaque design commence par une recherche historique exhaustive : archives de fabricants, photographies de matchs, dossiers de design et réseaux de collectionneurs. Nous poursuivons nos recherches jusqu'à pouvoir reproduire une pièce avec une précision archéologique.",
        },
        {
          title: "Fabriquer avec soin",
          description:
            "Nos partenaires en Asie et en Europe sont choisis pour leur capacité à reproduire les matériaux d'origine, les techniques de couture et les détails esthétiques. Cela garantit la fidélité des matières, l'exactitude de la construction, la précision visuelle et une durabilité conçue pour traverser les générations.",
        },
        {
          title: "Présenter avec respect",
          description:
            "Chaque pièce arrive comme une exposition curatée : emballée dans une boîte de qualité archivistique, enveloppée dans du papier de soie de qualité muséale et accompagnée d'un Cartel d'Exposition qui détaille l'année, le joueur, l'équipe et l'héritage que porte le design.",
        },
      ],
    },
    mission: {
      title: "Notre mission",
      text: "Préserver l'héritage culturel du football en rendant les designs de maillots emblématiques accessibles, abordables et authentiques, afin que chaque collectionneur passionné, chaque supporter dévoué et chaque curieux puisse posséder une part des plus grands moments du jeu.",
      valuesTitle: "Nos valeurs",
      values: [
        {
          title: "Raffiné",
          translation: "Élégant",
          description:
            "Chaque détail compte, de la couture à l'emballage en passant par le langage que nous utilisons. Nous visons une excellence discrète et intentionnelle.",
        },
        {
          title: "Artistique",
          translation: "Créatif",
          description:
            "Le football est notre muse. Nous célébrons le génie créatif des fabricants légendaires et la géométrie des maillots classiques. La personne qui porte une pièce en devient le conservateur.",
        },
        {
          title: "Fiable",
          translation: "Digne de confiance",
          description:
            "Dans un marché saturé de médiocrité, nous garantissons l'authenticité et la qualité. Chaque pièce est vérifiée par un expert, et votre confiance est notre plus précieux certificat.",
        },
      ],
    },
    forward: {
      title: "Regarder vers l'avenir",
      subtitle:
        "D'une passion locale à une archive mondiale de l'héritage du football.",
      text: "Fondé en 2024 à Antananarivo, Madagascar, Museo a commencé comme une passion locale. Aujourd'hui, nous nous préparons à dépasser nos frontières, en approfondissant nos racines à Madagascar et sur le continent africain, avec pour objectif de devenir une archive mondiale de l'héritage du football. Où que vous soyez, à Tana, Dakar, São Paulo, Madrid ou Tokyo, votre lien avec l'héritage du football ne devrait pas dépendre de la géographie ou de l'économie.",
      questions: [
        "Et si les maillots étaient traités comme des artefacts dignes d'un musée ?",
        "Et si les designs emblématiques étaient accessibles à tous ?",
        "Et si porter une pièce signifiait comprendre l'histoire, le joueur, le moment qu'elle représente ?",
        "Et si l'héritage du football pouvait passer d'une génération à l'autre, avec soin, respect, connaissance et fierté ?",
      ],
      closing: "Nous vendons des maillots, et nous archivons l'histoire.",
    },
    contact: {
      title: "Nous contacter",
      subtitle:
        "Des questions sur notre mission, nos pièces ou notre façon de travailler ? Nous serions ravis de vous entendre.",
      labels: {
        email: "E-mail",
        location: "Localisation",
        hours: "Horaires",
      },
      values: {
        email: "curator@museo.mg",
        location: "Antananarivo, Madagascar",
        hours: "Lundi–Dimanche, 9h–18h",
      },
      exploreCta: "Explorer la collection",
      faqCta: "Lire la FAQ",
      credits:
        "Fondé par Ny Aina (Kiady Miarintsoa) · Identité de marque et design par Harivelo Rakotoasimbola · Fondé en 2024",
    },
  },
  faq: {
    metadata: {
      title: "FAQ — Museo.mg",
      description:
        "Questions fréquentes sur la collection de maillots vintage de Museo, les commandes, le paiement et nos pratiques de curation.",
    },
    heroTitle: "Questions fréquentes",
    heroSubtitle:
      "Découvrez nos pratiques, nos politiques et la philosophie qui animent Museo.",
    sections: {
      aboutPieces: {
        title: "À propos de nos pièces",
        items: [
          {
            question:
              "S'agit-il de maillots vintage authentiques ou de reproductions ?",
            answer: [
              "Nos pièces sont des reproductions méticuleusement réalisées, et non des originaux vintage. Chaque maillot est commandé et reproduit selon les plus hauts standards d'artisanat, fidèle aux designs patrimoniaux qui définissent l'histoire du football.",
              "Nous avons choisi cette voie délibérément : les pièces vintage authentiques sont souvent fragiles, coûteuses et menacées de disparaître de la circulation. Les reproductions de qualité muséale préservent l'héritage de ces designs emblématiques, les rendent accessibles aux passionnés et collectionneurs authentiques, et permettent à chaque pièce d'être portée et célébrée sans le poids d'une rareté inestimable.",
              "Voyez les choses ainsi : lorsque vous portez un maillot, vous archivez un moment de l'héritage du football, prêt à être transmis à la génération suivante.",
            ],
          },
          {
            question: "Comment la qualité de chaque pièce est-elle contrôlée ?",
            answer: [
              "Chaque maillot fait l'objet d'une inspection rigoureuse avant de quitter notre atelier. Nous vérifions :",
              "• Intégrité des coutures : chaque couture est contrôlée pour sa solidité et sa précision\n• Authenticité des matières : les tissus correspondent à l'époque et aux spécifications d'origine\n• Durabilité des impressions : les graphismes et les numéros résistent au lavage et au temps\n• Fidélité des couleurs : les teintes sont comparées à des références archivistiques",
              "Notre conservateur supervise personnellement le contrôle qualité final. Chaque pièce est accompagnée d'un Cartel d'Exposition détaillant l'héritage du maillot, le joueur qui y est associé, le fabricant d'équipement et le moment historique qu'il représente.",
            ],
          },
        ],
      },
      ordering: {
        title: "Commande et délais",
        items: [
          {
            question:
              "Combien de temps faut-il pour recevoir ma pièce après avoir passé commande ?",
            answer: [
              "De la confirmation de la commande à la livraison, nous prévoyons 2 à 4 semaines pour la fabrication et l'assurance qualité. Ce délai traduit notre souci de précision : l'archive prend le temps qu'il lui faut.",
              "Détail du calendrier :\n• Semaine 1 : Commande confirmée, paiement traité, production lancée\n• Semaines 2–3 : Fabrication, couture, impression, contrôle qualité\n• Semaine 4 : Vérification finale de curation, emballage, préparation à la livraison",
              "Une fois votre pièce prête, nous vous informerons des détails de livraison. Comme nous sommes basés à Antananarivo, la livraison peut prendre un peu plus de temps dans les régions éloignées, et nous vous tiendrons informé tout au long du processus.",
            ],
          },
          {
            question:
              "Et si la pièce que je souhaite est temporairement indisponible ?",
            answer: [
              "Si un design particulier n'est pas en production, nous pouvons discuter d'une commande personnalisée. Dites-nous quelle pièce vous attire, et nous pourrons étudier sa réalisation pour votre collection.",
              "Une commande personnalisée prend plus de temps (généralement 6 à 8 semaines) et nécessite un paiement intégral à l'avance. En contrepartie, la pièce choisie rejoint l'archive Museo.",
              "Contactez directement notre conservateur pour discuter des pièces personnalisées.",
            ],
          },
        ],
      },
      payment: {
        title: "Paiement et livraison",
        items: [
          {
            question: "Comment fonctionne le système de paiement ?",
            answer: [
              "Nous avons conçu un modèle de paiement en deux étapes qui protège à la fois le conservateur et le collectionneur :",
              "Étape 1 : Confirmation de la commande (50 % dus)\nVous réservez votre pièce et confirmez la production en payant 50 % à l'avance. Cela sécurise votre commande et lance la fabrication.\n\nMoyens de paiement acceptés pour l'étape 1 :\n• Mvola (Vodafone Madagascar)\n• Orange Money (Orange Madagascar)\n• Airtel Money (Airtel Madagascar)\n\nEnvoyez-nous votre numéro de mobile et nous vous transmettrons les détails du paiement. Le paiement est instantané, et la production commence dès sa confirmation.",
              "Étape 2 : À la livraison (50 % dus)\nVous réglez les 50 % restants à la réception de votre pièce, au choix :\n• En espèces (échange direct)\n• Par Mobile Money (Mvola, Orange Money ou Airtel Money)\n\nAinsi, vous ne payez jamais intégralement une pièce que vous n'avez pas encore eue entre les mains.",
            ],
          },
          {
            question:
              "Livrez-vous à l'international, ou la livraison est-elle limitée à Madagascar ?",
            answer: [
              "Pour l'instant, nous organisons la livraison à Madagascar, avec un focus sur la région du Grand Antananarivo. Hors de la capitale, l'expédition et les délais peuvent être plus longs, et nous vous donnerons une estimation lors de la commande.",
              "Nous explorons des partenariats pour la livraison internationale, mais nous ne proposons pas encore d'expédition hors de Madagascar. Si vous êtes en dehors de notre région, contactez notre conservateur. Nous pourrons peut-être organiser une logistique personnalisée pour les collections plus importantes.",
            ],
          },
          {
            question:
              "Que se passe-t-il en cas de problème de livraison ou si mon colis est perdu ?",
            answer: [
              "Nous prenons la livraison au sérieux. Lorsque vous passez commande, vous recevez :\n• Une référence de suivi pour votre pièce\n• Une confirmation de livraison lorsque le coursier arrive à votre adresse\n• Notre numéro de contact direct pour toute question pendant la période de livraison",
              "Si un problème de livraison survient (colis perdu, endommagé pendant le transport, etc.), contactez-nous immédiatement avec votre numéro de référence. Nous enquêterons et travaillerons à une solution, même si notre capacité à remplacer ou à relivrer dépend des circonstances.",
              "Remarque : une fois qu'une pièce a été livrée et signée, elle est considérée comme en votre possession et relève de notre politique de vente finale.",
            ],
          },
        ],
      },
      guarantees: {
        title: "Retours et garanties",
        items: [
          {
            question: "Quelle est votre politique de retour et d'échange ?",
            answer: [
              "Toutes les pièces vendues par Museo sont en vente finale. Une fois un maillot livré et reçu, il fait partie de votre collection personnelle et ne peut être ni retourné, ni échangé, ni remboursé.",
              "Pourquoi ? Chaque pièce est commandée spécifiquement pour vous et fabriquée sur mesure avec soin et précision. Comme nous travaillons à la commande, chaque maillot est créé comme un artefact sur mesure plutôt que stocké puis revendu.",
              "Les garanties de qualité restent néanmoins applicables :\n\nSi une pièce arrive avec un défaut de fabrication (couture défaillante, défaut d'impression, problème de matière), documentez-le avec des photos dans les 7 jours suivant la livraison et contactez-nous immédiatement. Nous évaluerons le défaut et, à notre discrétion, nous pourrons :\n• Fournir une pièce de remplacement (fabriquée à nouveau)\n• Offrir un remboursement de l'article défectueux",
              "Les défauts n'incluent pas l'usure normale, les légères variations de couleur dues aux lots de teinture des tissus, ni les imperfections cosmétiques qui n'affectent pas la fonction.",
            ],
          },
          {
            question:
              "Quelles instructions d'entretien dois-je suivre pour préserver ma pièce ?",
            answer: [
              "Votre maillot est un artefact textile. Traitez-le avec le même respect que celui que vous accorderiez à une exposition de musée.",
              "Lavage :\n• Lavage en machine à l'eau froide sur un cycle délicat\n• Utilisez un détergent doux ; évitez l'eau de javel\n• Retournez le maillot pour protéger les graphismes\n• Séchage à l'air libre ; ne pas utiliser de sèche-linge",
              "Rangement :\n• Pliez ou suspendez dans un endroit frais et sec, à l'abri de la lumière directe du soleil\n• Évitez l'humidité excessive ou la chaleur\n• Utilisez du papier sans acide pour un stockage à long terme\n• Inspectez périodiquement pour déceler tout signe d'usure",
              "Présentation :\n• Envisagez un encadrement ou une vitrine pour les pièces de grande valeur sentimentale\n• Tenez-les à l'écart des surfaces rugueuses ou des frottements\n• Évitez de les porter intensivement si vous souhaitez les préserver comme pièces d'exposition",
              "Un entretien approprié permet à votre pièce d'archive de rester éclatante et intacte pendant des décennies, ou d'être transmise à la prochaine génération de collectionneurs.",
            ],
          },
        ],
      },
      aboutMuseo: {
        title: "À propos de Museo",
        items: [
          {
            question:
              "Comment puis-je en savoir plus sur l'histoire d'une pièce spécifique ?",
            answer: [
              "Chaque maillot est accompagné d'un Cartel d'Exposition, une fiche détaillée qui comprend :",
              "• L'Année : quand la pièce était emblématique\n• Le Joueur : la figure légendaire qui l'a portée\n• L'Équipe : la sélection nationale ou le club représenté\n• Le Fabricant : le fabricant d'équipement (Adidas, Nike, Umbro, etc.)\n• Le Contexte historique : le tournoi, le moment ou l'héritage qui a défini cette pièce",
              "Au-delà du cartel, notre conservateur est disponible pour des échanges plus approfondis. Si vous souhaitez en savoir plus sur la lignée du design, le paysage footballistique de l'époque ou l'importance d'une pièce pour l'héritage du football, contactez-nous directement. Nous considérons chaque collectionneur comme un confrère conservateur.",
              "Visitez la section Archive du site pour explorer le catalogue complet, avec le contexte de chaque pièce. Considérez-la comme votre guide de galerie personnel.",
            ],
          },
        ],
      },
    },
    contact: {
      title: "Vous avez encore des questions ?",
      text: "Notre conservateur est là pour vous aider. Contactez-nous directement et parlons de votre collection.",
      cta: "Nous contacter",
      exploreCta: "Explorer la collection",
    },
  },
};
