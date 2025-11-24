import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../api/firebase";
import { addReport as saveReport } from "../api/reportService";

// Create context
const ReportsContext = createContext();

// Custom hook
export const useReports = () => useContext(ReportsContext);

// Provider
const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      setReports([]);
      setLoading(false);
      return;
    }

    const reportsRef = collection(db, "users", user.uid, "reports");
    const q = query(reportsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reportsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to reports:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const addReport = async ({ gain, balance }) => {
    try {
      await saveReport({ gain, balance });
    } catch (error) {
      console.error("Error adding report:", error);
      throw error;
    }
  };

  return (
    <ReportsContext.Provider value={{ reports, loading, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsProvider;
