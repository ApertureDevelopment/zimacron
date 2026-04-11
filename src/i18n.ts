import {createI18n} from "vue-i18n";
import {ref} from "vue";
import { localeNames } from 'virtual:locale-names';

export const SUPPORTED_LOCALES : string[] = Object.keys(localeNames);
export type Locale = typeof SUPPORTED_LOCALES[number];
export const localeDisplayNames = localeNames;

const defaultLocale : Locale = "en-US";
let userLocale = localStorage.getItem("userLocale") ?? defaultLocale;

export const getUserLocale = () => userLocale;

export const documentTitle = ref("Loading...");
export const htmlLanguage = ref("en-US");

export const i18n = createI18n({
    legacy: false,
    locale: userLocale,
    fallbackLocale: defaultLocale,
    messages: {}
});

const downloadedLocales = new Set<string>();

const localeLoaders = import.meta.glob("./localization/*.json");

export async function loadLocale(locale : Locale) {
    if(downloadedLocales.has(locale)) {
        setLocale(locale);
        return;
    }

    const loader = localeLoaders[`./localization/${locale}.json`];
    if(!loader) {
        throw new Error(`Locale ${locale} not found`);
    }

    const messages = await loader() as { default: Record<string, string> };


    i18n.global.setLocaleMessage(locale, messages.default)
    downloadedLocales.add(locale);
    setLocale(locale);
}

function setLocale(locale : Locale) {
    i18n.global.locale.value = locale;
    localStorage.setItem("userLocale", locale);
    htmlLanguage.value = locale;
    documentTitle.value = i18n.global.t("nav.title");
}


