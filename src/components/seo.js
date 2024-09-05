import React from 'react';
import PropTypes from 'prop-types'; // Importing prop-types for validation
import { Helmet } from 'react-helmet';

const SEO = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

// Define prop types for the SEO component
SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SEO;
