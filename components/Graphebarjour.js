import { min } from "moment";
import styles from "../styles/Graphebar.module.css";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Graphebarjour({ chartDataDay }) {
  ///  mise a jour des nom des mois du chartbar
  const [dayNames, setDayNames] = useState([]);
  const [minYValue, setMinYValue] = useState(0);
  const [maxYValue, setMaxYValue] = useState(40);

  //usefect pour recupere la langue du navigateur
  //et
  useEffect(() => {
    const fetchDayNames = async () => {
      try {
        const locale = navigator.language; // Obtenir la langue par défaut de l'utilisateur
        const options = { weekday: "long" }; // recuperer le nom ecrit du jour
        const dayNames = Array.from({ length: 7 }, (_, index) => { // sur les 7 dernier jours
          const currentDate = new Date();
          
          currentDate.setDate(currentDate.getDate() - index); // prend l'index du jour actuel  - ce d avant
          return new Intl.DateTimeFormat(locale, options).format(currentDate);
        });
        setDayNames(dayNames.reverse());

        const minDataValue = Math.min(...chartDataDay);
    const maxDataValue = Math.max(...chartDataDay);

    setMinYValue(Math.floor(minDataValue / 5) * 5 - 5); // 5 points en dessous du minimum réel
    setMaxYValue(Math.ceil(maxDataValue / 5) * 5 + 5); // 5 points au-dessus du maximum réel

      } catch (error) {
        console.error(error);
      }
    };
    fetchDayNames();
  }, [chartDataDay]);
// console.log(dayNames)    // verif de la recuperation du nom des jours
// console.log('verif contenu chartDataDay qui vient de home',chartDataDay)  //


// console.log(Math.floor(minDataValue / 5) * 5 - 5)

  const dataChart = {
    labels: dayNames,
    datasets: [
      {
        label: "Cigarette fumé par jour",
        data: chartDataDay, //[65, 59, 80, 81, 56, 55, 40] exemple de chartdata.data
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
    maintainAspectRatio: false,

    aspectRatio: 1,
    scales: {
      x: {
        type: "category", // Précisez que l'échelle de l'axe X est de type "category"
      },
      y: {
        beginAtZero: true
      },
    },
    plugins: {
      tooltip: {
        enabled: false, // Désactiver les infobulles
      },
    },
  };

  // test

  ///
  return (
    <div className={styles.App}>
      <div classsName={styles.graphebarcontainer}>
        <div /*classsName={styles.card}*/>
          <Bar data={dataChart} options={options} height={200} />
        </div>
      </div>
    </div>
  );
}

export default Graphebarjour;
