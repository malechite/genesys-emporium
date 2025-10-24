import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Font Faces */
  @font-face {
    font-family: 'Bebas Neue';
    src: url('/assets/fonts/BebasNeueBold.woff2') format('woff2'),
         url('/assets/fonts/BebasNeueBold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bebas Neue';
    src: url('/assets/fonts/BebasNeueRegular.woff2') format('woff2'),
         url('/assets/fonts/BebasNeueRegular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url('/assets/fonts/AvenirNextLTPro-Regular.woff2') format('woff2'),
         url('/assets/fonts/AvenirNextLTPro-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url('/assets/fonts/AvenirNextLTPro-Bold.woff2') format('woff2'),
         url('/assets/fonts/AvenirNextLTPro-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Minion Pro';
    src: url('/assets/fonts/MinionPro-Regular.woff2') format('woff2'),
         url('/assets/fonts/MinionPro-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Minion Pro';
    src: url('/assets/fonts/MinionPro-Bold.woff2') format('woff2'),
         url('/assets/fonts/MinionPro-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'American Captian';
    src: url('/assets/fonts/american-captain-webfont.woff2') format('woff2'),
         url('/assets/fonts/american-captain-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Archistico';
    src: url('/assets/fonts/archistico_simple.woff2') format('woff2'),
         url('/assets/fonts/archistico_simple.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Archistico';
    src: url('/assets/fonts/archistico_bold.woff2') format('woff2'),
         url('/assets/fonts/archistico_bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Charis SIL';
    src: url('/assets/fonts/CharisSIL.woff2') format('woff2'),
         url('/assets/fonts/CharisSIL.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Charis SIL';
    src: url('/assets/fonts/CharisSIL-Bold.woff2') format('woff2'),
         url('/assets/fonts/CharisSIL-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bolton';
    src: url('/assets/fonts/Bolton.woff2') format('woff2'),
         url('/assets/fonts/Bolton.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bolton';
    src: url('/assets/fonts/BoltonBold.woff2') format('woff2'),
         url('/assets/fonts/BoltonBold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bolton';
    src: url('/assets/fonts/BoltonItalic.woff2') format('woff2'),
         url('/assets/fonts/BoltonItalic.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Bolton';
    src: url('/assets/fonts/BoltonBoldItalic.woff2') format('woff2'),
         url('/assets/fonts/BoltonBoldItalic.woff') format('woff');
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: 'Adobe Garamond Pro';
    src: url('/assets/fonts/AGaramondPro-Bold.woff2') format('woff2'),
         url('/assets/fonts/AGaramondPro-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Adobe Garamond Pro';
    src: url('/assets/fonts/AGaramondPro-Regular.woff2') format('woff2'),
         url('/assets/fonts/AGaramondPro-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Adobe Garamond Pro';
    src: url('/assets/fonts/AGaramondPro-Italic.woff2') format('woff2'),
         url('/assets/fonts/AGaramondPro-Italic.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Adobe Garamond Pro';
    src: url('/assets/fonts/AGaramondPro-BoldItalic.woff2') format('woff2'),
         url('/assets/fonts/AGaramondPro-BoldItalic.woff') format('woff');
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: 'Khand';
    src: url('/assets/fonts/khand-bold-webfont.woff2') format('woff2'),
         url('/assets/fonts/khand-bold-webfont.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Khand';
    src: url('/assets/fonts/khand-light-webfont.woff2') format('woff2'),
         url('/assets/fonts/khand-light-webfont.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Khand';
    src: url('/assets/fonts/khand-medium-webfont.woff2') format('woff2'),
         url('/assets/fonts/khand-medium-webfont.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Khand';
    src: url('/assets/fonts/khand-regular-webfont.woff2') format('woff2'),
         url('/assets/fonts/khand-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Khand';
    src: url('/assets/fonts/khand-semibold-webfont.woff2') format('woff2'),
         url('/assets/fonts/khand-semibold-webfont.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }

  /* CSS Variables */
  body {
    --orange: rgb(255, 122, 22);
    --lightblue: rgb(89, 163, 217);
    --darkblue: rgb(19, 100, 185);
    --gray: rgb(247, 245, 242);
    --brown: rgb(179, 151, 123);
    --red: rgb(148, 45, 37);
    --difficulty: rgb(82, 40, 126);
    --challenge: rgb(117, 19, 23);
    --boost: rgb(118, 205, 219);
    --ability: rgb(70, 172, 78);
    --proficiency: rgb(254, 240, 53);
    --orangeFade: rgba(255, 122, 22, 0.2);
    --lightblueFade: rgba(89, 163, 217, 0.2);
  }

  /* Base Styles */
  hr {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    border: 0;
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }

  table {
    vertical-align: middle;
  }

  thead {
    font-weight: 600;
  }

  label {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
    padding-right: 0 !important;
  }

  .table th {
    padding: 0.4rem;
  }

  .table td {
    padding: 0.4rem;
  }

  .table-career {
    text-align: center;
  }

  .table-rank {
    text-align: center;
  }

  .table-name {
    text-align: left;
  }

  /* Remove number input spinners */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  /* Utility Classes */
  .text-pre {
    white-space: pre-line;
  }

  .w-10 { width: 10%; }
  .w-20 { width: 20%; }
  .w-30 { width: 30%; }
  .w-40 { width: 40%; }
  .w-60 { width: 60%; }
  .w-70 { width: 70%; }
  .w-80 { width: 80%; }
  .w-90 { width: 90%; }

  /* React Tabs Styling */
  .react-tabs__tab-list {
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #aaa;
    margin: 0 0 10px;
    padding: 0;
  }

  .react-tabs__tab {
    display: inline-block;
    border: 1px solid transparent;
    border-bottom: none;
    bottom: -1px;
    position: relative;
    list-style: none;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .react-tabs__tab--selected {
    background: var(--gray);
    border-color: #aaa;
    color: black;
    border-radius: 5px 5px 0 0;
  }

  .react-tabs__tab--disabled {
    color: GrayText;
    cursor: default;
  }

  .react-tabs__tab:focus {
    box-shadow: 0 0 5px hsl(208, 99%, 50%);
    border-color: hsl(208, 99%, 50%);
    outline: none;
  }

  .react-tabs__tab:focus:after {
    content: "";
    position: absolute;
    height: 5px;
    left: -4px;
    right: -4px;
    bottom: -5px;
    background: #fff;
  }

  .react-tabs__tab-panel {
    display: none;
  }

  .react-tabs__tab-panel--selected {
    display: block;
  }

  /* Vehicle Stat Block */
  .VehicleStatBlock {
    position: relative;
    text-align: center;
    color: black;
    padding: 0;
    margin: 0.15rem;
    width: 40rem;
  }

  .vehicleStat {
    position: absolute;
    display: inline-flex;
    align-items: center;
    transform: translate(-50%, -50%);
    flex: unset;
    padding: 0 0;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .vehicleStat-silhouette {
    top: 27%;
    left: 8.5%;
    font-size: 2.5rem;
  }

  .vehicleStat-maxSpeed {
    top: 27%;
    left: 24.5%;
    font-size: 2.5rem;
  }

  .vehicleStat-handling {
    top: 27%;
    left: 40.9%;
    font-size: 2.5rem;
  }

  .vehicleStat-defense {
    top: 27%;
    left: 61.5%;
  }

  .vehicleStat-armor {
    top: 27%;
    left: 85%;
  }

  .vehicleStat-hullTraumaThreshold {
    top: 78.5%;
    left: 57%;
  }

  .vehicleStat-systemStrainThreshold {
    top: 78.5%;
    left: 81%;
  }

  .vehicleStat-currentHullTrauma {
    top: 77.5%;
    left: 65%;
    width: 2.2rem;
    font-size: 1.2rem;
  }

  .vehicleStat-currentSystemStrain {
    top: 77.5%;
    left: 89%;
    width: 2.2rem;
    font-size: 1.2rem;
  }

  /* App-specific styles */
  .form-check-label {
    margin-bottom: 0;
    vertical-align: middle;
  }

  .header {
    font-size: 1.25rem;
    margin-bottom: 0;
    margin-top: 0.5rem;
    line-height: 1.2;
    color: inherit;
    font-weight: bold;
  }

  .theme-select-container {
    position: relative;
  }

  .print-button-container {
    position: absolute;
    right: 0;
  }

  .noUnderLine,
  .noUnderLine:hover,
  .noUnderLine:focus {
    text-decoration: none;
  }

  .textSymbols {
    vertical-align: middle;
    height: 1.2rem;
  }

  .characterImage {
    max-height: 18rem;
    object-fit: contain;
  }

  .svg {
    width: 100%;
  }

  .absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .talentDesc {
    overflow-y: auto;
    white-space: pre-line;
  }

  .row-hide {
    display: none;
  }

  .talentCard {
    width: 10rem;
    height: 11rem;
  }

  .motivationCard {
    min-width: 45%;
  }

  .ffi {
    vertical-align: middle;
    font-size: 1.4rem;
  }

  .ffi-d6 {
    letter-spacing: 0;
  }

  .ffi-border {
    -webkit-text-stroke-color: black;
    -webkit-text-stroke-width: 0.1rem;
  }

  .bg {
    position: fixed;
    background-size: contain;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .imageBox {
    position: relative;
    text-align: center;
    color: black;
    padding: 0;
    margin: 0.15rem;
    width: 6rem;
  }

  .attribute {
    width: 10rem;
    height: 5.5rem;
  }

  .xpBox {
    width: 8rem;
  }

  .totalXP {
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 1;
  }

  .availableXP {
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 1;
  }

  .attributeValue {
    position: absolute;
    display: inline-flex;
    align-items: center;
    font-size: 1.5rem;
    top: 55%;
    left: 57%;
    transform: translate(-50%, -50%);
    flex: unset;
    padding: 0 0;
    font-weight: bold;
  }

  .attributeInput {
    font-size: 1.2rem;
    width: 2rem;
    height: 2rem;
    padding: 0;
    text-align: center;
  }

  .characteristicValue {
    position: absolute;
    font-size: 2.5rem;
    top: 39%;
    left: 62.5%;
    transform: translate(-50%, -50%);
    flex: unset;
    font-weight: bold;
  }

  .xpValue {
    position: absolute;
    font-size: 2rem;
    font-weight: bold;
    top: 45%;
    left: 60%;
    transform: translate(-50%, -50%);
    flex: unset;
  }

  /* CRB Theme */
  .body-CRB {
    font-family: 'Avenir Next LT Pro', sans-serif !important;
  }

  .header-CRB {
    font-family: 'Bebas Neue', sans-serif !important;
    font-size: 1.75rem;
  }

  .bg-CRB {
    background-image: url(/assets/images/CRB/background.png);
  }

  .attributeValue-CRB-Wounds,
  .attributeValue-CRB-Defense,
  .attributeValue-CRB-Soak,
  .attributeValue-CRB-Strain {
    left: 59%;
  }

  .characteristicValue-CRB {
    top: 37%;
    left: 65%;
  }

  /* ROT Theme */
  .bg-ROT {
    background-image: url(/assets/images/ROT/background.png);
  }

  .body-ROT {
    font-family: 'Adobe Garamond Pro', sans-serif !important;
  }

  .header-ROT {
    font-family: 'Bolton', sans-serif !important;
    font-size: 1rem;
  }

  .xpValue-ROT {
    top: 36%;
  }

  .attributeValue-ROT-Wounds,
  .attributeValue-ROT-Soak,
  .attributeValue-ROT-Defense,
  .attributeValue-ROT-Strain {
    top: 58%;
    left: 58%;
  }

  .characteristicValue-ROT {
    left: 65.5%;
    top: 41%;
  }

  /* SOTB Theme */
  .bg-SOTB {
    background: url(/assets/images/SOTB/background.png) center;
  }

  .body-SOTB {
    font-family: 'Avenir Next LT Pro', sans-serif !important;
  }

  .header-SOTB {
    font-family: 'Bebas Neue', sans-serif !important;
    font-size: 1.75rem;
  }

  .characteristicValue-SOTB {
    top: 36%;
    left: 65.5%;
  }

  .xpValue-SOTB {
    top: 70%;
  }

  .attributeValue-SOTB-Wounds,
  .attributeValue-SOTB-Soak,
  .attributeValue-SOTB-Defense,
  .attributeValue-SOTB-Strain,
  .attributeValue-SOTB-StrainThreshold,
  .attributeValue-SOTB-WoundsThreshold {
    top: 61%;
    left: 58%;
  }

  /* Keyforge Theme */
  .bg-KF {
    background-image: url(https://ul-emporium.imgix.net/backgrounds/emporium-kf-background-01.jpg?w=500&h=500);
    background-size: 500px 500px;
    background-position: center;
  }

  .body-KF {
    font-family: 'Khand', sans-serif !important;
  }

  .body-KF .attribute {
    width: 10.5em;
    position: relative;
  }

  .body-KF .attribute::before {
    position: absolute;
    display: block;
    top: 4px;
    left: 0;
    right: 0;
    color: white;
    font-size: 18px;
  }

  .body-KF .attribute-wounds::before {
    content: 'WOUNDS';
  }

  .body-KF .attribute-strain::before {
    content: 'STRAIN';
  }

  .body-KF .attribute-soak::before {
    content: 'SOAK';
  }

  .body-KF .attribute-defense::before {
    content: 'DEFENSE';
  }

  .body-KF .attribute::after {
    position: absolute;
    display: block;
    bottom: 0;
    left: 24px;
    color: white;
    font-size: 13px;
  }

  .body-KF .attribute-wounds::after,
  .body-KF .attribute-strain::after,
  .body-KF .attribute-defense::after {
    content: 'THRESHOLD    CURRENT';
    white-space: pre;
  }

  .body-KF .characteristic::before {
    position: absolute;
    display: block;
    bottom: 5px;
    left: 0;
    right: 0;
    color: white;
    font-size: 18px;
  }

  .body-KF .characteristic-Brawn::before {
    content: 'BRAWN';
  }

  .body-KF .characteristic-Agility::before {
    content: 'AGILITY';
  }

  .body-KF .characteristic-Intellect::before {
    content: 'INTELLECT';
  }

  .body-KF .characteristic-Cunning::before {
    content: 'CUNNING';
  }

  .body-KF .characteristic-Willpower::before {
    content: 'WILLPOWER';
  }

  .body-KF .characteristic-Presence::before {
    content: 'PRESENCE';
  }

  .body-KF .attribute-WoundsThreshold::before {
    content: 'WOUND THRESHOLD';
  }

  .body-KF .attribute-StrainThreshold::before {
    content: 'STRAIN THRESHOLD';
  }

  .header-KF {
    font-family: 'Khand', sans-serif !important;
    font-size: 1.75rem;
  }

  .attributeValue-KF-Wounds,
  .attributeValue-KF-Defense,
  .attributeValue-KF-Soak,
  .attributeValue-KF-Strain {
    left: 59%;
  }

  .characteristicValue-KF {
    top: 37%;
    left: 65%;
  }

  .body-KF .xpValue {
    top: 35%;
    left: 63%;
  }

  /* Mobile Styles */
  @media only screen and (max-width: 480px) {
    .table {
      font-size: 0.7rem;
    }

    .fontSizeSmall {
      font-size: 0.5rem;
    }

    .talentCard {
      width: 16vw;
      height: 12vh;
      font-size: 0.5rem;
    }

    .motivationCard {
      width: 100%;
    }

    .ffi {
      font-size: 1rem;
    }

    .overflowX {
      overflow-x: scroll;
    }

    .VehicleStatBlock {
      max-width: 100vw;
    }

    .vehicleStat-silhouette,
    .vehicleStat-maxSpeed,
    .vehicleStat-handling {
      font-size: 1.5rem;
    }

    .vehicleStat-defense,
    .vehicleStat-armor,
    .vehicleStat-hullTraumaThreshold,
    .vehicleStat-systemStrainThreshold {
      font-size: 1.0rem;
    }

    .vehicleStat-currentHullTrauma,
    .vehicleStat-currentSystemStrain {
      height: 1rem;
      width: 1.8rem;
      font-size: 0.8rem;
    }
  }

  /* Print Styles */
  @media print {
    * {
      -webkit-print-color-adjust: exact;
    }

    body {
      --orangeFade: var(--orange);
      --lightblueFade: var(--lightblue);
    }

    .no-break {
      break-inside: avoid;
    }

    .break-after {
      page-break-after: always;
    }

    .break-before {
      page-break-before: always;
    }

    .table th {
      padding: 0.1rem;
    }

    .table td {
      padding: 0 0.2rem;
    }

    .talentCard {
      width: 8rem;
      height: 1rem;
    }

    .ffi {
      font-size: 12pt;
    }

    .ffi-border {
      -webkit-text-stroke-width: 0.05rem;
    }

    .table-dice {
      width: 200px;
    }

    .table-career {
      width: 70px;
    }

    .table-rank {
      width: 70px;
    }

    .table-name {
      width: 250px;
    }

    .table-skills {
      font-size: 14pt;
    }

    .totalXP {
      display: inline-block;
      position: relative;
    }

    .availableXP {
      display: inline-block;
      position: relative;
    }

    .header-CRB {
      font-size: 1.2rem;
    }

    .attributeValue-CRB-Wounds,
    .attributeValue-CRB-Strain,
    .attributeValue-CRB-Soak,
    .attributeValue-CRB-Defense {
      left: 55%;
    }

    .xpValue-CCC {
      top: 54%;
    }

    .header-SOTB {
      font-size: 1.2rem;
    }

    .xpValue-SOTB {
      font-size: 1.2rem;
    }

    .attributeValue-SOTB-Wounds,
    .attributeValue-SOTB-Strain,
    .attributeValue-SOTB-Soak,
    .attributeValue-SOTB-Defense {
      font-size: 1.2rem;
    }

    .body-KF .attribute::before {
      top: 1px;
    }

    .body-KF .attributeValue {
      top: 42px;
    }

    .body-KF .attribute::after {
      left: 10px;
      bottom: 14px;
    }

    .body-KF .characteristic {
      position: relative;
    }
  }
`;
