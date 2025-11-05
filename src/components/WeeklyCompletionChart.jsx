import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function WeeklyCompletionChart({ data }) {
  const labels = (data || []).map((d) => d.day);
  const values = (data || []).map((d) => d.pct);

  return (
    <div className="w-full">
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Completion %",
              data: values,
              backgroundColor: "rgba(56, 189, 248, 0.6)",
              borderColor: "rgba(2, 132, 199, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, max: 100, grid: { color: "rgba(148,163,184,0.2)" }, ticks: { color: "#cbd5e1" } },
            x: { grid: { display: false }, ticks: { color: "#cbd5e1" } },
          },
          plugins: { legend: { labels: { color: "#cbd5e1" } } },
        }}
        height={260}
      />
    </div>
  );
}
