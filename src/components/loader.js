import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #B {
        opacity: 0;
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Define animate function outside useEffect
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(), // Ensure finishLoading is called when animation completes
    });

    loader
      .add({
        targets: '#hexagon path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutQuart',
        duration: 2000,
        delay: (el, i) => i * 250,
      })
      .add({
        targets: '#hexagon #B',
        duration: 1000,
        opacity: 1,
        easing: 'easeInOutQuart',
      })
      .add({
        targets: '.loader',
        delay: 500,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
        complete: () => finishLoading(), // Ensure the loader hides properly
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate(); // Call animate inside useEffect
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <div className="logo-wrapper">
        <svg
          id="hexagon"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <g
              id="B"
              transform="translate(36, 33)"
              fill="#64FFDA"
              style={{ opacity: 0 }}
              fontFamily="system-ui, Calibre-Medium, Calibre, sans-serif"
              fontSize="50"
              fontWeight="400"
              letterSpacing="4.16666603"
            >
              <text>
                <tspan x="0.141666985" y="33">
                  R
                </tspan>
              </text>
            </g>
            <path
              stroke="#64FFDA"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M 50, 5
                 L 11, 27
                 L 11, 72
                 L 50, 95
                 L 89, 73
                 L 89, 28 z"
            />
          </g>
        </svg>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
