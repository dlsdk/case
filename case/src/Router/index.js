import { useRoutes } from 'react-router-dom';
import routeList from './routeList';
const Router = () => {
    return useRoutes(routeList);
};

export default Router;
