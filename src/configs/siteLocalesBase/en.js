import siteConfigBase from "../siteConfigBase.js";

export const LANG = "en";

export const base = {
  label: "English",
  themeConfig: {
    returnToTopLabel: "Return to top",
    sidebarMenuLabel: "Menu",
    darkModeSwitchLabel: "Appearance",
    darkModeSwitchTitle: "Switch to dark theme",
    lightModeSwitchTitle: "Switch to light theme",
    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },
    outline: {
      label: "On this page",
    },
    lastUpdated: {
      ...siteConfigBase.themeConfig.lastUpdated,
      text: "Updated at",
    },
    editLink: {
      text: "Edit this page on GitHub",
    },
  },
  search: {
    options: {
      locales: {
        // don't forget to select while translate
        en: {
          translations: {
            button: {
              buttonText: "Search",
              buttonAriaLabel: "Search",
            },
            modal: {
              noResultsText: "No results for",
              resetButtonTitle: "Reset search",
              displayDetails: "Display detailed list",
              backButtonTitle: "Close search",
              footer: {
                selectText: "to select",
                selectKeyAriaLabel: "enter",
                navigateText: "to navigate",
                navigateUpKeyAriaLabel: "up arrow",
                navigateDownKeyAriaLabel: "down arrow",
                closeText: "to close",
                closeKeyAriaLabel: "escape",
              },
            },
          },
        },
      },
    },
  },
};
