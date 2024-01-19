import { useAppDispatch, useAppSelector } from '@/redux/store';
import { InputBase } from '@mui/material';
import {
  AddNotesContainer,
  NotesBodyContainer
} from './style';

export const CanvasNotes = () => {
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
