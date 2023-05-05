import { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import headerLogo from '../images/around_us_logo.svg';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [tooltipStatus, setTooltipStatus] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [cardList, setCardList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.getAppInfo()
            .then(([userInfo, currentCardList]) => {
                setCurrentUser(userInfo);
                setCardList(currentCardList);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        setEmail(res.data.email);
                        setIsLoggedIn(true);
                        history.push('/');
                    } else {
                        localStorage.removeItem('jwt');
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);

    function closeAllPopups() {
        setIsInfoTooltipOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeletePlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsLoading(false);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function handleDeleteClick(card) {
        setSelectedCard(card);
        setIsDeletePlacePopupOpen(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                const newCards = cardList.map((c) =>
                    c._id === card._id ? newCard : c
                );
                setCardList(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDeletePlace(card) {
        setIsLoading(true);

        api.removeCard(card._id)
            .then(() => {
                const newCards = cardList.filter((c) => c._id !== card._id);
                setCardList(newCards);
            })
            .then((res) => {
                if (res) {
                    closeAllPopups();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser({ name, about }) {
        setIsLoading(true);

        api.setUserInfo({ name, about })
            .then((res) => {
                setCurrentUser(res);
                if (res) {
                    closeAllPopups();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar({ avatar }) {
        setIsLoading(true);

        api.setProfilePicture({ avatar })
            .then((res) => {
                setCurrentUser(res);
                if (res) {
                    closeAllPopups();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddNewPlace({ name, link }) {
        setIsLoading(true);

        api.addCard({ name, link })
            .then((newCard) => {
                setCardList([newCard, ...cardList]);
            })
            .then((res) => {
                if (res) {
                    closeAllPopups();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleClosePopups(e) {
        if (
            e.target.classList.contains('popup__close') ||
            !e.target.closest('.popup__container')
        )
            closeAllPopups();
    }

    function onRegister({ email, password }) {
        auth.register(email, password)
            .then((res) => {
                if (res) {
                    setTooltipStatus('success');
                    history.push('/signin');
                }
            })
            .catch((err) => {
                console.log(err);
                setTooltipStatus('fail');
            })
            .finally(() => {
                setIsInfoTooltipOpen(true);
            });
    }

    function onLogin({ email, password }) {
        auth.login(email, password)
            .then((res) => {
                if (res.token) {
                    setIsLoggedIn(true);
                    setEmail(email);
                    localStorage.setItem('jwt', res.token);
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
                setTooltipStatus('fail');
                setIsInfoTooltipOpen(true);
            });
    }

    function onSignOut() {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        history.push('/signin');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header
                        logo={headerLogo}
                        email={email}
                        onSignOut={onSignOut}
                    />
                    <Switch>
                        <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
                            <Main
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                cards={cardList}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onDeleteClick={handleDeleteClick}
                            />
                            <Footer />
                        </ProtectedRoute>
                        <Route path="/signup">
                            <Register onRegister={onRegister} />
                        </Route>
                        <Route path="/signin">
                            <Login onLogin={onLogin} />
                        </Route>
                        <Route>
                            {isLoggedIn ? (
                                <Redirect to="/" />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                    </Switch>
                </div>

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    isLoading={isLoading}
                    onClose={handleClosePopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    isLoading={isLoading}
                    onClose={handleClosePopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    isLoading={isLoading}
                    onClose={handleClosePopups}
                    onAddPlace={handleAddNewPlace}
                />

                <DeletePlacePopup
                    card={selectedCard}
                    isOpen={isDeletePlacePopupOpen}
                    isLoading={isLoading}
                    onClose={handleClosePopups}
                    onConfirmDelete={handleDeletePlace}
                />

                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={handleClosePopups}
                />

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={handleClosePopups}
                    status={tooltipStatus}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
