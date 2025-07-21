import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ES, GB } from "country-flag-icons/string/3x2";

const languages = [
  { code: "en", label: "English", flag: GB },
  { code: "es", label: "Español", flag: ES },
];

const fallbackLang = "en";

const Flag = ({ svg }: { svg: string }) => (
  <span
    className="inline-block w-2 h-4 mr-2 "
    dangerouslySetInnerHTML={{ __html: svg }}
  />
);

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLang = languages.some((l) => l.code === i18n.language)
    ? i18n.language
    : fallbackLang;

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Select defaultValue={currentLang} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <Flag svg={lang.flag} />
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
