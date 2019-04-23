import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <nav className="uk-navbar-container" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="">
            <Link className={styles.headerTitle}  to="./">
              <span className={styles.headerTitleFront}>Frank</span>
              <i>Overflow</i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="./Publish">Publish a question</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
