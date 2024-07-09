import { Box, Card } from '@mui/material';
import { CardTitle } from './style';
import { PresetIcon } from '@/constants/media';
import { fetchPresetsById, togglePresetOpened } from '@/redux/thunk/dashboard';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setCanvas, updateCanvasList } from '@/redux/reducers/canvas';
import { useNavigate } from 'react-router-dom';

const AdminTemplates = () => {
  const { presetList } = useAppSelector(state => state.manageDashboard);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchPreset = async (presetId: number) => {
    const res = await dispatch(fetchPresetsById(presetId));
    const presetList = res.payload;
    dispatch(updateCanvasList(presetList));
    dispatch(setCanvas(presetList[0]));
  };

  return (
    <Box sx={{ marginTop: '30px' }}>
      <p style={{ fontSize: '14px', fontWeight: '600' }}>Templates</p>
      {presetList.length > 0 && (
        <>
          {presetList.map((preset, index) => {
            return (
              <CardTitle
                key={preset.presetName + index}
                onClick={() => {
                  navigate('/themes');
                  fetchPreset(preset.id);
                  dispatch(togglePresetOpened(true));
                }}
              >
                <Card
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    justifyContent: 'space-between',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  }}
                >
                  <img src={PresetIcon} width="100%" height="100%" />
                  <span title={preset.presetName}>{preset.presetName}</span>
                </Card>
              </CardTitle>
            );
          })}
        </>
      )}
    </Box>
  );
};
export default AdminTemplates;
