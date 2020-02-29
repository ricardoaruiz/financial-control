import PropTypes from 'prop-types';
import React from 'react';

import styles from './Table.module.scss';
import { IconButton } from '../icon-button';

const Table = (props) => {

    const { title, columns, rows, currentPage, regsPerPage, regsPerPageList, totalPages, paginationAction } = props;

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
                <tfoot>
                    {
                        !currentPage
                            ? null
                            : <tr>
                                <td colSpan={columns.length}>
                                    <div className={styles.TablePagination}>
                                        <div className={styles.PaginationPages}>
                                            {
                                                !regsPerPageList
                                                    ? null
                                                    : 
                                                    <div>
                                                        Registros por página:
                                                        <select onChange={(event) => paginationAction({regsPerPage: event.target.value})}>
                                                            {
                                                                regsPerPageList.map(reg =>  <option 
                                                                                                key={reg} 
                                                                                                value={reg} 
                                                                                                selected={reg === regsPerPage}
                                                                                            >
                                                                                                {reg}
                                                                                            </option>)
                                                            }
                                                        </select>
                                                    </div>
                                            }
                                        </div>
                                        <div className={styles.PaginationControls}>
                                            <IconButton 
                                                icon={['fas', 'angle-double-left']}
                                                disabled={currentPage === 1} 
                                                onClick={() => paginationAction({currentPage: 1})} 
                                            />
                                            <IconButton 
                                                icon={['fas', 'angle-left']} 
                                                disabled={currentPage === 1} 
                                                onClick={() => paginationAction({currentPage : parseInt(currentPage)-1})}
                                            />

                                            <span>página {currentPage} de {totalPages}</span>
                                            
                                            <IconButton 
                                                icon={['fas', 'angle-right']} 
                                                disabled={currentPage === totalPages} 
                                                onClick={() => paginationAction({currentPage: parseInt(currentPage)+1})}
                                            />

                                            <IconButton 
                                                icon={['fas','angle-double-right']} 
                                                disabled={currentPage === totalPages} 
                                                onClick={() => paginationAction({currentPage: totalPages})}
                                            />
                                        </div>                                        
                                    </div>
                                </td>
                             </tr>
                    }
                </tfoot>
            </table>
    );
}

Table.propTypes = {
    children: PropTypes.array,
    title: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    rows: PropTypes.array,
    currentPage: PropTypes.number,
    regsPerPage: PropTypes.number,
    regsPerPageList: PropTypes.arrayOf(PropTypes.number),
    totalPages: PropTypes.number,
    paginationAction: PropTypes.func,
}

Table.defaultProps = {
    currentPage: 0,
}

export default Table;