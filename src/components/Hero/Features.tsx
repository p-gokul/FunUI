import { useTranslation } from "react-i18next";
import Chart from "/chart.png";
import Form from "/form.png";
import Table from "/table.png";
import Multi from "/multi-lang-theme.png";

type FeatureKey = "table" | "chart" | "form" | "global";

const imagesByKey: Record<FeatureKey, string> = {
  table: Table,
  chart: Chart,
  form: Form,
  global: Multi,
};

const features: { key: FeatureKey }[] = [
  {
    key: "table",
  },
  {
    key: "chart",
  },
  {
    key: "form",
  },
  {
    key: "global",
  },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-lg w-full py-10 px-6">
        <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto">
          {t("dashboard.heading")}
        </h2>

        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => {
            const imgSrc = imagesByKey[feature.key];
            return (
              <div
                key={feature.key}
                className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
              >
                {/* image instead of bg-muted box */}
                <div className="basis-1/2 aspect-[6/4] rounded-xl border border-border/50 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={t(`dashboard.features.${feature.key}_imageAlt`, {
                      defaultValue: feature.key,
                    })}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="basis-1/2 shrink-0">
                  <span className="uppercase font-semibold text-sm text-muted-foreground">
                    {t(`dashboard.features.${feature.key}`)}
                  </span>
                  <h4 className="my-3 text-3xl font-semibold tracking-tight">
                    {t(`dashboard.features.${feature.key}_title`)}
                  </h4>
                  <p className="text-muted-foreground text-[17px]">
                    {t(`dashboard.features.${feature.key}_details`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
