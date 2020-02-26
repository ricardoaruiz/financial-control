import PropTypes from 'prop-types';
import React from 'react';

import styles from './TableColumn.module.scss';

const TableColumn = (props) => {

    const { children, column, booleanTranslate, object, actions, alignment, className } = props;

    const columnValue = (object) => {
        if (typeof object[column] === 'boolean' || object[column] === 'true' || object[column] === 'false') {

            const booleanValue = object[column] === 'true' || object[column] === true;
            if (booleanTranslate) {
                const booleanValues = booleanTranslate.split('|');
                return booleanValue ? booleanValues[0] : booleanValues[1];
            }
            return booleanValue ? 'True' : 'False';
        } 
        return '' + column ? object[column] : '';        
    }

    const buildStyle = () => {
        return {
            textAlign: alignment
        }
    }

    return (
        <td className={`${styles.TableColumn} ${className}`}
            style={buildStyle()}
        >
            {columnValue(object)}
            {
                React.Children.map(children, (child, index) => {
                    const action = actions ? actions[index] : null
                    return React.cloneElement(child, { 
                        ...child.props, 
                        ...props, 
                        onClick: action ? () => action(object) : null 
                    })
                })
            }
        </td>
    );
}
 
TableColumn.propTypes = {
    children: PropTypes.array,
    column: PropTypes.string,
    object: PropTypes.object,
    booleanTranslate: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.func),
    alignment: PropTypes.string,
    className: PropTypes.string,
}

TableColumn.defaultProps = {
    alignment: 'left',
}

export default TableColumn;