import Navigation from './HomeComponents/Navigation';
import Header from './Partials/Header';
import Contact from './Contact';
import Footer from './HomeComponents/Footer';
import Back2TopBtn from './HomeComponents/Back2TopBtn';

import useWOW from '../hooks/useWOW';
import useAutoTopPage from '../hooks/useAutoTopPage';
const ContactPage = ({ fixedData }) => {
	useWOW();
	useAutoTopPage();
	return (
		<>
			<Navigation data={fixedData.Header} />
			<Header currentPath={'/contact'} currentTitle={'Contact'} headerTitle={'Liên hệ'} />
			<Contact data={fixedData.Footer}/>
			<Footer data={fixedData.Footer} />
			<Back2TopBtn />
		</>
	);
};

export default ContactPage;
