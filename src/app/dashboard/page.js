'use client'

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination } from '@mui/material';


// // Define the type for your rows
// interface IRow {
//   id: number;
//   request: number;
//   changeRequest: string;
//   stepOrder: number;
//   stepDescription: string;
//   status: string;
//   modifiedOn: string;
//   message: string;
// }

const _styles = {
    table: {
        filterLabelGroup: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center'
        },
        filterInput: {
            width: '100%',
            outline: 'none',
            padding: '4px 6px',
            borderRadius: '3px',
            border: '1px solid gray',
            color: 'black',
            backgroundColor: 'white'
        },
        statusInput: {
            padding: '3px 8px',
            fontSize: '12px',
            borderRadius: '3px',
            outline: 'none',
            color: 'black',
            backgroundColor: 'white'
        },
        statusLabel: {
            margin: '0 auto',
            padding: '4px 8px',
            width: 'max-content',
            fontSize: '12px',
            lineHeight: 'normal',
            borderRadius: '3px',
            color: 'black',
            backgroundColor: 'white'
        }
    }
};

export default function Dashboard() {

    const rows = [
        { id: 1, request: 14261, changeRequest: 'CHG1016616824', stepOrder: 9, stepDescription: 'Send a notification email', status: 'COMPLETED', modifiedOn: '2024-10-23T22:34:19.205203', message: '' },
        { id: 2, request: 14262, changeRequest: 'CHG1016616824', stepOrder: 8, stepDescription: 'Close the current CR', status: 'COMPLETED', modifiedOn: '2024-10-23T22:34:17.473233', message: '' },
        { id: 3, request: 14263, changeRequest: 'CHG1016616825', stepOrder: 7, stepDescription: 'Rollback the uploaded Redirect file', status: 'SKIPPED', modifiedOn: '2024-10-23T22:34:09.199381', message: '' },
        { id: 4, request: 14264, changeRequest: 'CHG1016616826', stepOrder: 6, stepDescription: 'Manage DNS record', status: 'COMPLETED', modifiedOn: '2024-10-23T22:34:09.172394', message: '' },
        { id: 5, request: 14265, changeRequest: 'CHG1016616827', stepOrder: 5, stepDescription: 'Upload the updated Redirect file', status: 'COMPLETED', modifiedOn: '2024-10-23T22:34:06.195642', message: '' },
        { id: 6, request: 14266, changeRequest: 'CHG1016616828', stepOrder: 4, stepDescription: 'Upload the local Redirect file', status: 'COMPLETED', modifiedOn: '2024-10-23T22:33:50.847322', message: '' },
        { id: 7, request: 14267, changeRequest: 'CHG1016616829', stepOrder: 3, stepDescription: 'Create a backup Redirect file', status: 'COMPLETED', modifiedOn: '2024-10-23T22:33:29.388915', message: '' }
    ];

    const [filteredRows, setFilteredRows] = useState([]);
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(10); // Set default rows per page
    const [filters, setFilters] = useState({
        stepOrder: '',
        request: '',
        changeRequest: '',
        stepDescription: '',
        status: '',
        modifiedOn: ''
    });

    // const handleChangePage = (event, newPage: number) => { setPage(newPage); };

    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(parseInt(event.target.value, 10));
    //   setPage(0); // Reset to first page when rows per page changes
    // };

    const handleFilterInputChange = (event, filterType) => {
        setFilters({ ...filters, [filterType]: event.target.value });
        // setPage(0);
    };

    const [order, setOrder] = useState('asc');
    const handleRequestSort = () => {
        setOrder((order == 'asc') ? 'desc' : 'asc');
    };

    useEffect(() => {
        const filterRowsCb = (item) => {
            const matchesRequest = filters.request
                ? `${item.request}`.includes(filters.request) || filters.request.includes(String(item.request)) : true;

            const matchesChangeRequest = filters.changeRequest
                ? `${item.changeRequest}`.includes(filters.changeRequest) || filters.changeRequest.includes(String(item.changeRequest)) : true;

            const matchesStepOrder = filters.stepOrder ? item.stepOrder === parseFloat(filters.stepOrder) : true;
            const matchesStepDescription = filters.stepDescription ? `${item.stepDescription}`.includes(filters.stepDescription) : true;
            const matchesStatus = filters.status ? item.status === filters.status : true;

            return matchesRequest && matchesChangeRequest && matchesStepOrder && matchesStepDescription && matchesStatus;
        };

        let sortedRows = [...rows].sort((a, b) => {
            const dateA = new Date(a['modifiedOn']).getTime();
            const dateB = new Date(b['modifiedOn']).getTime();

            if (order === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        }).filter(filterRowsCb);

        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        setFilteredRows(sortedRows);
    }, [order, filters]);


    return (
        <div className="main-container">
            <div style={{ background: '#fafafa', padding: '12px', borderRadius: '8px' }}>
                <h2 style={{ margin: '0 0 24px', fontWeight: '400' }}>Physical Servers</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ textAlignLast: 'center' }}>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>ID</TableCell> */}
                                <TableCell>
                                    <div style={_styles.table.filterLabelGroup}>
                                        <span>Request</span>
                                        <input type="text" style={_styles.table.filterInput} value={filters.request} onChange={(event) => handleFilterInputChange(event, 'request')} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div style={_styles.table.filterLabelGroup}>
                                        <span>Change Request</span>
                                        <input type="text" style={_styles.table.filterInput} value={filters.changeRequest} onChange={(event) => handleFilterInputChange(event, 'changeRequest')} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div style={_styles.table.filterLabelGroup}>
                                        <span>Step Order</span>
                                        <input type="text" style={_styles.table.filterInput} value={filters.stepOrder} onChange={(event) => handleFilterInputChange(event, 'stepOrder')} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div style={_styles.table.filterLabelGroup}>
                                        <span>Step Description</span>
                                        <input type="text" style={_styles.table.filterInput} value={filters.stepDescription} onChange={(event) => handleFilterInputChange(event, 'stepDescription')} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div style={_styles.table.filterLabelGroup}>
                                        <span>Status</span>
                                        <select name="status" id="status" value={filters.status} onChange={(event) => handleFilterInputChange(event, 'status')} style={_styles.table.statusInput}>
                                            <option value="">All</option>
                                            <option value="COMPLETED">Completed</option>
                                            <option value="SKIPPED">Skipped</option>
                                        </select>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div style={_styles.table.filterLabelGroup}>
                                        <span>
                                            <TableSortLabel
                                                direction={order}
                                                onClick={handleRequestSort}
                                            >Modified On
                                            </TableSortLabel>
                                        </span>
                                        {/* <input type="text" style={_styles.table.filterInput} value={filters.modifiedOn} onChange={(event) => handleFilterInputChange(event, 'modifiedOn')} /> */}
                                    </div>
                                </TableCell>
                                <TableCell>Message</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow key={row.id}>
                                    {/* <TableCell>{row.id}</TableCell> */}
                                    <TableCell>{row.request}</TableCell>
                                    <TableCell>{row.changeRequest}</TableCell>
                                    <TableCell>{row.stepOrder}</TableCell>
                                    <TableCell>{row.stepDescription}</TableCell>
                                    <TableCell>
                                        <div style={{
                                            ..._styles.table.statusLabel,
                                            ...(row.status === 'COMPLETED' ? { color: '#FFFFFF', backgroundColor: 'green' } : { color: '#000000', backgroundColor: 'orange' })
                                        }}>
                                            {row.status}
                                        </div>
                                    </TableCell>
                                    <TableCell>{row.modifiedOn}</TableCell>
                                    <TableCell>{row.message || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
                </TableContainer>
            </div>
        </div>
    );
}
