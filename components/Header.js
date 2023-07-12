import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark,faEye } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { Modal } from 'antd';
// import Link from 'next/link';



function Header() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	const [date, setDate] = useState('2050-11-22T23:59:59');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');


	//////////////////////////////////////////////// call for fetch ///////////////////////////////////////////////
	let backendAdress = ''
	const backendOnline = true  // switch true or false manualy 
	if (backendOnline){
		backendAdress = "https://cigfreeback.vercel.app"
	}else {
		backendAdress = "http://localhost:3000"
	}
	


	const handleCleanHidden = (data) => {
		dispatch(cleanhiddenArticle(data))
	}

	useEffect(() => {
		setDate(new Date());
		Moment.globalLocale = 'fr'
		if (!user.token) {
			setIsModalVisible(!isModalVisible)
		}
	}, []);
	


	const handleRegister = () => {
		console.log(backendAdress)
		fetch(`${backendAdress}/users/signup`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*' //`${backendAdress}` // Ajoutez cet en-tête
		 },
		body: JSON.stringify({ email: signUpUsername, password: signUpPassword }),
		})
		.then(response => response.json())
			.then(data => {
				console.log(data)
				if (data.result) {
					dispatch(login({ email: signUpUsername, token: data.token }));
					setSignUpUsername('');
					setSignUpPassword('');
					setIsModalVisible(false)
				} else {
					setErrorMessage(data.error); // Lève une erreur avec le message d'erreur du backend
					 // Supprime le message d'erreur après 2 secondes
					 setTimeout(() => {
						setErrorMessage('');
					  }, 2000);
				}
			});
	};

	const handleConnection = () => {
		console.log(backendAdress)
		fetch(`${backendAdress}/users/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json',
		 },
			body: JSON.stringify({ email: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				console.log(data , 'connection')
				if (data.result) {
					dispatch(login({ email: signInUsername, token: data.token }));
					setSignInUsername('');
					setSignInPassword('');
					setIsModalVisible(false)
				}
			});
	};

	const handleLogout = () => {
		dispatch(logout());
		setIsModalVisible(!isModalVisible)
	};

	const showModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	let modalContent;
	console.log(user.token)
	if (!user.token) {
		modalContent = (
			<div className={styles.registerContainer}>
				<div className={styles.registerSection}>
					<p>Sign-up</p>
					{errorMessage && <div className={styles.error}>{errorMessage}</div>}
					<input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
					<input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
					<button id="register" onClick={() => handleRegister()}>Register</button>
				</div>
				<div className={styles.registerSection}>
					<p>Sign-in</p>
					{errorMessage && <div className={styles.error}>{errorMessage}</div>}
					<input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
					<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
					<button id="connection" onClick={() => handleConnection()}>Connect</button>
				</div>
			</div>
		);
	}

	let userSection;
	if (user.token) {
		userSection = (
			<div className={styles.logoutSection}>
				<p>Welcome {user.email} / </p>
				<button onClick={() => handleLogout()}>Logout</button>
				<FontAwesomeIcon onClick={() => handleCleanHidden([])} className={styles.eye} icon={faEye} /*style={{color: '#3749a4'}}*/ />
			</div>
		);
		
	} else {
		if (isModalVisible) {
			userSection =
				<div className={styles.headerIcons}>
					<FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faXmark} />
					<FontAwesomeIcon onClick={() => handleCleanHidden([])} className={styles.eye} icon={faEye} /*style={{color: '#3749a4'}}*/ />
				</div>
		} else {
			userSection =
				<div className={styles.headerIcons}>
					<FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faUser} />
					<FontAwesomeIcon onClick={() => handleCleanHidden([])} className={styles.eye} icon={faEye} /*style={{color: '#3749a4'}}*/ />
				</div>
		}
	}

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Moment className={styles.date} date={date} format="D MMMM YYYY" />
				<h1 className={styles.title}>Cig Free</h1>
				{userSection}
			</div>

			{/* <div className={styles.linkContainer}>
				<Link href="/"><span className={styles.link}>Articles</span></Link>
				<Link href="/bookmarks"><span className={styles.link}>Bookmarks</span></Link>
			</div> */}
		
			{isModalVisible && <div id="react-modals">
				<Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={false} footer={null}>
					{modalContent}
				</Modal>
				
			</div>}
		</header >
	);
}

export default Header;
