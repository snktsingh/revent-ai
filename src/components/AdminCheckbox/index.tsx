import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ToggleButtonCover, Button, Checkbox, Knobs, Layer, DIV } from './style';
import { toggleIsAdmin } from '@/redux/thunk/user';

const AdminCheckbox = () => {

    const { isAdmin } = useAppSelector(state => state.manageUser);
    const dispatch = useAppDispatch();

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleIsAdmin(e.target.checked))
    }

    return (
        <DIV>
            <span>isAdmin?</span>
            <ToggleButtonCover>
                <Button>
                    <Checkbox onChange={handleCheckbox} checked={isAdmin} />
                    <Knobs />
                    <Layer />
                </Button>
            </ToggleButtonCover>
        </DIV>
    );
}

export default AdminCheckbox;
