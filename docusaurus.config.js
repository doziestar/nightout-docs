// // @ts-check
// // Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require("prism-react-renderer/themes/github");
// const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// /** @type {import('@docusaurus/types').Config} */
// const config = {
//   title: "Nightout Docs",
//   tagline: "Nightout Docs",
//   favicon: "img/favicon.ico",

//   // Set the production url of your site here
//   url: "",
//   // Set the /<baseUrl>/ pathname under which your site is served
//   // For GitHub pages deployment, it is often '/<projectName>/'
//   baseUrl: "/nightout-docs",

//   // GitHub pages deployment config.
//   // If you aren't using GitHub pages, you don't need these.
//   organizationName: "doziestar", // Usually your GitHub org/user name.
//   projectName: "Nightout-docs", // Usually your repo name.

//   onBrokenLinks: "log",
//   onBrokenMarkdownLinks: "warn",
//   trailingSlash: false,

//   // Even if you don't use internalization, you can use this field to set useful
//   // metadata like html lang. For example, if your site is Chinese, you may want
//   // to replace "en" with "zh-Hans".
//   i18n: {
//     defaultLocale: "en",
//     locales: ["en"],
//   },
//   // plugins: [
//   //   [
//   //     // require.resolve("@cmfcmf/docusaurus-search-local"),
//   //     {
//   //       indexBlog: false,
//   //     },
//   //   ],
//   // ],

//   presets: [
//     [
//       "classic",
//       /** @type {import('@docusaurus/preset-classic').Options} */
//       ({
//         docs: {
//           sidebarPath: require.resolve("./sidebars.js"),
//           routeBasePath: "/",
//           path: "./docs",
//           // Please change this to your repo.
//           // Remove this to remove the "edit this page" links.
//           editUrl:
//             "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
//         },
//         blog: {
//           showReadingTime: true,
//           // Please change this to your repo.
//           // Remove this to remove the "edit this page" links.
//           editUrl:
//             "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
//         },
//         theme: {
//           // customCss: require.resolve('./src/css/custom.css'),
//         },
//       }),
//     ],
//   ],

//   themeConfig:
//     /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
//     ({
//       // Replace with your project's social card
//       image: "img/docusaurus-social-card.jpg",
//       navbar: {
//         title: "Nightout Docs",
//         logo: {
//           alt: "Nightout logo",
//           src: "img/logo.svg",
//         },
//         items: [
//           {
//             type: "doc",
//             docId: "intro",
//             position: "left",
//             label: "Tutorial",
//           },
//           { to: "/blog", label: "Blog", position: "left" },
//           {
//             href: "https://github.com/facebook/docusaurus",
//             label: "GitHub",
//             position: "right",
//           },
//         ],
//       },
//       footer: {
//         style: "dark",
//         links: [
//           // {
//           //   title: "Docs",
//           //   items: [
//           //     {
//           //       label: "Tutorial",
//           //       to: "/docs/intro",
//           //     },
//           //   ],
//           // },
//           {
//             title: "Community",
//             items: [
//               {
//                 label: "Stack Overflow",
//                 href: "https://stackoverflow.com/questions/tagged/docusaurus",
//               },
//               {
//                 label: "Discord",
//                 href: "https://discordapp.com/invite/docusaurus",
//               },
//               {
//                 label: "Twitter",
//                 href: "https://twitter.com/docusaurus",
//               },
//             ],
//           },
//           {
//             title: "More",
//             items: [
//               {
//                 label: "Blog",
//                 to: "/blog",
//               },
//               {
//                 label: "GitHub",
//                 href: "https://github.com/facebook/docusaurus",
//               },
//             ],
//           },
//         ],
//         copyright: `Copyright © ${new Date().getFullYear()} Nightout, Inc.`,
//       },


//       prism: {
//         theme: lightCodeTheme,
//         darkTheme: darkCodeTheme,
//       },
//     }),
// };

// module.exports = config;

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Nightout Docs',
  tagline: 'Nightout Docs',
  url: 'https://doziestar.github.io',
  baseUrl: '/nightout-docs',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'doziestar', // Usually your GitHub org/user name.
  projectName: 'nightout-docs', // Usually your repo name.
  trailingSlash: false,
  // plugins: [
  //   [require.resolve('@cmfcmf/docusaurus-search-local'), {
  //     indexBlog: false,
  //   }]
  // ],
  themeConfig: {
    navbar: {
      title: 'Nightout Docs',
      logo: {
        alt: 'Nightout Docs',
        src: 'img/favicon.ico',
      },
      items: [
        {
          to: 'tags',
          position: 'right',
          label: 'Tags',
        },
        {
          href: 'https://twitter.com/dozie_cnc',
          position: 'right',
          label: '🐦',
        },
        {
          href: 'https://github.com/doziestar',
          position: 'right',
          label: '🐙',
        },
        // {
        //   href: 'https://www.patreon.com/doziestar',
        //   position: 'right',
        //   className: 'patreon-logo',
        //   html: '<img src="img/patreon-logo.png" alt="github-icon" width="20px" style="margin-top: 7px"/>',
        // },
        // {
        //   href: 'https://github.com/sponsors/sibelius',
        //   position: 'right',
        //   className: 'github-sponsor-logo',
        //   html: '<img src="img/gh-sponsor.svg" alt="github-icon" width="25px" style="margin-top: 7px"/>',
        // },
        {
          href: 'https://github.com/cnc technologies/nightout-docs',
          position: 'right',
          className: 'github-icon-header',
          html: '<img src="img/github-icon.svg" alt="github-icon" width="20px" />',
        },
      ],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    footer: {
      links: [],
      copyright: 'Copyright © 2023 Nightout, Inc',
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          routeBasePath: '/',
          path: './docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl: ({ locale, versionDocsDirPath, docPath }) => {
          //   return `https://github.com/sibelius/zettelkasten/edit/main/${versionDocsDirPath}/${docPath}`;
          // },
          editCurrentVersion: true,
          // remarkPlugins: [require('mdx-mermaid')],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-3SK393X2BR',
          anonymizeIP: true,
        },
      },
    ],
  ],
};