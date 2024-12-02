'use client'

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination } from '@mui/material';

import httpService from '@/services/httpService';


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

    const columns = [
        { key: "requstor", label: "Requestor", sx: { thWrap: { minWidth: '100px' } } },
        { key: "server", label: "Server", sx: { thWrap: { minWidth: '100px' } } },
        { key: "status", label: "Status", sx: { thWrap: { minWidth: '100px' } } },
        { key: "itsi", label: "Itsi", sx: { thWrap: { minWidth: '200px' } } },
        { key: "tc", label: "TC", sx: { thWrap: { minWidth: '100px' } } },
        { key: "master_cr", label: "Master CR", sx: { thWrap: { minWidth: '100px' } } },
        { key: "seeduled_date", label: "Scheduled Date", sx: { thWrap: { minWidth: '160px' } } },
        { key: "location", label: "Location", sx: { thWrap: { minWidth: '250px' } } },
        { key: "os", label: "OS", sx: { thWrap: { minWidth: '100px' } } },
        { key: "class", label: "Class", sx: { thWrap: { minWidth: '100px' } } },
        { key: "hardware", label: "Hardware", sx: { thWrap: { minWidth: '100px' } } },
        { key: "us", label: "US", sx: { thWrap: { minWidth: '100px' } } },
        { key: "serial_number", label: "Serial Number", sx: { thWrap: { minWidth: '100px' } } },
        { key: "cs_serial", label: "CS Serial", sx: { thWrap: { minWidth: '100px' } } },
    ];

    const [rawData, setRawData] = useState([]);
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
        httpService.get('API-Url').then((res) => {
            setRawData(res.data.data);
            setFilteredRows(res.data.data);
        }).catch((err) => {
            setRawData([]);
            setFilteredRows([]);
        });
    }, []);

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

        let sortedRows = [...rawData].sort((a, b) => {
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
                                {columns.map((item, i) => {
                                    return (
                                        <TableCell key={i} sx={item.sx.thWrap}>
                                            <div style={_styles.table.filterLabelGroup}>
                                                <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                                            </div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row, i) => (
                                <TableRow key={i}>
                                    {columns.map((item, j) => <TableCell key={j}>{row[item.key]}</TableCell>)}
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

            {
                // <div style={{ background: '#fafafa', padding: '12px', borderRadius: '8px' }}>
                //     <h2 style={{ margin: '0 0 24px', fontWeight: '400' }}>Requests Workflow</h2>
                //     <TableContainer component={Paper}>
                //         <Table sx={{ textAlignLast: 'center' }}>
                //             <TableHead>
                //                 <TableRow>
                //                     {/* <TableCell>ID</TableCell> */}
                //                     <TableCell>
                //                         <div style={_styles.table.filterLabelGroup}>
                //                             <span>Request</span>
                //                             <input type="text" style={_styles.table.filterInput} value={filters.request} onChange={(event) => handleFilterInputChange(event, 'request')} />
                //                         </div>
                //                     </TableCell>
                //                     <TableCell>
                //                         <div style={_styles.table.filterLabelGroup}>
                //                             <span>Change Request</span>
                //                             <input type="text" style={_styles.table.filterInput} value={filters.changeRequest} onChange={(event) => handleFilterInputChange(event, 'changeRequest')} />
                //                         </div>
                //                     </TableCell>
                //                     <TableCell>
                //                         <div style={_styles.table.filterLabelGroup}>
                //                             <span>Step Order</span>
                //                             <input type="text" style={_styles.table.filterInput} value={filters.stepOrder} onChange={(event) => handleFilterInputChange(event, 'stepOrder')} />
                //                         </div>
                //                     </TableCell>
                //                     <TableCell>
                //                         <div style={_styles.table.filterLabelGroup}>
                //                             <span>Step Description</span>
                //                             <input type="text" style={_styles.table.filterInput} value={filters.stepDescription} onChange={(event) => handleFilterInputChange(event, 'stepDescription')} />
                //                         </div>
                //                     </TableCell>
                //                     <TableCell>
                //                         <div style={_styles.table.filterLabelGroup}>
                //                             <span>Status</span>
                //                             <select name="status" id="status" value={filters.status} onChange={(event) => handleFilterInputChange(event, 'status')} style={_styles.table.statusInput}>
                //                                 <option value="">All</option>
                //                                 <option value="COMPLETED">Completed</option>
                //                                 <option value="SKIPPED">Skipped</option>
                //                             </select>
                //                         </div>
                //                     </TableCell>
                //                     <TableCell>
                //                         <div style={_styles.table.filterLabelGroup}>
                //                             <span>
                //                                 <TableSortLabel
                //                                     direction={order}
                //                                     onClick={handleRequestSort}
                //                                 >Modified On
                //                                 </TableSortLabel>
                //                             </span>
                //                             {/* <input type="text" style={_styles.table.filterInput} value={filters.modifiedOn} onChange={(event) => handleFilterInputChange(event, 'modifiedOn')} /> */}
                //                         </div>
                //                     </TableCell>
                //                     <TableCell>Message</TableCell>
                //                 </TableRow>
                //             </TableHead>
                //             <TableBody>
                //                 {filteredRows.map((row) => (
                //                     <TableRow key={row.id}>
                //                         {/* <TableCell>{row.id}</TableCell> */}
                //                         <TableCell>{row.request}</TableCell>
                //                         <TableCell>{row.changeRequest}</TableCell>
                //                         <TableCell>{row.stepOrder}</TableCell>
                //                         <TableCell>{row.stepDescription}</TableCell>
                //                         <TableCell>
                //                             <div style={{
                //                                 ..._styles.table.statusLabel,
                //                                 ...(row.status === 'COMPLETED' ? { color: '#FFFFFF', backgroundColor: 'green' } : { color: '#000000', backgroundColor: 'orange' })
                //                             }}>
                //                                 {row.status}
                //                             </div>
                //                         </TableCell>
                //                         <TableCell style={{ textWrap: 'nowrap' }}>{row.modifiedOn}</TableCell>
                //                         <TableCell>{row.message || '-'}</TableCell>
                //                     </TableRow>
                //                 ))}
                //             </TableBody>
                //         </Table>

                //         {/* <TablePagination
                //     rowsPerPageOptions={[5, 10, 25]}
                //     component="div"
                //     count={filteredRows.length}
                //     rowsPerPage={rowsPerPage}
                //     page={page}
                //     onPageChange={handleChangePage}
                //     onRowsPerPageChange={handleChangeRowsPerPage}
                // /> */}
                //     </TableContainer>
                // </div>
            }
        </div>
    );
}
