import { Project } from './types';
import { BlogTextImage } from '../Blog/TextImage/BlogTextImage';
import { BlogImage } from '../Blog/Image/BlogImage';


export const projects: Project[] = [
  
  
  {
    "title": "Initiation à Unreal Engine et aux Blueprints",
    "date": "janvier 2024",
    "time": "2 semaines",
    "description": "Découverte du moteur Unreal Engine et du développement en Blueprint à travers un jeu de fête foraine.",
    "detailedDescription": () => (
      <>
      <p>Ce projet m'a permis de me familiariser avec le moteur Unreal Engine 5, son workflow et le développement en Blueprints.</p>
      <p>Les spécifications du projet consistaient à réaliser une fête foraine avec diverses attractions et des PNJ visiteurs pouvant naviguer entre elles.</p>

      <p>La transition de Unity vers Unreal Engine n'est pas aisée. Ce dernier aborde le développement de jeux différemment, avec une interface distincte et une courbe d'apprentissage plus raide.
        Cette initiation permet néanmoins de mieux comprendre les avantages d'Unreal Engine.
        Avec une bonne prise en main, ses outils peuvent considérablement accélérer le développement de jeux et semblent plus adaptés aux grandes équipes travaillant sur des projets d'envergure.
        De plus, il offre facilement des effets visuels remarquables avec d'excellentes performances.
      </p>
      <h3>Travail réalisé</h3>
      
      <p>Le jeu implémente :</p> 
      <ul>
        <li>Une attraction de Chamboule-tout</li>
        <li>Des auto-tamponneuses pilotables</li>
        <li>Des IA suivant une routine</li>
        <li>Un menu pause avec redémarrage du niveau</li>
      </ul>
      
      <h4>Chamboule-tout</h4>
      <BlogTextImage
          src="https://drive.google.com/thumbnail?id=1pp6hiJ4WvWumFagWeTCzZubqhJ9PAISN&sz=s1000"
          alt="Mise en avant des objets et interface d'équipement"
          imagePosition="right"
          useP={false}
        >
        <p>Un mini-jeu simple permettant de se familiariser avec la physique, la gestion des objets, l'éclairage et les transitions de gameplay.</p>
        <p>Le joueur dispose de trois balles. La visée se fait à la souris et la force du lancer est déterminée par un curseur qui se déplace de gauche à droite sur une jauge.</p>
        <p>Des effets lumineux se déclenchent lorsque des boîtes de conserve tombent, et le score augmente. Après ses trois lancers, le joueur gagne s'il a fait tomber au moins la moitié des boîtes.</p>
        <p>Le jeu se réinitialise lorsque le joueur retourne dans l'attraction.</p>
      </BlogTextImage>

      <BlogImage
          src="https://drive.google.com/thumbnail?id=1eJqb1ZBvWRFNtJqkJnB2l4BPmTndOzBY&sz=s800"
          alt="Démonstration du mini-jeu"
          width='mid'
        />

      <h4>Auto-tamponneuses</h4>
      <BlogTextImage
          src="https://drive.google.com/thumbnail?id=1hJ8ipwPbxaUJnkVV0bVuYfLP8H7tIFU2&sz=s1000"
          alt="Auto-tamponneuse contrôlée par le joueur"
          imagePosition="right"
          useP={false}
        >
        <p>Cette attraction m'a permis de me familiariser avec la possession d'acteurs et les déplacements basés sur la physique.</p>
        <p>Le joueur entre dans une auto-tamponneuse aléatoire au démarrage de l'attraction et en est éjecté lorsque le véhicule sort de la zone de jeu.</p>
      </BlogTextImage>

      <h4>Gestion des visiteurs</h4>
      <BlogTextImage
          src="https://drive.google.com/thumbnail?id=11e8As9PckXTmT81gs8YpFSvu3rcCBsBK&sz=s1000"
          alt="PNJ entrant et sortant du parc"
          imagePosition="right"
          useP={false}
        >
        <p>J'ai pu me familiariser avec les NavMeshes et les Behaviour Trees en implémentant une IA suivant une routine de visite du parc.</p>
        <p>Les visiteurs sont instanciés à un point d'entrée du parc et disposent d'une liste de destinations possibles.</p>
        <p>Chaque visiteur choisit une destination parmi celles proposées ou un point aléatoire à proximité, puis s'y déplace. Après un certain temps, il peut choisir une nouvelle destination ou se diriger vers la sortie, où il sera détruit.</p>
      </BlogTextImage>
      </>
    ),
    "imageUrl": "https://drive.google.com/thumbnail?id=1a7FOYNEN7zm2s9DnBLsGHAh4QDakSfij&sz=s1000",
    "technologies": ["Unreal Engine 5", "Blueprint"],
    "UrlsTitles": [""],
    "Urls": [""]
  },  





  {
    "title": "Étude des interfaces sur Unity",
    "date": "décembre 2024",
    "time": "2 semaines",
    "description": "Étude des différents types d'interfaces dans un jeu de cuisine (diégétique, HUD, world space, etc.).",
    "detailedDescription": () => (
      <>
      <p>Exploration des interfaces dans les jeux vidéo, appliquée à un prototype sous Unity.</p>
      <p>Le projet visait à concevoir une portion de gameplay pour un jeu de cuisine intégrant divers types d'interfaces et de feedbacks visuels.</p>

      <BlogImage
          src="https://drive.google.com/thumbnail?id=16g6pzxCGALSRT00DoAJNtpy4gnW7_A35&sz=s800"
          alt="Mise en avant des objets et interface d'équipement"
          width='mid'
        />
      
      <h3>Travail réalisé</h3>
      
      <h4>Interactions avec les mains du joueur</h4>
      <BlogTextImage
          src="https://drive.google.com/thumbnail?id=1VvKKb5IYAIy5KVEePQ21IQa8Yy_YqCEP&sz=s1000"
          alt="Mise en avant des objets et interface d'équipement"
          imagePosition="right"
          useP={false}
        >
        <p>La première interface mise en place repose sur l'affichage différentiel des mains du joueur en surimpression. Les objets ramassés y sont également affichés, garantissant leur visibilité permanente.</p>
        <p>La sélection des objets est signalée par une surbrillance générée via un shader.</p>
      </BlogTextImage>

      <h4>Interface en World Space et feedback</h4>
      <BlogTextImage
          src="https://drive.google.com/thumbnail?id=1PRyGVeSflPY_iH3QuSR3pz1l3hSjoC4X&sz=s1000"
          alt="Flamme du four"
          imagePosition="right"
          useP={false}
        >
        <p>Lorsqu'un objet est sélectionné, un panneau contextuel apparaît à proximité, affichant son nom et les actions possibles avec les mains du joueur.</p>
        <p>À l'approche du four, un simple curseur s'affiche, permettant de régler la puissance du feu. Un système de particules adapte l'apparence de la flamme en fonction de la puissance sélectionnée.</p>
      </BlogTextImage>

      <h4>Interface diégétique</h4>
      <BlogTextImage
          src="https://drive.google.com/thumbnail?id=1lEDWP-55QORfUOKZ57lKM_fb3OSU0sWX&sz=s1000"
          alt="Livre de cuisine"
          imagePosition="right"
          useP={false}
        >
        <p>Cette interface prend la forme d'un objet intégré au monde du jeu : un grand livre de cuisine contenant des recettes.</p>
        <p>Des boutons flottants permettent de tourner les pages. Les pages vierges disposent d'un bouton ouvrant un éditeur simple de recettes. Les recettes créées par le joueur peuvent être enregistrées et consultées ultérieurement dans le livre.</p>
      </BlogTextImage>

      </>
    ),
    "imageUrl": "https://drive.google.com/thumbnail?id=1MxUhZAyIHYBXWV2rCRysD3sELN3iXc2i&sz=s1000",
    "technologies": ["Unity 3D", "C#", "UI"],
    "UrlsTitles": [""],
    "Urls": [""]
  },


  {
    "title": "Génération de planète en Shader Graph Unity",
    "date": "décembre 2024",
    "time": "9 jours",
    "description": "Étude du fonctionnement des shaders et de la construction d'un terrain sphérique en utilisant Shader Graph sous Unity.",
    "detailedDescription": () => (
      <>
      <p>Projet universitaire sur les shaders, utilisant les Shader Graphs d'Unity.</p>
      <p>Les spécifications exigeaient un terrain comportant des montagnes, de l'eau, des variations de couleurs selon l'altitude, un cycle jour/nuit, des nuages, ainsi qu'un éclairage diffus et spéculaire. En option, les élèves pouvaient appliquer le shader sur une sphère.</p>
      <p>J'ai relevé le défi en générant une planète dès le départ.</p>
      
      <h3>Travail réalisé</h3>
      <p>La création d'un mesh sphérique est essentielle. À l'aide d'un script, je génère six faces formant un cube que je transforme en sphère. Le rayon et la résolution sont ajustables, permettant un contrôle précis de chaque couche.</p>
      <BlogImage src='https://drive.google.com/thumbnail?id=1-YUeaijaveOVBDIiKSPcZxRPvFJYhDHO&sz=s1000' alt='Éditeur de sphères personnalisées' caption='Éditeur de sphères personnalisées' width='mid'></BlogImage>
      
      <h3>Noises triplanaires</h3>
      <BlogTextImage src='https://drive.google.com/thumbnail?id=1Slzv04TKIRWwES6gZ20IYI4dWrNJGH0-&sz=s1000' alt='Conversion de noises 2D en noises triplanaires' caption='Conversion de noises 2D en noises triplanaires' useP={false}>
        <p>La génération procédurale repose sur des <i>noises</i>, utilisés pour créer des reliefs et motifs naturels. Le problème est que ces noises sont en deux dimensions, provoquant une forte distorsion aux pôles lors de leur projection sur la planète.</p>
        <p>Pour y remédier, j'ai développé une variante triplanaire de chaque noise principal (<i>gradient</i>, <i>voronoi</i> et <i>simple</i>), générant un noise sur les axes x, y et z, puis les combinant pour former une texture 3D homogène.</p>
      </BlogTextImage>
      <p>Ces noises 3D s'adaptent parfaitement à une sphère et constituent la base de ma génération procédurale.</p>

      <h3>Construction de la planète</h3>
      <BlogTextImage src='https://drive.google.com/thumbnail?id=1i2SB2ZruHZxJiIwC3Byz-u_NC7rqy02q&sz=s1000' alt='Timelapse du shader de planète' caption='Timelapse du shader de planète' useP={false} imagePosition='left'>
        <p>La planète est composée de plusieurs couches :</p>
        <ul>
          <li>Le terrain</li>
          <li>L'océan</li>
          <li>L'atmosphère</li>
          <li>Le ciel étoilé</li>
        </ul>
      </BlogTextImage>
      
      <p>Le terrain est le shader le plus complexe, avec des biomes variant selon l'altitude. Un relief supplémentaire est ajouté à certaines zones vertes pour simuler une forêt de pins.</p>
      <p>Cette couche demande une haute résolution. L'absence de tessellation rend la scène exigeante en ressources.</p>
      
      <p>L'océan délimite les continents, avec des vagues dynamiques, une texture d'écume et une lumière d'horizon. L'éclairage diffus a été volontairement omis pour des raisons stylistiques.</p>
      
      <p>L'atmosphère ajoute du réalisme et devait accueillir des nuages, mais je n'ai pas eu le temps de les implémenter.</p>
      
      <p>Enfin, le ciel étoilé est une sphère inversée, dont les faces sont tournées vers l'intérieur.</p>
      
      <p>Une lune statique, avec un matériau de roche cristalline, complète la scène.</p>
      
      <h3>Paramétrage</h3>
      <p>Les shaders incluent de nombreux paramètres influant l'apparence de la planète :</p>
      <BlogTextImage src='https://drive.google.com/thumbnail?id=1gN2f4MnuWxX89fMmeiQLiVYZ-A0_z9G8&sz=s1000' alt='Visualisation des paramètres des noises' caption='Visualisation des paramètres des noises'>
        La force, l'échelle et le mélange des noises modifient la topographie de la planète.
      </BlogTextImage>
      <BlogTextImage src='https://drive.google.com/thumbnail?id=1IM9GsX-PCZ7oSkbHEYYkpp9Af9IOBzyS&sz=s1000' alt='Visualisation des paramètres des biomes' caption='Visualisation des paramètres des biomes' imagePosition='left'>
        La répartition, la couleur et le mélange des biomes transforment l'apparence de la planète.
      </BlogTextImage>
      </>
    ),
    "imageUrl": "https://drive.google.com/thumbnail?id=1-yafYKywjO9St4zmWRw1TO-I2Cf4zmfT&sz=s1000",
    "technologies": ["Unity 3D", "Shader Graph"],
    "UrlsTitles": ["Essayer sur Itch.io", "Télécharger le projet sur GitHub"],
    "Urls": ["https://mr-sim.itch.io/procedural-planet-shader", "https://github.com/Mr-Sim/Unity-Planet-Shader"]
  },

  
  
  {
    "title": "Prototype LiDAR Unity DOTS",
    "date": "novembre 2024",
    "time": "2 semaines",
    "description": "Prototype de gameplay implémentant un scanner LiDAR pour explorer un environnement invisible. Utilisation de la technologie Unity DOTS pour optimiser la gestion et le rendu de milliers de points à l'écran.",
    "detailedDescription": () => (
      <>
        <p>Réalisé dans le cadre d'un travail universitaire portant sur la réalisation d'un jeu Unity 3D en deux semaines.</p>
        <p>J'ai profité de cette occasion pour prototyper une idée de longue date : implémenter un scanner LiDAR optimisé par l'architecture DOTS de Unity.</p>

        <h3>Principe du jeu</h3>
        <p>Le joueur évolue dans un environnement invisible et noir. Grâce à un scanner LiDAR, il peut projeter un grand nombre de points sur les surfaces de l'environnement, dévoilant progressivement la géométrie du terrain. En reconnaissant son environnement en vue à la 3e personne, le joueur peut progresser dans le niveau.</p>
        <BlogTextImage
          src="https://drive.google.com/thumbnail?id=1ZeyNzoieCfEo380FK8A0SpCvj7quSrXQ&sz=s1000"
          alt="LiDAR Prototype screenshot 2"
          imagePosition="left"
          useP={false}
        >
          <p>L'environnement est conçu pour tirer parti du rendu en nuages de points. Les obstacles rencontrés par le scanner créent des ombres, accentuant le relief des surfaces. Plus le joueur scanne une zone, plus elle devient lisible.</p>
        </BlogTextImage>
        <p>Ce jeu reste un prototype, mais j'aimerais le développer davantage dans le futur.</p>

        <h3>Optimisation avec Unity DOTS</h3>
        
        <BlogTextImage
          src="https://drive.google.com/thumbnail?id=1M6U0kF9mFjS0WT85puzUcpdcsm_dWb_C&sz=s1000"
          alt="LiDAR Prototype screenshot 1"
          imagePosition="right"
          useP={false}
        >
          <p>Le rendu en temps réel de centaines de milliers de points est un défi d'optimisation. J'ai choisi d'utiliser l'architecture Unity DOTS, qui offre un bon compromis entre performances et contrôle individuel des points du scanner.</p>
        </BlogTextImage>
        <p>Unity DOTS repose sur trois modules principaux :</p>
        <ul>
            <li><strong>Unity ECS</strong> : une approche orientée données permettant de gérer un grand nombre d'entités tout en maintenant de bonnes performances, idéal pour gérer les nombreux points projetés par le joueur.</li>
            <li><strong>Jobs</strong> : un système de multithreading conçu pour exécuter des opérations en parallèle, optimisé pour fonctionner avec ECS et accélérant les mises à jour des points.</li>
            <li><strong>Burst</strong> : un compilateur transformant le code en langage machine pour maximiser l'efficacité et améliorer considérablement les performances.</li>
        </ul>
        
        <p>Grâce à DOTS, j'ai pu atteindre 500 000 points affichés tout en maintenant plus de 100 fps sur un ordinateur haut de gamme. Avec des optimisations supplémentaires, je pense pouvoir améliorer encore ces performances.</p>

        <h3>Détail des fonctionnalités</h3>
        <ul>
          <li>Exploration libre en vue à la 3e personne</li>
          <li>Prise en charge des manettes et du clavier/souris</li>
          <li>Raccourcis pour activer/désactiver le rendu des textures</li>
          <li>Raccourcis pour activer/désactiver un compteur d'images par seconde</li>
          <li>Raccourcis pour activer/désactiver un compteur de points placés</li>
          <li>Raccourcis pour réinitialiser le niveau ou quitter le jeu</li>
        </ul>
      </>
    ),
    "imageUrl": "https://drive.google.com/thumbnail?id=19a231hD29MvsvKvptu7-i1lkAn_18nXu&sz=s1000",
    "technologies": ["Unity 3D", "Unity DOTS", "C#"],
    "UrlsTitles": ["Télécharger sur Itch.io"],
    "Urls": ["https://mr-sim.itch.io/lidar-prototype"]
  },


  
  {
    "title": "Game Jam platformer 2D mobile",
    "date": "novembre 2024",
    "time": "2 jours",
    "description": "45 heures pour produire un jeu mobile sur le thème de l'enfance, en collaboration avec les camarades des branches technique, business et artistique.",
    "detailedDescription": () => (
      <>
        <p>À l'occasion de la Game Jam organisée par le Gaming Campus, je me suis associé avec des camarades développeurs, artistes et business man, dans l'objectif de réaliser un jeu mobile en 45 heures.</p>
        <p>En plus du travail d'équipe organisé et de la gestion de projet, cette expérience nous a permis de nous entraîner au storytelling et au level design en travaillant la narration du jeu et la progression du joueur.</p>
        <p>L'expérience était formidable mais éprouvante, codant non-stop pendant nos nuits blanches les composants de notre jeu. La dernière ligne droite s'est malheureusement soldée par un échec : l'assemblage des parties fonctionnelles du jeu ne s'est pas passé comme prévu et l'ensemble n'était pas fonctionnel lors de la présentation.</p>

        <p>J'ai pris quelques heures supplémentaires suite à cette Game Jam pour corriger nos erreurs et faire fonctionner le jeu afin qu'il soit présentable, voici l'état final :</p>
        
        <h3>Principe du jeu</h3>
        <p>Le thème de la Game Jam était "Jeux d'enfants". Notre idée s'est orientée vers un platformer 2D symbolisant l'imagination d'un enfant jouant dans sa chambre en utilisant les objets dont il dispose avec ingéniosité.</p>
        <p><strong>Le jeu possède une histoire</strong> dont la narration s'inspire des jeux "souls-like" du studio FromSoftware ; c'est-à-dire que le joueur peut deviner le sens du jeu et son background grâce à la lecture de la description des objets dont il dispose.</p>
        <p>En résumé, le joueur incarne la figurine de soldat d'un enfant qui s'amuse dans sa chambre, pensant à son père parti sur le front. Guidé par un désir de retrouvaille, l'enfant joue avec la figurine sur un parcours périlleux, ayant à la clé ce qui se rapproche le plus de ces retrouvailles tant désirées.</p>
        
        <BlogTextImage src="https://drive.google.com/thumbnail?id=1uBmot2Dzpaqdk6xQr2KDYVZXIb7Wi-g4&sz=s1000"
            alt="Rule The Room Trailer"
            imagePosition="right"
            useP={false}>
          <p>Le joueur pilote directement la figurine de soldat. Sa progression dans le niveau est pavée d'objets divers qu'il apprendra à utiliser pour se frayer un chemin vers l'arrivée. Il comprendra vite qu'il peut combiner certains objets pour en créer de nouveaux ayant une fonction entièrement différente. Par exemple, la combinaison d'un crayon et d'une gomme donne un marteau improvisé.</p>
        </BlogTextImage>
        <p>Les objets que pourra utiliser le joueur au cours de sa progression sont : </p>
        <ul>
          <li>Un crayon qui révèle la direction à prendre,</li>
          <li>Une gomme rebondissante qui permet de rejoindre une plateforme distante,</li>
          <li>Un marteau qui permet de détruire des obstacles barrant la route,</li>
          <li>Une règle qui permet de faire un pont ou une rampe,</li>
          <li>Un rouleau de scotch qui permet de faire du walljump,</li>
          <li>Un avion improvisé qui constitue une plateforme se déplaçant horizontalement.</li>
        </ul>

        <p>Les décors ont été entièrement réalisés à la main par notre camarade artiste qui a au préalable créé chaque modèle en 3D. L'histoire, la narration, le design et la présentation du jeu ont été faits en collaboration avec notre camarade de la branche business.</p>
      </>
    ),
    "imageUrl": "https://drive.google.com/thumbnail?id=1JdgFWz7uzSuhIKJ0yJG7mQzIMVbv8f1h&sz=s1000",
    "technologies": ["Unity 2D", "C#"],
    "UrlsTitles": ["Télécharger sur Itch.io"],
    "Urls": ["https://mr-sim.itch.io/rule-the-room"]
  },



  {
    title: "RTS avec IA multicouche",
    date: "novembre 2024",
    time: "3 semaines",
    description: "Une étude sur l'IA à travers un jeu Unity 2D où des bots s'affrontent dans un RTS simple.",
    detailedDescription: () => (
      <>
      <p>Ce jeu est le résultat d'un projet scolaire sur l'étude de l'IA, réalisé en collaboration avec ma coéquipière Anna. Tous les sprites du jeu ont également été dessinés par Anna.</p>
      <p>Itch.io d'Anna : <a href="https://aiskal.itch.io/">https://aiskal.itch.io/</a></p>
      
      <h3>Qu'est-ce que ce jeu ?</h3>
      <p>Shapes of War est un jeu sans joueur, qui se joue de manière autonome, un peu comme une simulation. Il met en œuvre des IA multicouches qui se battent dans un STR de base pour le contrôle des ressources sur la carte.</p>
      <BlogTextImage src="https://drive.google.com/thumbnail?id=1gzc6r5JQEFDNWuQCc4DMCvExXVGn7rcC&sz=s1000"
          alt="Shapes of war screenshot 1"
          imagePosition="right"
          useP={false}>
        <p>4 équipes participent à une partie, toutes contrôlées par une instance d'IA. Chaque équipe génère continuellement des unités en fonction des ressources disponibles et peut envoyer ces unités pour conquérir et défendre des objectifs. Les ressources ne sont présentes que dans des extracteurs disséminés sur la carte, représentant des points stratégiques majeurs.</p>
      </BlogTextImage>
      <p>Les IA sont composées de 3 couches qui pilotent les différents acteurs d'une équipe :</p>
      
      <h3>La couche principale</h3>
      <p>Cette couche contrôle l'équipe elle-même. C'est le centre de décision. Elle est composée de plusieurs modules qui analysent le jeu et décident des besoins que l'équipe doit satisfaire. Par exemple, le module de gestion des ressources analyse périodiquement les stocks de ressources et décide de la ressource dont l'équipe a le plus besoin.</p>
      <p>Chaque besoin identifié est placé dans une file d'attente avec une priorité estimée. Un autre module sélectionne périodiquement un besoin dans la file d'attente et lance la tâche en affectant les ressources disponibles. Par exemple, si le besoin d'obtenir la ressource « triangle » est déclaré, les extracteurs produisant cette ressource sont analysés et triés selon leur distance, les forces ennemies proches, les quantités de ressources disponibles, etc.</p>
      <p>Lorsqu'un objectif de conquête spécifique est créé, un bataillon est assigné à cet objectif, et des unités sont sélectionnées pour le mener à bien.</p>
      <p>Pour apporter de la diversité à l'IA des équipes, la notion de <strong>caractère</strong> est ajoutée pour créer des modificateurs aux algorithmes de prise de décision. Le caractère est basé sur une valeur aléatoire comprise entre 0,5 et 1,5 pour chacun des sept péchés capitaux : Colère, Cupidité, Envie, Orgueil, Gloutonnerie, Paresse et Luxure.</p>
      <p>Nous utilisons ces valeurs comme bon nous semble dans nos algorithmes de prise de décision, de sorte que deux équipes ne se comportent jamais de la même manière. Par exemple, des traits comme la Paresse augmenteront certains temps de recharge ou réduiront l'intérêt pour des objectifs éloignés ; l'Envie rendra l'équipe plus agressive envers les objectifs contrôlés par l'équipe adverse ; et ainsi de suite.</p>
      
      <h3>La couche bataillon</h3>
      <p>Chaque bataillon est contrôlé par la deuxième couche d'IA. Un bataillon organise des unités autour d'un objectif unique. Il est censé réagir dynamiquement à l'environnement et mettre à jour ses objectifs immédiats en temps réel, mais ce comportement n'a pas encore été implémenté. Le bataillon sert donc uniquement à gérer les unités qu'il regroupe.</p>
      
      <h3>La couche des unités</h3>
      <BlogTextImage src="https://drive.google.com/thumbnail?id=1ihr3xQqVbpbCOD6yigdOtZ5kRB0udSjE&sz=s1000"
          alt="Shapes of war screenshot 2"
          imagePosition="left"
          useP={false}>
      <p>Chaque unité est contrôlée par la troisième couche d'IA. Les unités se comportent de deux manières :</p>
      <ul>
        <li>Se déplacer vers l'objectif</li>
        <li>Patrouiller autour de l'objectif</li>
      </ul>
      </BlogTextImage>
      <p>Au cours de ces deux phases, une unité peut attaquer une entité adverse, ce qui déclenche un combat.</p>
      <p>Il existe 4 types d'unités, chacune utilisant une combinaison différente de ressources :</p>
      <ul>
        <li>Le sous-fifre : unité de base avec des statistiques simples.</li>
        <li>L'attaquant : unité plus faible, mais avec des capacités d'attaque accrues.</li>
        <li>Le défenseur : pas d'attaque, mais très résistant, utilisé comme appât dans les batailles.</li>
        <li>Le soigneur : il se tient à l'écart des ennemis et soigne les alliés.</li>
      </ul>
      </>),
    imageUrl: "https://drive.google.com/thumbnail?id=1wxiD051E9Yuze1vYuufNi_H_pwRF4pzZ&sz=s1000",
    
    technologies: ["Unity 2D", "C#"],
    UrlsTitles : ["Télécharger sur Itch.io"],
    Urls : ["https://mr-sim.itch.io/shapes-of-war"],
  },


  {
    title: "Développement de bots pour un jeu",
    date: "mai 2024",
    time: "5 mois",
    description: "Projet annuel de fin de BUT Informatique. Nous avons reproduit le jeu Jetpack Joyride et développé des bots capables de jouer dans le but de comparer leurs performances.",
    detailedDescription: () => (
      <>
      <p>Ce jeu est le sujet de notre projet annuel de fin de BUT Informatique, sur lequel j'ai travaillé avec deux camarades. Un lien vers le rapport de projet est disponible en bas de page.</p>
      <p>Le BUT Informatique n'étant pas une formation spécialisée en jeux vidéo, ce projet représente un défi et constitue notre première expérience concrète dans le développement d'un jeu vidéo complet.</p>
      <p>Notre objectif était de reproduire le jeu Jetpack Joyride sur Unity, d'y implémenter des bots, ainsi qu'un système de récolte et d'analyse des données de jeu afin de comparer les performances des différents bots.</p>

      <p>Les assets du jeu ont été réalisés par nos soins. Dino, la peluche mascotte de notre promotion, incarne l'avatar du jeu.</p>
      <p>Dans un souci de modularité et de flexibilité, nous avons choisi une architecture très modulaire, reposant largement sur les design patterns Observer et Singleton. Cela permettrait à un utilisateur d'injecter facilement de nouveaux bots dans le jeu.</p>
      
      <h3>Principe du jeu</h3>
      <p>Le joueur, qu'il soit humain ou bot, contrôle son avatar avec une seule commande : monter. Le joueur peut activer le jetpack pour prendre de l'altitude ou le désactiver pour redescendre.</p>
      <BlogTextImage src="https://drive.google.com/thumbnail?id=16_69fneDDOt-AlNs6zC_94MXdk35uf9i&sz=s1000"
          alt="Jetpack Dinoride Screenshot 1"
          imagePosition="right"
          useP={false}>
        <p>Le niveau défile automatiquement et le joueur doit éviter les obstacles à l'aide de son jetpack.</p>
        <p>Les obstacles incluent des motifs de lasers jaunes, des missiles et des pièces malus, qui font baisser le score du joueur en cas de contact.</p>
        <p>Le score du joueur augmente au fur et à mesure et lorsqu'il récupère des bonus.</p>
        <p>Le joueur est éliminé si son score atteint 0.</p>
      </BlogTextImage>

      <BlogTextImage src="https://drive.google.com/thumbnail?id=1w9m1D7eeal5JGFTN2OojMKKmK2ga8v1H&sz=s1000"
          alt="Jetpack Dinoride configuration screen"
          imagePosition="left"
          useP={false}>
      <p>Avant chaque session de jeu, l'utilisateur a accès à un écran de configuration pour définir les paramètres suivants :</p>
      <ul>
        <li>Quels joueurs sont activés (bots, joueur humain)</li>
        <li>Nombre de rounds, durée de la session, distance maximale par round</li>
        <li>Quels éléments sont inclus ou exclus du niveau</li>
        <li>Paramètres de génération aléatoire (seed)</li>
      </ul>
      <p>Une boîte de dialogue fournit des explications pour chaque paramètre survolé.</p>
      </BlogTextImage>

      <BlogTextImage src="https://drive.google.com/thumbnail?id=1fbEGgGaeOa0TETQFqSzPTWJ2M6zsj24B&sz=s1000"
          alt="Shapes of war screenshot 1"
          imagePosition="right"
          useP={false}>
        <p>Tout au long de chaque round, des données de jeu sont récupérées : Score des joueurs, obstacles générés, obstacles touchés, temps passé en l'air, etc. Ces données sont stockées au format JSON.</p>
        <p>Une interface dédiée à l'analyse des statistiques permet d'examiner les données de jeu collectées.</p>
        <p>Les données sont regroupées par session. Le graphique peut afficher simultanément jusqu'à 4 rounds d'une même session et montre l'évolution du score de chaque joueur au fil du temps.</p>
        <p>Plus de graphiques d'analyse étaient prévus mais n'ont pas pu être finalisés faute de temps.</p>
      </BlogTextImage>
      
      <h3>Les Bots</h3>
      
      <p>Lors de la configuration d'une partie, un ou plusieurs joueurs peuvent être sélectionnés pour jouer simultanément. Les choix incluent le joueur humain contrôlable par l'utilisateur, ainsi que trois bots aux concepts différents :</p>
      <p>Voici les trois bots implémentés dans le jeu :</p>
      <ul>
        <li><strong>L'observateur :</strong> Ce bot se base sur l'analyse des raycasts pour simuler un champ de vision. Il utilise un réseau neuronal mis en place avec la bibliothèque ML-Agents. Le bot a passé une phase d'entraînement pour atteindre ses performances actuelles.</li>
        <li><strong>L'itérateur :</strong> Ce bot repose sur un raisonnement algorithmique et non neuronal. L'idée initiale était de lui faire effectuer plusieurs itérations de calcul pour prévoir un chemin optimal via l'algorithme Min-Max. Faute de temps, nous avons modifié le concept pour en faire une version algorithmique du bot Observateur. Il utilise donc plusieurs raycasts, avec des poids prédéterminés pour chaque rayon, afin de décider de la trajectoire la plus sûre. Ce bot est le plus performant des trois.</li>
        <li><strong>L'omnicient :</strong> Ce bot avait pour ambition de créer un réseau neuronal nourri de nombreuses données brutes sur la position des obstacles, la position du joueur, les vitesses relatives, etc., dans l'espoir de générer un raisonnement et un comportement de survie efficace. Faute de temps, nous n'avons pu implémenter qu'une trajectoire totalement aléatoire, ce qui en fait le bot le moins performant et le plus décevant.</li>
      </ul>
      </>),
    imageUrl: "https://drive.google.com/thumbnail?id=11ixCQoyENdFgzO_dL-Q_07-DLjR-DEIV&sz=s1000",
    
    technologies: ["Unity 2D", "C#", "ML-Agents"],
    UrlsTitles: ["Essayer sur Itch.io", "Voir le rapport de projet"],
    Urls: ["https://mr-sim.itch.io/jetpack-dinoride", "https://drive.google.com/file/d/1GtUL38FhM_krCUuu1dpgm9YZv1QQogcw/view?usp=sharing"],
  }

];