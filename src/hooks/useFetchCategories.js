/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import db from '../Firebase/config_firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    const fetchReadAllCategories = () => {
        const collectionRef = collection(db, 'categories');
        const q = query(collectionRef, orderBy('name', 'asc'));
        const unsub = onSnapshot(q, (snapshot) => {
            try {
                const results = snapshot.docs.map(doc => (doc.data()));
                setCategories(results);
            } catch (error) {
                setError(error);
                console.log('error consulta categorias');
            }
            return unsub;
        })
    };

    useEffect(() => {
        setIsMounted(true);
        isMounted && fetchReadAllCategories();

        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);

    return [categories, error];
};