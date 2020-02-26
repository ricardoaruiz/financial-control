import PropTypes from 'prop-types';
import React from 'react';

import styles from './Table.module.scss';

const Table = (props) => {

    const { title, columns, rows } = props;

    const builtTitle = () => {
        return title ? (<tr><th colSpan={columns.length}>{title}</th></tr>) : null;
    }

    const buildColumns = () => {
        return (
            <tr>
                {columns.map(column => {
                    return  <th key={column.label}
                                style={buildStyleColumn(column)}
                            >
                                {column.label}
                            </th>
                })}
            </tr>
        );
    }

    const buildStyleColumn = (column) => {
        return { 
            width: column.width ? column.width : '' ,
            textAlign: column.alignment ? column.alignment : 'left'
        }
    }

    return (
        !rows.length
            ? null
            : <table className={styles.Table}>
                <thead>
                    {builtTitle()}
                    {buildColumns()}
                </thead>
                <tbody>
                    {
                        rows.map((row, index) => {
                            return (
                                <tr key={row.id ? row.id : index}>
                                    {
                                        React.Children.map(props.children, child => {
                                            return React.cloneElement(child, { object: row })
                                        })                                       
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
    );
}

Table.propTypes = {
    children: PropTypes.array,
    title: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    rows: PropTypes.array,
}

export default Table;