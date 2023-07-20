import styles from "../styles/Graphebar.module.css";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Graphebar({ chartData }) {
  ///  mise a jour des nom des mois du chart
  const [monthNames, setMonthNames] = useState([]);

  //usefect pour recupere la langue du navigateur
  //et 
  useEffect(() => { 
    const fetchMonthNames = async () => {
      try {
        const locale = navigator.language; // Obtenir la langue par défaut de l'utilisateur
        const options = { month: "long" };
        const monthNames = Array.from({ length: 7 }, (_, index) => {
          const currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() - index);
          return new Intl.DateTimeFormat(locale, options).format(currentDate);
        });
        setMonthNames(monthNames.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    fetchMonthNames();
  }, []);



  const dataChart = {
    labels: monthNames,
    datasets: [
      {
        label: "Cigarette fumé par mois",
        data: chartData, //[65, 59, 80, 81, 56, 55, 40] exemple de chartdata.data
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(255, 205, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(55, 220, 79, 0.3)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio:false,

    aspectRatio: 1,
    scales: {
      x: {
        type: "category", // Précisez que l'échelle de l'axe X est de type "category"
      },
      y: {

      },
    },
  };


  // test 

  ///
  return (
    <div className={styles.App}>
      <div classsName={styles.graphebarcontainer}>
        <div classsName={styles.card}>
          <Bar data={dataChart} options={options} height={200}/>
        </div>
      </div>
    </div>
  );
}

export default Graphebar;
