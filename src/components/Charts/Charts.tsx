import GenreBarChart from "./Genre_Bar";
import { GenrePieChart } from "./Genre_Pie";
import { GenreRadarChart } from "./Genre_Radar";

const ChartsPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto pt-24 px-4 xl:px-0">
      <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <GenreBarChart />
        <GenrePieChart />
        <GenreRadarChart />
      </div>
    </div>
  );
};

export default ChartsPage;
