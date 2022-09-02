import React from 'react'
import './Background.scss'

function Background({
                classNameTop,
                topContent,
                classNameCenter,
                centerContent,
                classNameBottom,
                bottomContent
                })
{
    return(
            <div className="background">
                <div className={classNameTop}>
                    {topContent}
                </div>
                <div className={classNameCenter}>
                    {centerContent}
                </div>
                <div className={classNameBottom}>
                    {bottomContent}
                </div>
            </div>
        )
}

export default Background