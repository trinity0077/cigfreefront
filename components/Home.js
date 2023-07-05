import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function Home() {

  const user = useSelector((state) => state.user.value);

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageSavedCig, setErrorMessageSavedCig] = useState('');



let notConnected
let connected
  useEffect(() => {
    if (user.token) { 
      
   console.log(user.token)

   connected = ( <div><Head>
   <title>Cig free - Home</title>
 </Head>
 <div className={styles.cigaddlesscontainer}>
     <p>ajoute ou suprime un cigarette</p>
     <button id="register" onClick={() => handleDelcigarette()}>-</button>
     <button id="register" onClick={() => handleAddCigarette()}>+</button>
   </div> </div> 
      )

    } else {
      notConnected = (
        <div>
          <h2>Merci de vous connecter</h2>
        </div>
      )
  }}, [user.token]);

  

const handleAddCigarette = () => {
  console.log(user.token)
		fetch(`http://localhost:3000/users/addsmokecigarettes/${user.token}`)
    
    .then(response => response.json())
			.then(data => {
				console.log(data , 'response data add cigarette')
				if (data.result) {
					setErrorMessage(data.message) // Affiche le message recu du backend pour indiqué a l 'utilisateur que ça a fonctionner
          setTimeout(() => { // Supprime le message d'erreur après 2 secondes
						setErrorMessage('');
					  }, 2000);
				}else {
					setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend
					 // Supprime le message d'erreur après 2 secondes
					 setTimeout(() => {
						setErrorMessage('');
					  }, 2000);
				}
			});
  }


const handleDelcigarette = () => {
  console.log(user.token)
		fetch(`http://localhost:3000/users/deletesmokecigarettes/${user.token}`,{
      method: 'DELETE',  // ne pas oublié le delete dans la methode, car en get ça fera un 404 ERROR 
      // car coté backend c'est une route delete
    })
    
    .then(response => response.json())
			.then(data => {
				console.log(data , 'response data del cigarette')
				if (data.result) {
					setErrorMessage(data.message) // Affiche le message recu du backend pour indiqué a l 'utilisateur que ça a fonctionner
          setTimeout(() => {
						setErrorMessage('');
					  }, 2000);
				}else {
					setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend

					 // Supprime le message d'erreur après 2 secondes
					 setTimeout(() => {
						setErrorMessage('');
					  }, 2000);
				}
			});
}




  return (
    <div>
      <div><Head>
            <title>Cig free - Home</title>
           </Head>
        
            <div className={styles.cigaddlesscontainerone}>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
             <div className={styles.cigaddlesscontainer}>
            
                <FontAwesomeIcon icon={faMinus} id="delCig" className={styles.btnCigSectionminus} onClick={() => handleDelcigarette()}/>
                <p>j'ai fumé ! ! !</p>
                <FontAwesomeIcon icon={faPlus} id="addCig" className={styles.btnCigSectionplus} onClick={() => handleAddCigarette()}/>
              </div>
              </div>

              <div className={styles.cigaddlesscontainer}>
                {errorMessageSavedCig && <div className={styles.error}>{errorMessageSavedCig}</div>}
                <FontAwesomeIcon icon={faMinus} id="delCig" className={styles.btnCigSectionminus} onClick={() => handleDelcigarette()}/>
                <p>j'ai évité de fumer </p>
                <FontAwesomeIcon icon={faPlus} id="addCig" className={styles.btnCigSectionplus} onClick={() => handleAddCigarette()}/>
                
              </div>

      </div> 
    </div>
  );
}

export default Home;
