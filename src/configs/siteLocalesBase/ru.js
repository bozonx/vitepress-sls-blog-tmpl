import siteConfigBase from "../siteConfigBase.js";

export const LANG = "ru";

export const base = {
  label: "Русский",
  themeConfig: {
    returnToTopLabel: "Наверх",
    sidebarMenuLabel: "Меню",
    darkModeSwitchLabel: "Тема",
    darkModeSwitchTitle: "Переключиться на тёмную тему",
    lightModeSwitchTitle: "Переключиться на светлую тему",
    docFooter: {
      prev: "Предыдущая страница",
      next: "Следующая страница",
    },
    outline: {
      label: "На этой странице",
    },
    lastUpdated: {
      ...siteConfigBase.themeConfig.lastUpdated,
      text: "Последнее обновление",
    },
    editLink: {
      text: "Редактировать эту страницу на GitHub",
    },
  },
  search: {
    options: {
      locales: {
        // don't forget to select while translate
        ru: {
          translations: {
            button: {
              buttonText: "Искать",
              buttonAriaLabel: "Искать",
            },
            modal: {
              noResultsText: "Ничего не найдено",
              resetButtonTitle: "Стереть",
              displayDetails: "Больше деталей",
              backButtonTitle: "Закрыть поиск",
              footer: {
                selectText: "Выбрать",
                selectKeyAriaLabel: "Кнопка ввод",
                navigateText: "Навигация",
                navigateUpKeyAriaLabel: "Стрелка вверх",
                navigateDownKeyAriaLabel: "Стрелка вниз",
                closeText: "Закрыть",
                closeKeyAriaLabel: "Кнопка escape",
              },
            },
          },
        },
      },
    },
  },
};
