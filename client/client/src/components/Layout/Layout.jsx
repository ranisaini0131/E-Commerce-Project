import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children, title, description, keyword, author }) {
    return (
        <div>
            <Helmet>
                < meta charset="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                <ToastContainer />
                {children}
            </main>
            <Footer />
        </div >
    )
};

Layout.defaultProps = {
    title: "Ecommerce App - shop now",
    description: "mern stack project",
    keyword: "mern, react,node,mongodb",
    author: "Rani Saini"
}

export default Layout

