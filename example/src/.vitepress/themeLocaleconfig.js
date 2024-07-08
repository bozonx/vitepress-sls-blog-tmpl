export const commonParams = {
  siteUrl: "https://some.org",
  donateIcon: "fa6-solid:heart",
  perPage: 10,
  paginationMaxItems: 7,
};

export function makeCommonTheme(t, lang) {
  return {
    label: t.label,
    title: t.title,
    description: t.description,
    //logo: '/logo.svg',
    themeConfig: {
      t,
      siteTitle: t.siteTitle,
      darkModeSwitchTitle: t.darkModeSwitchTitle,
      lightModeSwitchTitle: t.lightModeSwitchTitle,
      authors: [{ id: "some-auth", ...t.authors["ivan-k"] }],
      ui: {
        donateLink: `${commonParams.siteUrl}/${lang}/donate`,
        footerLinks: [{ text: t.links.aboutBlog, href: `/page/about-blog` }],
        topBar: {
          links: [
            {
              text: t.links.donate,
              href: `${commonParams.siteUrl}/${lang}/page/donate`,
              icon: commonParams.donateIcon,
            },
            {
              text: t.links.projectSite,
              href: `${commonParams.siteUrl}/${lang}/`,
            },
            {
              text: t.links.weInSocialMedia,
              href: `${commonParams.siteUrl}/${lang}/page/links`,
            },
            {
              text: t.links.aboutUs,
              href: `${commonParams.siteUrl}/${lang}/page/about`,
            },
          ],
          socialLinks: [
            {
              href: "https://github.com/bozonx/some-blog",
              icon: "fa6-brands:github-alt",
            },
          ],
          mobileLinks: [
            {
              text: t.links.donate,
              href: `${commonParams.siteUrl}/${lang}/donate`,
              icon: commonParams.donateIcon,
            },
          ],
        },
        sideBar: {
          topLinks: [
            { text: t.links.home, href: "/", icon: "fa6-solid:house" },
            {
              text: t.links.recent,
              href: "/recent/1",
              icon: "fa6-solid:newspaper",
            },
            {
              text: t.tags,
              href: "/tags",
              icon: "fa6-solid:tag",
            },
            {
              text: t.links.byDate,
              href: "/archive",
              icon: "fa6-solid:calendar-days",
            },
            {
              text: t.links.authors,
              href: "/authors",
              icon: "mdi:users",
            },
          ],
          bottomLinks: [
            {
              text: t.links.donate,
              href: `${commonParams.siteUrl}/${lang}/page/donate`,
              icon: commonParams.donateIcon,
              mobile: true,
            },
            {
              text: t.links.weInSocialMedia,
              href: `${commonParams.siteUrl}/${lang}/page/links`,
              mobile: true,
            },
            {
              text: t.links.aboutUs,
              href: `${commonParams.siteUrl}/${lang}/page/about`,
              mobile: true,
            },
            { header: t.links.links },
            {
              text: t.links.projectSite,
              href: `${commonParams.siteUrl}/${lang}/`,
              mobile: true,
            },
            {
              text: t.links.ourYoutubeChannel,
              href: "https://www.youtube.com/@some",
              icon: "fa6-brands:youtube",
            },
            {
              text: t.links.ourTelegramChannel,
              href: "https://t.me/some",
              icon: "fa6-brands:telegram",
            },
            {
              text: t.links.ourTelegramChat,
              href: "https://t.me/some_chat",
              icon: "fa6-solid:message",
            },
          ],
        },
      },
    },
  };
}
