import './ErrorMessage.scss'
import React from 'react'

function ErrorMessage({
              playError,
              searchError,
              deviceError,
              userError,
              loginError,
              registerError,
              spotifyAuthError,
              spotifyRefreshError,
              updateAuthInfoError,
              createPlaylistError
          })
    {
    if (playError) {
        return (
            <p className='error-message'>
                Something went wrong trying to play the song, please try again.
                If the problem persists make sure you are logged into spotify and spotify active in an external window or app
            </p>
        )
    } if (searchError){
        return(
            <p className='error-message'>
                The search engine is not responding. PLease logout and back in again.
            </p>
        )
    } if (deviceError) {
        return (
            <p className='error-message'>
                It appears you are not logged into spotify in an external window.
                To use full functionality please log into spotify in an external window or app
            </p>
        )
    } if (userError) {
        return (
            <p className='error-message'>
                Something went wrong connecting to your spotify account. PLease logout and back in again.
            </p>
        )
    } if (loginError){
        return(
            <p className='login-error-message'>
                *Username & password combination is incorrect, please try again or register first.
            </p>
        )
    }if (registerError) {
        return (
            <p className='login-error-message'>
                Something went wrong registering to your account. PLease try again.
            </p>
        )
    }if (spotifyAuthError){
        return(
            <p className='error-message'>
                Could not connect with spotify. For full functionality agree with
                Setlist manager getting acces to the requested functions.
            </p>
        )
    }if (spotifyRefreshError){
        return(
            <p className='error-message'>
                Something went wrong while connecting to Spotify.  PLease logout and back in again to use full functionality.
            </p>
        )
    } if (updateAuthInfoError) {
        return (
            <p className='error-message'>
                Something went wrong updating your setlists. Please try again.
            </p>
        )
    } if (createPlaylistError) {
        return (
            <p className='error-message'>
                Something went wrong, the playlist has not been created. Please try again.
            </p>
        )
    }
}


export default ErrorMessage