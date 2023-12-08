import { useSelector } from 'react-redux';
import styles from './index.module.css'
import { COLORS, MENU_ITEMS } from '@/constants';

const Toolbox = () => {
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

    const updateBrushSize = () => { };

    return (
        <div className={styles.toolboxContainer}>
            {activeMenuItem === MENU_ITEMS.PENCIL && <div className={styles.toolItem} style={{ marginBottom: "1.25rem" }}>
                <h4 className={styles.toolText}>Brush Color</h4>
                <div className={styles.itemContainer}>
                    {/* div for color */}
                    <div className={styles.colorBox} style={{ backgroundColor: COLORS.BLACK }} />
                    <div className={styles.colorBox} style={{ backgroundColor: COLORS.RED }} />
                    <div className={styles.colorBox} style={{ backgroundColor: COLORS.GREEN }} />
                    <div className={styles.colorBox} style={{ backgroundColor: COLORS.BLUE }} />
                    <div className={styles.colorBox} style={{ backgroundColor: COLORS.ORANGE }} />
                    <div className={styles.colorBox} style={{ backgroundColor: COLORS.YELLOW }} />
                </div>
            </div>}
            <div className={styles.toolItem}>
                <h4 className={styles.toolText}>
                    {activeMenuItem === MENU_ITEMS.ERASER ? 'Eraser' : 'Brush'} Size
                </h4>
                <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} />
            </div>
        </div>
    )
}

export default Toolbox