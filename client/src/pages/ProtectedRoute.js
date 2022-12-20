import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";
import { Loading } from '../components';

const ProtectedRoute = ({ children }) => {  
    const { user, userLoading } = useSelector(
        state => state.user,
      )    
    if (userLoading) return <Loading />;

    if(!user) {
        return <Navigate to="/landing" />
    }
    
    return children;
}

export default ProtectedRoute;