import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement,ChartData } from "chart.js";
import { Doughnut, Line} from "react-chartjs-2";
export interface ActivitiesInterface {
  date: string;
  steps: string;
  distance: string;
  runDistance: string;
  calories: string;
}

export const Fit = ({fitData}:{fitData:string}) => {

  const fit = JSON.parse(fitData).map((e:ActivitiesInterface[]) => Object.values(e));


  const dates = fit.slice(1).map((e:string[]) => {;
    const date = new Date(e[0]);
    const days = date.getDate();
    return `${days < 10 ? 0 : ''}${days}-${date.getMonth()}`
  });
  const steps:ChartData = fit.slice(1).map((e:string[]) => e[1]);

  const data = {
    labels: dates,
    datasets: [{
      label: 'Activity goals',
      data: steps,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1
    }]
  }


  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);
  return (
    <Line
      width={300}
      height={300}
      data={data}

    />
  )
}
