import * as path from "node:path";
import * as fs from "node:fs";

export default function viteLocaleNamesPlugin() {
    const virtualModuleId = "virtual:locale-names";
    const resolvedVirtualModuleId = "\0" + virtualModuleId;
    const localesDir = path.resolve(__dirname, "src/localization");

    return {
        name: "localenames-plugin",
        resolveId(id: any) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
        },
        load(id: any) {
            if (id !== resolvedVirtualModuleId) {
                return null;
            }

            const entries = fs.readdirSync(localesDir)
                .filter(file => file.endsWith(".json"))
                .map(file => {
                    const locale = file.replace(/\.json$/, '')
                    const json = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf-8'));
                    return [locale, json._languageName ?? locale] as const;
                })

            return `
            export const localeNames = ${JSON.stringify(Object.fromEntries(entries), null, 2)};
            export const supportedLocales = ${JSON.stringify(entries.map(([locale]) => locale), null, 2)};
            `
        }
    }
}