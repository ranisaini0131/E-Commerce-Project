import React from 'react'
import Layout from '../components/Layout/Layout.jsx'
import  useAuth  from '../context/auth.jsx'

export default function HomePage() {

    const [auth, setAuth] = useAuth();
    return (
        <Layout title={"Best Offers"}>
            <h1>HomePage</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>

    )
}
