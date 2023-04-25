import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import './NavBar.css';
import { useState } from 'react';
import logo from './assets/ART.png'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../context/Modal';
import SessionForm from '../SessionForms/SessionForm';
import { logout } from '../../store/session';
import { getUser } from '../../store/users';

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    const [sessionForm, setSessionForm] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId));

    const handleMenuOpen = () => {
        setShowMenu(true);
    };

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    const onClose = () => {
        setSessionForm(false);
    }

    const logoutUser = () => {
        dispatch(logout());
        history.push('/')
    }

    const toProfile = () => {
        history.push(`/${sessionUser._id}`)
    }

    return (
        <header id='navbar'>
            <div id='nav-container'>
                <div className='nav-buttons' id='logo-button'>
                    <NavLink exact to="/">
                        <img src={logo} alt='logo'/>
                    </NavLink>
                </div>
                <div className='nav-buttons' id='profile-drop' onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
                    {location.pathname === '/' &&  !sessionUser && (
                        <div className='about-us'>
                            <button className='about' onClick={() => history.push('/about')}>About Artifacts</button>
                            <button className='about' onClick={() => history.push('/contact')}>Contact Us</button>
                        </div>
                    )}
                    {sessionUser && (
                        <div className='profile-drop-button' id='profile-pic-button'>
                            <div className='pic'>
                                <img
                                    src={sessionUser?.profilePic}
                                    alt='profile'
                                />
                            </div>
                            <p>me <i className="fa-solid fa-caret-down"></i></p>
                        </div>
                    )}
                    {showMenu && sessionUser && (
                        <ul className='dropdown-items'>
                            <li onClick={toProfile}>Your profile</li>
                            <li onClick={() => history.push('/about')}>About Artifacts</li>
                            <li onClick={() => history.push('/contact')}>Contact Us</li>
                            <li onClick={logoutUser}>Sign out</li>
                        </ul>
                    )}
                    {!sessionUser && location.pathname !== '/' && (
                        <div className='profile-drop-button' id='session-buttons'>
                            <button className='about' onClick={() => setSessionForm('signup')}>
                                Sign up
                            </button>

                            <button className='about' onClick={() => setSessionForm('signin')}>
                                Sign in
                            </button>
                        </div>
                    )}
                    {(sessionForm === 'signup' || sessionForm === 'signin') && (
                        <Modal onClose={onClose}>
                            <SessionForm onClose={onClose} formType={sessionForm} />
                        </Modal>
                    )}
                </div>
                {sessionUser && (
                    <button className='map-button' onClick={() => history.push('/explore')}>
                        <i className="fa-solid fa-map"></i>
                        <p>Map</p>
                    </button>
                )}
            </div>
            <div className='nav-buttons' id='test'>
<<<<<<< HEAD
                {location.pathname === '/' && (
                    <div>ARTifacts</div>
                )}
                {user && (
                    <div>
                        {location.pathname === `/${user._id}` && (
                            <div>{user.username}'s Page</div>
                        )}
                    </div>
                )}
=======
                {/* { location.pathname === '/' || location.pathname === '/explore' && <div>ARTifacts</div> } */}
                { location.pathname === '/' && <div>ARTifacts</div> }
            {user && (
                <div>
                { location.pathname === `/${user._id}` && 
                <div>{user.username}'s Page</div>
                }
                </div>
            )}
>>>>>>> main
            </div>
        </header>
    );
}

export default NavBar;