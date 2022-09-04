import React, {useContext, useEffect, useState} from 'react'
import './NewSetlist.scss'
import Background from '../../components/Background/Background'
import {
    Button,
    DisabledButton,
    MySetlistsButton,
    NewSetlistButton,
    ProfileButton
} from '../../components/Button/Button'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../context/UserContext/UserContext'
import CreateSetlist from '../../components/CreateSetlist/CreateSetlist'
import {AuthContext} from '../../context/AuthContext/AuthContext'
import spotifyIcon from '../../assets/icons/Spotify_logo_without_text.svg.png'

function NewSetlist(){
    const navigate = useNavigate()
    const {
        setlists,
        useSpotify,
        setUseSpotify,
    } = useContext(UserContext)
    const {authState} = useContext(AuthContext)
    const [createSetlist, toggleCreateSetlist] = useState(false)
    const [className, setClassName] = useState({
        background: 'background-bottom__large-grow',
        fade: 'new-setlist__fade-in',
        render: 'new-setlist-content__render-in',
        navigationButton: 'navigation--fade-in'
    })

    useEffect(() => {
        function checkAuthorization(){
            if(authState.isAuth === false){
                navigate('/login')
            }
        }
        checkAuthorization()
    }, []);

    function handleSubmit(e) {
       e.preventDefault()
        toggleCreateSetlist(true)
    }

    function handleNavigationButton(navigationLink){
        setClassName({
            ...className,
            background: 'background-bottom__large-shrink',
            fade:'new-setlist__fade-out',
            render: 'new-setlist-content__render-out',
            navigationButton: 'navigation--fade-out'
        })
        setTimeout(() => {
            navigate(navigationLink)
        }, 1000)
    }

    return(
    <Background
        classNameTop='background-top'
        classNameCenter='background-center'
        classNameBottom={className.background}
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
            <div className={className.navigationButton}>
                <MySetlistsButton
                    onClick={() => {
                        handleNavigationButton('/my-setlists')

                    }}

                />
            </div>
        }
        bottomContent={
            <>
            {createSetlist ?
                <CreateSetlist
                toggleCreateSetlist={toggleCreateSetlist}/>
                :
                <div className={className.fade}>
                    <div className={className.navigationButton}>
                        <NewSetlistButton
                            onClick={() => {
                                handleNavigationButton('/home')
                            }}

                        />
                    </div>
                    <div className={className.render}>
                        {setlists.length < 6 ?
                            <form
                                className='new-setlist--form'
                                onSubmit={handleSubmit}
                            >
                                <legend
                                    className='new-setlist--legend'
                                >
                                    Do you want to use Spotify?
                                    <img
                                        className='new-setlist--img'
                                        src={spotifyIcon}
                                        alt='Spotify Icon'
                                    />
                                </legend>
                                <div className='new-setlist-radio'>
                                    <label htmlFor='useSpotify'>
                                        <input
                                            type='radio'
                                            name='useSpotify'
                                            id='useSpotify'
                                            onClick={() => setUseSpotify(true)}
                                        />
                                        Yes
                                    </label>
                                    <label htmlFor='dontUseSpotify'>
                                        <input
                                            type='radio'
                                            id='dontUseSpotify'
                                            name='useSpotify'
                                            onClick={() => setUseSpotify(false)}
                                        />
                                        No
                                    </label>
                                </div>
                                {useSpotify === false || useSpotify === true ?
                                    <Button
                                        className='new-setlist--submit'
                                        type='submit'
                                        buttonText='Create Setlist'
                                    />
                                    :
                                    <DisabledButton
                                        className='new-setlist--disabled'
                                        buttonText='Create Setlist'
                                    />
                                }
                            </form>
                            :
                            <div className='new-setlist--maximum'>
                                <h1>Oops</h1>
                                <br/>
                                <p>The maximum number of setlists has been reached.</p>
                                <p>Please delete a setlist to make a new one. </p>
                            </div>
                        }
                    </div>
                </div>
            }
            </>
        }
    />
    )
}

export default NewSetlist