import { useAppDispatch, useAppSelector } from '@/redux/store';
import { InputBase } from '@mui/material';
import {
  AddNotesContainer,
  NotesBodyContainer,
  NotesInput
} from './style';
import { ChangeEvent } from 'react';
import { updateCurrentCanvas } from '@/redux/reducers/canvas';
import { useDebounce } from '@/hooks/useDebounce';
import { updateSlideJSONData } from '@/redux/thunk/thunk';
import { useParams, useSearchParams } from 'react-router-dom';

export const CanvasNotes = () => {
  const dispatch = useAppDispatch();
  const { openNotes } = useAppSelector(store => store.element);
  const { canvasJS, canvasList } = useAppSelector((state) => state.canvas);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams<{ id: string }>();

  const pptId = Number(params.id?.split('-')[0]);
  const slideId = searchParams.get('slide');
  const slideIndex = canvasList.findIndex(slide => slide.id === canvasJS.id);
  const handleNotesChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updateCanvas = { ...canvasJS, notes: e.target.value };
    dispatch(updateCurrentCanvas(updateCanvas));


    if (canvasList[slideIndex].variants.length > 0) {
      debounceNotes(e);
    }
  };

  const debounceNotes = useDebounce((e: any) => {
    const updatedSlideNotes = {
      pptId,
      slideJSON: canvasList[slideIndex].originalSlideData,
      notes: e.target.value,
      slideId,
    };
    dispatch(updateSlideJSONData(updatedSlideNotes))
  }, 500)


  return (
    <NotesBodyContainer>
      <AddNotesContainer isactive="true">
        <span>
          <NotesInput placeholder="Click here to add notes..." value={canvasJS.notes} onChange={handleNotesChange} />
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
