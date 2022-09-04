import React, {useContext, useEffect, useState} from 'react'
import './MySetlists.scss'
import Background from '../../components/Background/Background'
import {Button, MySetlistsButton, NewSetlistButton, ProfileButton} from '../../components/Button/Button'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../context/UserContext/UserContext'
import OpenSetlist from '../../components/OpenSetlist/OpenSetlist'
import {AuthContext} from '../../context/AuthContext/AuthContext'
import spotifyIcon from '../../assets/icons/Spotify_logo_without_text.svg.png'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

function MySetlists(){
    const navigate = useNavigate()
    const {authState, setAuthState, token} = useContext(AuthContext)
    const {setlists, updateSetlists, error, toggleError} = useContext(UserContext)
    const [openSetlist, toggleOpenSetlist] = useState({
            open: false,
            index: null,
        })
    const [deleteSetlist, toggleDeleteSetlist] = useState(false)
    const [className, setClassName] = useState({
        background: 'background-center__large-grow',
        fade: 'my-setlists__fade-in',
        render: 'my-setlists--content-render-in',
        navigationButton: 'navigation--fade-in'
    })

    useEffect(() => {
        async function checkAuthorization() {
            if (authState.isAuth === false) {
                navigate('/login')
            }
        }
        checkAuthorization()
    }, [authState.isAuth]);

    function deleteButtonHandler(index) {
        updateSetlists([
            ...setlists.slice(0, index),
            ...setlists.slice(index + 1)
        ])
        toggleDeleteSetlist(true)
    }

    useEffect(() => {
        if (deleteSetlist) {
            const jsonStringSetlists = JSON.stringify(setlists)
            async function updateSetlists() {
                try {
                    const {data} = await axios.put('https://frontend-educational-backend.herokuapp.com/api/user',
                        {
                            info: jsonStringSetlists
                        }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                    setAuthState({
                        ...authState,
                        user: {
                            username: data.username,
                            mail: data.email,
                            id: data.id,info: JSON.parse(data.info
                            )},
                        authStatus: 'done',
                        isAuth: true
                    })
                    toggleDeleteSetlist(false)
                    toggleError({
                        ...error,
                        updateAuthInfoError: false
                    })
                } catch (e) {
                    toggleError({
                        ...error,
                        updateAuthInfoError: true
                    })
                }
            }updateSetlists()
        }
    }, [deleteSetlist])

    function handleNavigationButton(navigationLink){
        setClassName({
            ...className,
            background: 'background-center__large-shrink',
            fade:'my-setlists__fade-out',
            render: 'my-setlists--content-render-out',
            navigationButton: 'navigation--fade-out'
        })
        setTimeout(() => {
            navigate(navigationLink)
        }, 1000)
    }

    return(
        <Background
            classNameTop='background-top'
            classNameCenter={className.background}
            classNameBottom='background-bottom'
            topContent={
                <div className={className.navigationButton}>
                    <ProfileButton
                        onClick={() => {
                            handleNavigationButton('/profile')
                        }}
                    />
                </div>
            }
            centerContent={
                <div className={className.fade}>
                    {openSetlist.open ?
                        <OpenSetlist
                            nameOfSetlist={openSetlist.nameOfSetlist}
                            index={openSetlist.index}
                            toggleOpenSetlist={toggleOpenSetlist}
                        />
                        :
                        <>
                            <div className='my-setlists--header'>
                                <MySetlistsButton
                                    onClick={() => {
                                        handleNavigationButton('/home')
                                    }}
                                />
                            </div>
                            {error.updateAuthInfoError &&
                            <>
                            <br/>
                            <ErrorMessage
                                updateAuthInfoError={error.updateAuthInfoError}
                            />
                        </>
                            }
                        <div className={className.render}>
                            <div className='my-setlists--div'>
                                {setlists.length < 1 ?
                                    <section className='my-setlists--section'>
                                        <p>There are no setlists yet. </p>
                                        <p>Go to New Setlist and make a setlist</p>
                                    </section>
                                    :
                                    <>
                                    {React.Children.toArray(
                                        setlists.map((setlist, index) => {
                                            return (
                                                <section className='my-setlists--section'>
                                    <span className='my-setlists--buttons'>
                                        <Button
                                            className='my-setlists--open-button'
                                            onClick={() => toggleOpenSetlist({
                                                open: true,
                                                nameOfSetlist: setlist.setlistName,
                                                index: index
                                            })}
                                            buttonText={setlist.setlistName}
                                        />
                                        <Button
                                            buttonText='Delete'
                                            className='my-setlists--delete-button'
                                            onClick={() => deleteButtonHandler(index)}
                                        />
                                    </span>
                                    <span className='my-setlists--span'>
                                        <ol>
                                        {React.Children.toArray(
                                            setlist.setlistArray.slice(0, 3).map((setlistPreview) => {
                                                if (setlistPreview.track) {
                                                    return <li>
                                                        {setlistPreview.track} - {setlistPreview.artist}
                                                    </li>
                                                } else {
                                                    return <li>
                                                        {setlistPreview}
                                                    </li>
                                                }
                                            })
                                        )}
                                        </ol>
                                            {setlist.useSpotify &&
                                            <img src={spotifyIcon} alt='Spotify Icon'
                                                 className='my-setlists--img'
                                            />
                                            }
                                    </span>
                                </section>
                                            )
                                        }))}
                                    </>
                                }
                            </div>
                        </div>
                        </>
                    }
                </div>
            }
            bottomContent={
                <div className={className.navigationButton}>
                    <NewSetlistButton
                        onClick={() => {
                            handleNavigationButton('/new-setlist')
                        }}
                    />
                </div>
            }
        />
    )
}

export default MySetlists