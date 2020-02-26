// import './Button.scss';
import PropTypes from 'prop-types';
import React from 'react';
import Styled from 'styled-components';

const BaseButton = props => {

    const { label, className } = props;

    return (
        <button { ...props } className={ className }>
            {label}
        </button>
    );
}
 
BaseButton.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
}

const Button = Styled(BaseButton)`
    border: 0;
    min-width: 80px;
    outline: none;
    padding: 10px;
    font-family: 'Roboto-Regular';
    font-weight: bold;
    border-radius: 4px;
    color: #fff;
    background: #888787;

    &:hover {
        cursor: pointer;
        background: #818181;
    }
    &:disabled {
        cursor: not-allowed;
        background: #c7c6c6;

        &:hover {
            background: #c7c6c6;
        }
    }   

    ${props => props.primary ? `
        background: #0f4d27;

        &:hover {
            background: #0f4d27;
        }
        `
        : ''};

    ${props => props.danger ? `
        background: #e20c0c;

        &:hover {
            background: #e20c0c;
        }
        `
        : ''};
`

export default Button;