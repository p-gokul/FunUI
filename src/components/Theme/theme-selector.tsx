import { useThemeConfig } from "./active-theme";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const DEFAULT_THEMES = [
  {
    name: "default",
    value: "default",
  },
  {
    name: "blue",
    value: "blue",
  },
  {
    name: "green",
    value: "green",
  },
  {
    name: "amber",
    value: "amber",
  },
  {
    name: "orange",
    value: "orange",
  },
  {
    name: "purple",
    value: "purple",
  },
  {
    name: "rose",
    value: "rose",
  },
];

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-selector" className="sr-only">
        Theme
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id="theme-selector"
          size="sm"
          className="justify-start *:data-[slot=select-value]:w-12"
        >
          <span className="text-muted-foreground hidden sm:block">
            {t("themes.theme")}
          </span>
          <span className="text-muted-foreground block sm:hidden">
            {t("themes.theme")}
          </span>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {t(`themes.${theme.name}`)}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
        </SelectContent>
      </Select>
    </div>
  );
}
