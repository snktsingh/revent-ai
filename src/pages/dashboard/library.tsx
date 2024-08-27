import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
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
  setDeletedStatus,
} from '@/redux/thunk/dashboard';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
import { theme } from '@/constants/theme';
import { MoreVert } from '@mui/icons-material';
import useDashboard from './container';
import PresentationCardContextMenu from '@/common-ui/presentationContextMenu';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setUserAgent } from 'react-device-detect';
import { FetchUtils } from '@/utils/fetch-utils';
import ENDPOINT from '@/constants/endpoint';
import { toast } from 'react-toastify';

const MyLibrary = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPptList, setFilteredPptList] = useState<IPresentation[]>([]);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentPresentation, setCurrentPresentation] = useState<any>(null);
  const { pptList, isDeleted } = useAppSelector(state => state.manageDashboard);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const { setPptId } = useDashboard();
  const [pagination, setPagination] = useState<number>(0);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(true);

  const handleContextMenu = (event: React.MouseEvent, presentation: any) => {
    event.preventDefault();
    setCurrentPresentation(presentation);
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const fetchPaginatedPPT = async (page: number) => {
    const res = await FetchUtils.getRequest(
      `${ENDPOINT.DASHBOARD.FETCH_PPT_LIST}?size=20&page=${page}`
    );
    if (isDeleted === true) {
      setFilteredPptList(res.data);
      setInitialLoading(false);
      dispatch(setDeletedStatus(false));
    } else {
      if (res.data.length === 0) {
        toast.success('No more presentations to load');
        setHasMore(false);
      } else {
        setFilteredPptList(prev => [...prev, ...res.data]);
        setInitialLoading(false);
      }
    }
  };

  useEffect(() => {
    setFilteredPptList([]);
    fetchPaginatedPPT(pagination);
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
  }, [pptList, isDeleted, isSearchActive]);

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handlePptSearch = async () => {
    try {
      if (debouncedSearchTerm) {
        setInitialLoading(true);
        const endpoint = `${ENDPOINT.PPT.FILTER_PPT}?name=${debouncedSearchTerm}`;
        const res = await FetchUtils.getRequest(endpoint);
        setFilteredPptList(res.data);
        setInitialLoading(false);
      } else {
        setInitialLoading(true);
        setFilteredPptList([]);
        dispatch(fetchPPTList(1));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handlePptSearch();
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="flex-end">
        <TextField
          size="small"
          placeholder="Search Presentation"
          onChange={handleInputChange}
        />
      </Box>
      {initialLoading === false ? (
        <Box onContextMenu={e => e.preventDefault()} sx={{ marginTop: '3%' }}>
          <Box height="70vh" overflow="auto" id="scrollableDiv">
            <InfiniteScroll
              dataLength={filteredPptList.length}
              next={() => {
                fetchPaginatedPPT(pagination + 1);
                setPagination(pagination + 1);
              }}
              hasMore={hasMore}
              style={{ overflow: 'hidden' }}
              loader={
                filteredPptList.length > 0 ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    mt={5}
                    color="gray"
                  >
                    <CircularProgress color="inherit" size={18} />
                  </Box>
                ) : (
                  <></>
                )
              }
              scrollableTarget="scrollableDiv"
            >
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
                              {moment(ppt.lastModifiedDate).format(
                                'DD/MM/YYYY'
                              )}
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
              </CardTitle>
            </InfiniteScroll>
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
