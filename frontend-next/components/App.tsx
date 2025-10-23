//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Link from 'next/link';
/* import { useRouter } from 'next/router';*/
import SignupForm from "./SignupForm"; 

function App() {
  return (
  
  <Link href="/signup">Signup</Link>
    /* <Router>
      <Routes>
        <Link href="/signup">Signup</Link>
      </Routes>
    </Router> */
  );
}

export default App;
