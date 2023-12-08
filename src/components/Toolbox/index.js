import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames'

import styles from './index.module.css'
import { COLORS, MENU_ITEMS } from '@/constants';
import { changeColor, changeBrushSize } from '@/slice/toolboxSlice'

const Toolbox = () => {
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

    const dispatch = useDispatch();

    const updateBrushSize = (e) => {
        dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }))
    };

    const updateColor = (newColor) => {
        dispatch(changeColor({ item: activeMenuItem, color: newColor }))
    };

    const { color, size } = useSelector((state) => (state.toolbox[activeMenuItem]));

    return (
        <div className={styles.toolboxContainer}>
            {activeMenuItem !== MENU_ITEMS.ERASER && <div className={styles.toolItem} style={{ marginBottom: "1.25rem" }}>
                <h4 className={styles.toolText}>Brush Color</h4>
                <div className={styles.itemContainer}>
                    {/* div for color */}
                    <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLACK })} style={{ backgroundColor: COLORS.BLACK }}
                        onClick={() => updateColor(COLORS.BLACK)}
                    />
                    <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.RED })} style={{ backgroundColor: COLORS.RED }}
                        onClick={() => updateColor(COLORS.RED)}
                    />
                    <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.GREEN })} style={{ backgroundColor: COLORS.GREEN }}
                        onClick={() => updateColor(COLORS.GREEN)}
                    />
                    <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLUE })} style={{ backgroundColor: COLORS.BLUE }}
                        onClick={() => updateColor(COLORS.BLUE)}
                    />
                    <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.ORANGE })} style={{ backgroundColor: COLORS.ORANGE }}
                        onClick={() => updateColor(COLORS.ORANGE)}
                    />
                    <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.YELLOW })} style={{ backgroundColor: COLORS.YELLOW }}
                        onClick={() => updateColor(COLORS.YELLOW)}
                    />
                </div>
            </div>}
            <div className={styles.toolItem}>
                <h4 className={styles.toolText}>
                    {activeMenuItem === MENU_ITEMS.ERASER ? 'Eraser' : 'Brush'} Size
                </h4>
                <input type="range" min={1} max={10} step={1} value={size} onChange={updateBrushSize} />
            </div>
        </div>
    )
}

export default Toolbox