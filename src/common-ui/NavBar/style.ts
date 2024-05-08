import { theme } from "@/constants/theme";
import { Button, Grid, Stack } from "@mui/material";
import styled from "styled-components";


export const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  background-color: ${theme.colorSchemes.light.palette.common.white};
  height: 8vh;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  display: flex;
  align-items: center;
  z-index: 999;
`;

export const MenuButton = styled(Button)`
  color: #2f2f2f !important;
  font-weight: 400 !important;
`;

export const GridRowCenter = styled(Grid)`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const GridColCenter = styled(Grid)`
  display: flex;
  align-items: center;
`;
export const GridJustify = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const GridRowEven = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  padding-top: 0px !important;
`;
export const StackColCenter = styled(Stack)`
  display: flex;
  align-items: center;
`;

export const GridContainer = styled(Grid)`
  margin: 0px !important;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;