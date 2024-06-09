import Link from "next/link";
import React from "react";

export const Menu: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="collapse navbar-collapse" id='navbarNav'>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/" legacyBehavior>
                                <a className="nav-link">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link legacyBehavior href="/LivroLista">
                                <a className="nav-link">Catálogo</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link legacyBehavior href="/LivroDados">
                                <a className="nav-link">Novo</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};