import React from 'react';
import {
  AddNotesContainer,
  NotesBodyContainer,
  NotesHeading,
  NotesHeadingContainer,
} from './style';
import { NotesIcon } from '@/constants/media';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toggleNotesSlide } from '@/redux/reducers/elements';
import { Input, InputBase } from '@mui/material';

export const CanavasNotes = () => {
  const dispatch = useAppDispatch();
  const { openNotes } = useAppSelector(store => store.element);

  return (
    <NotesBodyContainer>
      <AddNotesContainer isActive={true}>
        <span>
          <InputBase placeholder="Click here to add notes..." />
        </span>
      </AddNotesContainer>
      {/* <NotesHeadingContainer>
        <NotesHeading onClick={() => dispatch(toggleNotesSlide())}>
          <img src={NotesIcon} alt="Notes Icon" />
          <p>Notes</p>
        </NotesHeading>
      </NotesHeadingContainer> */}
    </NotesBodyContainer>
  );
};
