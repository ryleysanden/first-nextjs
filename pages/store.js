import Head from "next/head";
import styles from "../styles/Store.module.css";
import SearchBar from "../components/SearchBar";

export default function Store() {
    return (
        <>
        <div className={styles.fakestore}>
            <h1>Fake Store</h1>
            <p>Welcome to the Fake Store!</p>
            <p>Here you'll find a variety of products from the fakestore API.</p>
            <SearchBar/>
        </div>
        </>
    );
};