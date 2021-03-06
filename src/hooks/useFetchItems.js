/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import db from '../Firebase/config_firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

export const useFetchItems = (category, id) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    const fetchReadItemsQuery = (selectQuery) => {
        setLoading(true);
        const collectionRef = collection(db, 'movies');
        const q = query(collectionRef, selectQuery);
        const unsub = onSnapshot(q, (snapshot) => {
            try {
                const results = snapshot.docs.map(doc => (doc.data()));
                setItems(results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                console.log('error consulta items');
            }
            return unsub;
        });
    };
    useEffect(() => {
        setIsMounted(true);
        if (isMounted) {
            (!category) ?
            (!id) ?
            fetchReadItemsQuery(orderBy('vote_average', 'desc')): fetchReadItemsQuery(where('id', '==', Number(id))): fetchReadItemsQuery(where('genre_ids', 'array-contains', Number(category)));
        }
        return () => {
            setIsMounted(false);
        }
    }, [category, isMounted]);

    useEffect(() => {
        setIsMounted(true);
        if (isMounted && items.length > 35) {
            localStorage.setItem('items', JSON.stringify(items));
        }
        return () => {
            setIsMounted(false);
        }
    }, [items, isMounted]);

    return [items, loading, error];
};