import React from 'react';
import GithubCorner from 'react-github-corner';
// import Header from '../organisms/Header';

const Fullpage = ({ children }) => {
  return (
    <div className="uk-container uk-padding">
      <GithubCorner
        href={'https://github.com/soirs/frameworks-mandatory'}
        bannerColor="#0ff"
        octoColor="#000"
        size={80}
        direction="left"
      />
      {children}
    </div>
  );
};

export default Fullpage;
