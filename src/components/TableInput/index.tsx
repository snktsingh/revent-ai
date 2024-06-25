import React, { useState } from 'react';
import { Button, TextField, Typography, Table, TableBody, TableCell, TableRow, Menu, MenuItem, Popover } from '@mui/material';
import styled from 'styled-components';
import { Btns, Cell, Custom, StyledTable, StyledTableCell, TableGeneratorWrapper, Title } from './style';

interface InsertData {
    row: number;
    col: number;
}

interface TableGeneratorProps {
    anchorEl: any;
    handleClose: () => void;
    open: boolean;
    canvas : fabric.Canvas | null;
}

const TableGenerator: React.FC<TableGeneratorProps> = ({ anchorEl, handleClose, open, canvas }) => {
    const [endCell, setEndCell] = useState<number[]>([]);
    const [customRow, setCustomRow] = useState(3);
    const [customCol, setCustomCol] = useState(3);
    const [isCustom, setIsCustom] = useState(false);

    const handleClickTable = () => {
        if (endCell.length) {
            const [row, col] = endCell;
            if(canvas) {
                
            }
        }
    };

    const insertCustomTable = () => {
        if (customRow < 1 || customRow > 20 || customCol < 1 || customCol > 20) {
            alert('Rows/Columns must be between 1 and 20!');
            return;
        }
        // onInsert({ row: customRow, col: customCol });
        setIsCustom(false);
    };

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <TableGeneratorWrapper>
                    <Title>
                        <div>Table {endCell.length ? `${endCell[0]} x ${endCell[1]}` : ''}</div>
                        <div onClick={() => setIsCustom(!isCustom)}>{isCustom ? 'Back' : 'Customize'}</div>
                    </Title>
                    {!isCustom ? (
                       <StyledTable onMouseLeave={() => setEndCell([])} onClick={handleClickTable}>
                       <TableBody sx={{margin:'10px'}}>
                         {Array.from({ length: 10 }).map((_, row) => (
                           <TableRow key={row}>
                             {Array.from({ length: 10 }).map((_, col) => (
                               <StyledTableCell
                                 key={col}
                                 onMouseEnter={() => setEndCell([row + 1, col + 1])}
                               >
                                 <Cell className={endCell.length && row + 1 <= endCell[0] && col + 1 <= endCell[1] ? 'active' : ''} />
                               </StyledTableCell>
                             ))}
                           </TableRow>
                         ))}
                       </TableBody>
                     </StyledTable>
                    ) : (
                        <Custom>
                            <div className="row">
                                <label>Rows:</label>
                                <TextField
                                    type="number"
                                    value={customRow}
                                    onChange={(e) => setCustomRow(Number(e.target.value))}
                                    inputProps={{ min: 1, max: 20 }}
                                    fullWidth
                                />
                            </div>
                            <div className="row">
                                <label>Columns:</label>
                                <TextField
                                    type="number"
                                    value={customCol}
                                    onChange={(e) => setCustomCol(Number(e.target.value))}
                                    inputProps={{ min: 1, max: 20 }}
                                    fullWidth
                                />
                            </div>
                            <Btns>
                                <Button variant="contained" >
                                    Cancel
                                </Button>
                                <Button variant="contained" color="primary" onClick={insertCustomTable}>
                                    Confirm
                                </Button>
                            </Btns>
                        </Custom>
                    )}
                </TableGeneratorWrapper>
            </Popover>
        </>
    );
};

export default TableGenerator;