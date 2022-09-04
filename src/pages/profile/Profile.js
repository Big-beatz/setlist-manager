import React, {useContext, useEffect, useState} from 'react'
import './Profile.scss'
import Background from '../../components/Background/Background'
import {Button, MySetlistsButton, NewSetlistButton, ProfileButton} from '../../components/Button/Button'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext/AuthContext'

function Profile() {
    const {authState, logout} = useContext(AuthContext)
    const [className, setClassName] = useState({
        background: 'background-top__large-grow',
        fade: 'profile__fade-in',
        render: 'profile--div__render-in',
        navigationButton: 'navigation--fade-in'
    })
    const navigate = useNavigate()

    useEffect(() => {
        function checkAuthorization(){
            if(authState.isAuth === false){
                navigate('/login')
            }
        }
        checkAuthorization()
    }, []);

    function handleNavigationButton(navigationLink){
        setClassName({
            ...className,
            background: 'background-top__large-shrink',
            fade: 'profile__fade-out',
            render: 'profile--div__render-out',
            navigationButton: 'navigation--fade-out'
        })
        setTimeout(() => {
            navigate(navigationLink)
        }, 1000)
    }

    return (
        <Background
            classNameTop={className.background}
            classNameCenter='background-center'
            classNameBottom='background-bottom'
            topContent={
                <div className={className.fade}>
                    <div className={className.navigationButton}>
                        <ProfileButton
                            onClick={() => {
                                handleNavigationButton('/home')
                            }}
                        />
                    </div>
                    <div className={className.render}>
                            <div className='profile--div__username'>
                                <h2 className='profile--h2'>
                                    Username:
                                </h2>
                                <br/>
                                <p className='profile--p'>
                                    {authState.user.username}
                                </p>
                            </div>
                            <div className='profile--div__mailadres'>
                                <h2 className='profile--h2'>
                                    Mailadres:
                                </h2>
                                <br/>
                                <p className='profile--p'>
                                    {authState.user.mail}
                                </p>
                            </div>
                            <Button
                                className='logoutButton'
                                type='button'
                                onClick={logout}
                                buttonText='Logout'
                            />
                    </div>
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

export default Profile