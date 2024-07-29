import { Box, IconButton, Stack } from '@mui/material';
import {
  BlankImageCard,
  CardTitle,
  Loader,
  LoaderText,
  PPTCard,
  PPTTitle,
  ThumbnailCard,
  TitleCard,
} from './style';
import { faker } from '@faker-js/faker';
import { Blank } from '@/constants/media';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect, useRef, useState } from 'react';
import {
  IPresentation,
  fetchPPTList,
  fetchPresets,
} from '@/redux/thunk/dashboard';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { theme } from '@/constants/theme';
import { MoreVert } from '@mui/icons-material';
import useDashboard from './container';
import PresentationCardContextMenu from '@/common-ui/presentationContextMenu';
import moment from 'moment';

const MyLibrary = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPptList, setFilteredPptList] = useState<IPresentation[]>([]);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentPresentation, setCurrentPresentation] = useState<any>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const { setPptId } = useDashboard();

  const handleContextMenu = (event: React.MouseEvent, presentation: any) => {
    event.preventDefault();
    setCurrentPresentation(presentation);
    setContextMenu({ x: event.clientX, y: event.clientY });
    // setContextMenu(contextMenu === null ? { x: event.clientX, y: event.clientY } : null);
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const { loadingUserDetails, pptList, presetList } = useAppSelector(
    state => state.manageDashboard
  );

  useEffect(() => {
    const filteredList =
      searchTerm.length > 0
        ? pptList.filter((ppt: IPresentation) =>
            ppt.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : pptList;

    setFilteredPptList(filteredList);
  }, [pptList, searchTerm]);

  useEffect(() => {
    dispatch(fetchPPTList(0));
    dispatch(fetchPresets());

    function handleClick(e: any) {
      if (contextMenuRef.current) {
        if (
          !contextMenuRef.current.contains(e.target) &&
          e.target.id !== 'more_menu'
        ) {
          setContextMenu(null);
        }
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleMore = async () => {
    await dispatch(fetchPPTList(1));
  };

  return (
    <div>
      {loadingUserDetails === false ? (
        <Box onContextMenu={e => e.preventDefault()} sx={{ marginTop: '3%' }}>
          <Box height="78vh" overflow="auto">
            <CardTitle>
              {filteredPptList.map((ppt: any, index) => {
                return (
                  <PPTCard
                    key={ppt.presentationId}
                    onContextMenu={e => handleContextMenu(e, ppt)}
                  >
                    <ThumbnailCard>
                      {ppt.thumbnailUrl !== '' ? (
                        <img
                          src={ppt.thumbnailUrl}
                          alt={ppt.name}
                          width={'100%'}
                          height={'80%'}
                          style={{
                            borderRadius: '6px',
                            cursor: 'pointer',
                            marginBottom: '10px',
                          }}
                          onClick={() => {
                            navigate(
                              `/presentation/${
                                ppt.presentationId
                              }-${faker.string.uuid()}`
                            );
                          }}
                        />
                      ) : (
                        <BlankImageCard>
                          <img
                            src={Blank}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              navigate(
                                `/presentation/${
                                  ppt.presentationId
                                }-${faker.string.uuid()}`
                              );
                            }}
                          />
                        </BlankImageCard>
                      )}
                      <TitleCard>
                        <Stack direction="column" spacing={0.5}>
                          <PPTTitle title={ppt.name}>
                            {ppt.name == undefined
                              ? 'Untitled-presentation'
                              : ppt.name}
                          </PPTTitle>
                          <div
                            style={{
                              width: '100%',
                              padding: '0px 0px 0px 0px',
                              fontSize: '11px',
                              color: 'grey',
                              fontWeight: '200',
                            }}
                          >
                            Opened -{' '}
                            {moment(ppt.lastModifiedDate).format('DD/MM/YYYY')}
                          </div>
                        </Stack>
                        <IconButton
                          onClick={event => {
                            handleContextMenu(event, ppt);
                            setPptId(ppt.presentationId);
                          }}
                          id="more_menu"
                        >
                          <MoreVert id="more_menu" fontSize="small" />
                        </IconButton>
                      </TitleCard>
                    </ThumbnailCard>
                  </PPTCard>
                );
              })}
            </CardTitle>{' '}
          </Box>
          {/* <Button
        variant="outlined"
        sx={{ marginTop: '10px' }}
        onClick={handleMore}
        disabled={!hasMore} // Disable the button if no more presentations
      >
        Load more
      </Button> */}
        </Box>
      ) : (
        <Loader>
          <MagnifyingGlass
            visible={true}
            height="120"
            width="120"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="loader"
            glassColor="#c0efff"
            color={`${theme.colorSchemes.light.palette.primary.main}`}
          />
          <br />
          <LoaderText>
            Gathering your Spectacular Presentations. Please hold tight...
          </LoaderText>
        </Loader>
      )}
      <PresentationCardContextMenu
        anchorPoint={contextMenu || { x: 0, y: 0 }}
        isOpen={contextMenu !== null}
        onClose={handleCloseContextMenu}
        presentation={currentPresentation}
        contextMenuRef={contextMenuRef}
      />
    </div>
  );
};

export default MyLibrary;
