import React from 'react';
import styles from './Header.module.css';
import HeaderLink from '../atoms/HeaderLink';

const Header = () => {
  return (
    <nav className="uk-navbar-container" uk-nav="true">
      <div className="uk-card uk-card-default uk-card-body">
        <ul
          className="uk-nav-default uk-nav-center uk-nav-parent-icon"
          uk-nav="true"
        >
          <HeaderLink
            to="/"
            liClass="uk-nav-header"
            linkClass={styles.headerTitle}
          >
            {' '}
            <span className={styles.headerTitleFront}>Frank</span>
            <i>Overflow</i>
          </HeaderLink>

          <HeaderLink to="/Publish" icon="pencil">
            {' '}
            Publish a question
          </HeaderLink>
          {/**
          <hr className="uk-divider-small" />
                    <HeaderLink to="/Questions" icon="question">
            {' '}
            All Questions
          </HeaderLink>
 */}

          {/**
          <HeaderLink to="/Voted" icon="chevron-up">
          {' '}
          Highest voted
          </HeaderLink>
 * 
 */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
