import { useAppDispatch, useAppSelector } from '@/redux/store';
import { InputBase } from '@mui/material';
import {
  AddNotesContainer,
  NotesBodyContainer
} from './style';
import { ChangeEvent } from 'react';
import { updateCurrentCanvas } from '@/redux/reducers/canvas';

export const CanvasNotes = () => {
  const dispatch = useAppDispatch();
  const { openNotes } = useAppSelector(store => store.element);
  const { canvasJS } = useAppSelector((state)=> state.canvas);

  const handleNotesChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const updateCanvas = {...canvasJS,notes: e.target.value};
     dispatch(updateCurrentCanvas(updateCanvas));
  }

  return (
    <NotesBodyContainer>
      <AddNotesContainer isActive={true}>
        <span>
          <InputBase placeholder="Click here to add notes..." value={canvasJS.notes} onChange={handleNotesChange} />
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
