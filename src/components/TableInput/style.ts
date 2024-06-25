import { Table, TableCell } from "@mui/material";
import styled from "styled-components";

export const TableGeneratorWrapper = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  height: 28px;
  line-height: 28px;
  background-color: #ededed;
  margin: 0 -12px 12px -12px;
  padding: 0 14px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  user-select: none;

  .right {
    cursor: pointer;

    &:hover {
      color: #3f51b5;
    }
  }
`;

export const Cell = styled.div`
  width: 1.5em;
  height: 1.5em;
  border: 1px solid #dcdcdc;
  box-sizing: border-box; 
  &.active {
    background-color: rgba(63, 81, 181, 0.1);
    border-color: #3f51b5;
  }
`;

export const Custom = styled.div`
  width: 230px;

  .row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    label {
      width: 25%;
    }

    input {
      width: 75%;
    }
  }
`;

export const Btns = styled.div`
  margin-top: 10px;
  text-align: right;

  button {
    margin-left: 10px;
  }
`;


export const StyledTable = styled.table`
  border-collapse: separate;
  padding: 0px 6px 0px 6px;
`;

export const StyledTableCell = styled.td`
  border: none;
  margin: 10px;
`;
