/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api'
import headerLogo from '../images/around_us_logo.svg'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeletePlacePopup from './DeletePlacePopup'
import useKeyPress from '../hooks/useKeyPress'

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cardList, setCardList] = useState([])
    const isEscapePress = useKeyPress('Escape')

    useEffect(() => {
        api.getAppInfo()
            .then(([userInfo, currentCardList]) => {
                setCurrentUser(userInfo)
                setCardList(currentCardList)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsDeletePlacePopupOpen(false)
        setIsImagePopupOpen(false)
        setIsLoading(false)
    }

    useEffect(() => {
        closeAllPopups()
    }, [isEscapePress])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
    }

    function handleDeleteClick(card) {
        setSelectedCard(card)
        setIsDeletePlacePopupOpen(true)
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id)

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                const newCards = cardList.map((c) =>
                    c._id === card._id ? newCard : c
                )
                setCardList(newCards)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleDeletePlace(card) {
        setIsLoading(true)

        api.removeCard(card._id)
            .then(() => {
                const newCards = cardList.filter((c) => c._id !== card._id)
                setCardList(newCards)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => closeAllPopups())
    }

    function handleUpdateUser({ name, about }) {
        setIsLoading(true)

        api.setUserInfo({ name, about })
            .then((res) => {
                setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => closeAllPopups())
    }

    function handleUpdateAvatar(avatar) {
        setIsLoading(true)

        api.setProfilePicture(avatar)
            .then((res) => {
                setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => closeAllPopups())
    }

    function handleAddNewPlace({ name, link }) {
        setIsLoading(true)

        api.addCard({ name, link })
            .then((newCard) => {
                setCardList([newCard, ...cardList])
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => closeAllPopups())
    }

    function handleClosePopups(e) {
        if (
            e.target.classList.contains('popup__close') ||
            !e.target.closest('.popup__container')
        )
            closeAllPopups()
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <Route path="/signin">
                        <h1>Login</h1>
                    </Route>
                    <Route path="/signup">
                        <h1>Register</h1>
                    </Route>
                    <Route path="/">
                        <div className="page__container">
                            <Header logo={headerLogo} />

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
                    </Route>
                </Switch>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App
