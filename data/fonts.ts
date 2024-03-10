import { Open_Sans, Roboto, Lato, Montserrat, Oswald, Ubuntu, Raleway, Source_Sans_Pro, Merriweather, Nunito, Playfair_Display, PT_Sans, Inter, Quicksand, Noto_Sans, Josefin_Sans, Pacifico, Comfortaa, Fira_Sans, Exo, Roboto_Condensed, Cabin, Mulish, Arimo, Titillium_Web, Vollkorn, Dancing_Script, Poppins, Baloo_2, Yantramanav, Barlow, Work_Sans, Roboto_Slab, Cinzel, Bitter, Amatic_SC, Karla, Notable, PT_Serif, Noto_Serif, Rubik, Roboto_Mono, Indie_Flower, Cormorant } from "next/font/google";

const openSans = Open_Sans({ weight: "400", subsets: ["latin"], variable: "--font-open-sans" });
const roboto = Roboto({ weight: "400", subsets: ["latin"], variable: "--font-roboto" });
const lato = Lato({ weight: "400", subsets: ["latin"], variable: "--font-lato" });
const montserrat = Montserrat({ weight: "400", subsets: ["latin"], variable: "--font-montserrat" });
const poppins = Poppins({ weight: "400", subsets: ["latin"], variable: "--font-poppins" });
const oswald = Oswald({ weight: "400", subsets: ["latin"], variable: "--font-oswald" });
const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"], variable: "--font-ubuntu" });
const raleway = Raleway({ weight: "400", subsets: ["latin"], variable: "--font-raleway" });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"], variable: "--font-source-sans-pro" });
const merriweather = Merriweather({ weight: "400", subsets: ["latin"], variable: "--font-merriweather" });
const nunito = Nunito({ weight: "400", subsets: ["latin"], variable: "--font-nunito" });
const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"], variable: "--font-playfair-display" });
const ptSans = PT_Sans({ weight: "400", subsets: ["latin"], variable: "--font-pt-sans" });
const inter = Inter({ weight: "400", subsets: ["latin"], variable: "--font-inter" });
const quicksand = Quicksand({ weight: "400", subsets: ["latin"], variable: "--font-quicksand" });
const notoSans = Noto_Sans({ weight: "400", subsets: ["latin"], variable: "--font-noto-sans" });
const josefinSans = Josefin_Sans({ weight: "400", subsets: ["latin"], variable: "--font-josefin-sans" });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" });
const comfortaa = Comfortaa({ weight: "400", subsets: ["latin"], variable: "--font-comfortaa" });
const firaSans = Fira_Sans({ weight: "400", subsets: ["latin"], variable: "--font-fira-sans" });
const exo = Exo({ weight: "400", subsets: ["latin"], variable: "--font-exo" });
const robotoCondensed = Roboto_Condensed({ weight: "400", subsets: ["latin"], variable: "--font-roboto-condensed" });
const cabin = Cabin({ weight: "400", subsets: ["latin"], variable: "--font-cabin" });
const mulish = Mulish({ weight: "400", subsets: ["latin"], variable: "--font-mulish" });
const arimo = Arimo({ weight: "400", subsets: ["latin"], variable: "--font-arimo" });
const titilliumWeb = Titillium_Web({ weight: "400", subsets: ["latin"], variable: "--font-titillium-web" });
const vollkorn = Vollkorn({ weight: "400", subsets: ["latin"], variable: "--font-vollkorn" });
const dancingScript = Dancing_Script({ weight: "400", subsets: ["latin"], variable: "--font-dancing-script" });
const baloo2 = Baloo_2({ weight: "400", subsets: ["latin"], variable: "--font-baloo" });
const yantramanav = Yantramanav({ weight: "400", subsets: ["latin"], variable: "--font-yantramanav" });
const barlow = Barlow({ weight: "400", subsets: ["latin"], variable: "--font-barlow" });
const workSans = Work_Sans({ weight: "400", subsets: ["latin"], variable: "--font-work-sans" });
const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"], variable: "--font-roboto-slab" });
const cinzel = Cinzel({ weight: "400", subsets: ["latin"], variable: "--font-cinzel" });
const bitter = Bitter({ weight: "400", subsets: ["latin"], variable: "--font-bitter" });
const amaticSC = Amatic_SC({ weight: "400", subsets: ["latin"], variable: "--font-amatic-sc" });
const karla = Karla({ weight: "400", subsets: ["latin"], variable: "--font-karla" });
const notable = Notable({ weight: "400", subsets: ["latin"], variable: "--font-notable" });
const ptSerif = PT_Serif({ weight: "400", subsets: ["latin"], variable: "--font-pt-serif" });
const notoSerif = Noto_Serif({ weight: "400", subsets: ["latin"], variable: "--font-noto-serif" });
const rubik = Rubik({ weight: "400", subsets: ["latin"], variable: "--font-rubik" });
const robotoMono = Roboto_Mono({ weight: "400", subsets: ["latin"], variable: "--font-roboto-mono" });
const indieFlower = Indie_Flower({ weight: "400", subsets: ["latin"], variable: "--font-indie-flower" });
const cormorant = Cormorant({ weight: "400", subsets: ["latin"], variable: "--font-cormorant" });

// Create an array containing all font objects with name and loader properties
export const Fonts = [
  { name: 'Open Sans', loader: openSans },
  { name: 'Roboto', loader: roboto },
  { name: 'Lato', loader: lato },
  { name: 'Montserrat', loader: montserrat },
  { name: 'Oswald', loader: oswald },
  { name: 'Ubuntu', loader: ubuntu },
  { name: 'Raleway', loader: raleway },
  { name: 'Source Sans Pro', loader: sourceSansPro },
  { name: 'Merriweather', loader: merriweather },
  { name: 'Nunito', loader: nunito },
  { name: 'Playfair Display', loader: playfairDisplay },
  { name: 'PT Sans', loader: ptSans },
  { name: 'Inter', loader: inter },
  { name: 'Quicksand', loader: quicksand },
  { name: 'Noto Sans', loader: notoSans },
  { name: 'Josefin Sans', loader: josefinSans },
  { name: 'Pacifico', loader: pacifico },
  { name: 'Comfortaa', loader: comfortaa },
  { name: 'Fira Sans', loader: firaSans },
  { name: 'Exo', loader: exo },
  { name: 'Roboto Condensed', loader: robotoCondensed },
  { name: 'Cabin', loader: cabin },
  { name: 'Mulish', loader: mulish },
  { name: 'Arimo', loader: arimo },
  { name: 'Titillium Web', loader: titilliumWeb },
  { name: 'Vollkorn', loader: vollkorn },
  { name: 'Dancing Script', loader: dancingScript },
  { name: 'Poppins', loader: poppins },
  { name: 'Baloo 2', loader: baloo2 },
  { name: 'Yantramanav', loader: yantramanav },
  { name: 'Barlow', loader: barlow },
  { name: 'Work Sans', loader: workSans },
  { name: 'Roboto Slab', loader: robotoSlab },
  { name: 'Cinzel', loader: cinzel },
  { name: 'Bitter', loader: bitter },
  { name: 'Amatic SC', loader: amaticSC },
  { name: 'Karla', loader: karla },
  { name: 'Notable', loader: notable },
  { name: 'PT Serif', loader: ptSerif },
  { name: 'Noto Serif', loader: notoSerif },
  { name: 'Rubik', loader: rubik },
  { name: 'Roboto Mono', loader: robotoMono },
  { name: 'Indie Flower', loader: indieFlower },
  { name: 'Cormorant', loader: cormorant }
];

