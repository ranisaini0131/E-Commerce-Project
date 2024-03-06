import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import { Helmet } from 'react-helmet'

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


