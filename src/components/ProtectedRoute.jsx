// import { auth } from "../services/firebase";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {

//   if (!auth.currentUser) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default ProtectedRoute;
function ProtectedRoute({ children }) {
    return children;
  }
  
  export default ProtectedRoute;