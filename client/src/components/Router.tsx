import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import NavBar from './NavBar'
import { routes } from './routes'
const Router: FC = () => {
    const element = useRoutes(routes)
    return (
        <>

            <NavBar />
            {element}

        </>
    )
}

export default Router