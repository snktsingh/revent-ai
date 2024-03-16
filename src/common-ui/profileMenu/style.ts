import { Menu, MenuItem } from "@mui/material";
import styled from "styled-components";

export const StyledMenu = styled(Menu)`
  && {
    .MuiPaper-root {
      border: 1px solid #d3d4d5;
      background-color: #ffffff;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  && {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    padding: 10px 20px;
    color: #333333;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;