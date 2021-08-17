// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'
import ReportsGrid from '../components/Grids/ReportsGrid'
import { db } from '../config/firebase'
import { useEffect, useRef, useState } from 'react'


const MyReports = () => {
    const auth = useRequireAuth()
    if (!auth.user) return null
    console.log(auth.user)
    // Create Ref
    const isMounted = useRef(false);
    // Create Your Required States
    const [reports, setReports] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  // Create a function for fetching your data
    const fetchData = () => {
      const reportsRef = db.collection('reports');
      reportsRef
      .where('organisation', '==', auth.user.organisation)
      .where('teacher', '==', auth.user.uid)
        .get()
        .then(response => {
          if (isMounted.current) {
            setReports(response);
            setIsLoading(false);
          }
        })
        .catch(error => {
          // check ref before updating state 
          isMounted.current && setError(error);
        });
    };
    
    useEffect(() => {
        isMounted.current = true;
        fetchData();
        // this is run when component unmount
        return () => (isMounted.current = false);
      }, []);
    
  
    
    return (
        <div>
            <ReportsGrid reportsData={reports} />
        </div>
    )
}

export default MyReports
