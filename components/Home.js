import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const { calculateprice } = require("../modules/calculateprice"); // module de calcule du prix

import Chart from 'chart.js' // import du graphique

function Home() {

  const user = useSelector((state) => state.user.value);

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageSavedCig, setErrorMessageSavedCig] = useState('');
  const [totalSmoked, settotalSmoked] = useState(0)
  const [totalNoSmoked, settotalNoSmoked] = useState(0)
  const [totalDepenseCigarette, setTotalDepenseCigarette] = useState(0)
  const [totalSaveInEuroCigarette, setTotalSaveInEuroCigarette] = useState(0)
  const [usertoken, setUserToken] = useState('');
  
	let backendAdress = ''
  let cigaretteprice = 0.5

	const backendOnline = false  // switch true or false manualy 
	if (backendOnline){
		backendAdress = "https://cigfreeback.vercel.app"
	}else {
		backendAdress = "http://localhost:3000"
	}




  useEffect(() => {
    if (user.token) { 
      
      const fetchDataSmoke = async () => {
        try {
          const response = await fetch(`${backendAdress}/users/datasmoke/${user.token}`);
          const data = await response.json();
      
          if (data.result) {
            const { userDataSmoke, userDataNotSmoked } = data;
            // Utilisez les données récupérées comme vous le souhaitez, par exemple :
            const totalSmoke = userDataSmoke.length;
            const totalNoSmoke = userDataNotSmoked.length;
            settotalSmoked(totalSmoke)
            settotalNoSmoked(totalNoSmoke)

                const calculateDepense = async () => {
                  const depense = await calculateprice(Number(totalSmoke), cigaretteprice);
                  setTotalDepenseCigarette(depense);
                };
                calculateDepense();

                const calculateEconomies = async () => {
                  const economies = await calculateprice(Number(totalNoSmoke), cigaretteprice);
                  setTotalSaveInEuroCigarette(economies);
                };
                calculateEconomies();        
            
          } else {
            // Gérez le cas où la requête n'a pas réussi ou les données ne sont pas disponibles
            console.log(data.error);
          }
        } catch (error) {
          // Gérez les erreurs lors de la requête
          console.error(error);
        }
      };
      fetchDataSmoke();

   console.log(user.token)

  }}, [user.token]);

 //////////////////test fonction  gain / depense cigarette ///////
 console.log(calculateprice(Number(totalSmoked), 0.5))

 ////////////////////////

const handleAddCigarette = () => {
  console.log(user.token)
		fetch(`${backendAdress}/users/addsmokecigarettes/${user.token}`)
    
    .then(response => response.json())
			.then(data => {
				console.log(data , 'response data add cigarette')
				if (data.result) {
            settotalSmoked(totalSmoked + 1)
            setTotalDepenseCigarette(calculateprice(Number(totalSmoked), cigaretteprice))
				}else {
					setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend
					 // Supprime le message d'erreur après 2 secondes
					 setTimeout(() => {
						setErrorMessage('');
					  }, 3000);
				}
			});
  }


const handleDelcigarette = () => {
  console.log(user.token)
		fetch(`${backendAdress}/users/deletesmokecigarettes/${user.token}`,{
      method: 'DELETE',  // ne pas oublié le delete dans la methode, car en get ça fera un 404 ERROR 
      // car coté backend c'est une route delete
    })
    
    .then(response => response.json())
			.then(data => {
				console.log(data , 'response data del cigarette')
				if (data.result) {
            settotalSmoked(totalSmoked - 1)
            setTotalDepenseCigarette(calculateprice(Number(totalSmoked), cigaretteprice));
				}else {
					setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend

					 // Supprime le message d'erreur après 2 secondes
					 setTimeout(() => {
						setErrorMessage('');
					  }, 3000);
				}
			});
}

const handleAddNoCigarette = () => {
  console.log(user.token)
		fetch(`${backendAdress}/users/addnotsmokecigarettes/${user.token}`)
    
    .then(response => response.json())
			.then(data => {
				console.log(data , 'response data add no smoke cigarette')
				if (data.result) {
            settotalNoSmoked(totalNoSmoked + 1)
            setTotalSaveInEuroCigarette( calculateprice(Number(totalNoSmoked), cigaretteprice))
				}else {
					setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend
					 // Supprime le message d'erreur après 2 secondes
					 setTimeout(() => {
						setErrorMessage('');
					  }, 3000);
				}
			});
  }


const handleDelNocigarette = () => {
  console.log(user.token)
		fetch(`${backendAdress}/users/deletenotsmokecigarettes/${user.token}`,{
      method: 'DELETE',  // ne pas oublié le delete dans la methode, car en get ça fera un 404 ERROR 
      // car coté backend c'est une route delete
    })
    
    .then(response => response.json())
			.then(data => {
				console.log(data , 'response data del no smoke cigarette')
				if (data.result) {
            settotalNoSmoked(totalNoSmoked - 1)
            setTotalSaveInEuroCigarette(calculateprice(Number(totalNoSmoked), cigaretteprice))
				}else {
					setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend

					 // Supprime le message d'erreur après 2 secondes
					 setTimeout(() => {
						setErrorMessage('');
					  }, 3000);
				}
			});
}


	

return (
  <div>
    {user.token ? (
      <div className={styles.homeContainerAll}>
        <Head>
          <title>Cig free - Home</title>
        </Head>
        <div className={styles.infoUserContainerOne}>
          <div className={styles.infoUserContainerSmokeCigCount}>
            <div className={styles.infoUserContainerSmokeCigCountBig}>{totalSmoked}</div>
            <p>Cigarettes fumées ≃ 
            <span className={styles.calculatePriceCss}>{totalDepenseCigarette} </span> €
            </p>
          </div>
          <div className={styles.infoUserContainerSmokeCigCount}>
            <div className={styles.infoUserContainerSmokeCigCountBig}>{totalNoSmoked}</div>
            <p>Cigarettes économisées ≃ 
              <span className={styles.calculatePriceCss} >{totalSaveInEuroCigarette} </span> €
              </p> 
          </div>
        </div>
        <div className={styles.cigaddlesscontainerone}>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <div className={styles.cigaddlesscontainer}>
            <FontAwesomeIcon icon={faMinus} id="delCig" className={styles.btnCigSectionminus} onClick={() => handleDelcigarette()}/>
            <p>j'ai fumé ! ! !</p>
            <FontAwesomeIcon icon={faPlus} id="addCig" className={styles.btnCigSectionplus} onClick={() => handleAddCigarette()}/>
          </div>
          <div className={styles.cigaddlesscontainer}>
            {errorMessageSavedCig && <div className={styles.error}>{errorMessageSavedCig}</div>}
            <FontAwesomeIcon icon={faMinus} id="delCig" className={styles.btnCigSectionminus} onClick={() => handleDelNocigarette()}/>
            <p>j'ai évité de fumer </p>
            <FontAwesomeIcon icon={faPlus} id="addCig" className={styles.btnCigSectionplus} onClick={() => handleAddNoCigarette()}/>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.userNotConnected}>
        <h2>Merci de vous connecter</h2>
      </div>
    )}
  </div>
);
}

export default Home;
