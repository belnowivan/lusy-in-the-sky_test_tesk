import { clsx } from 'clsx';
import { Size } from '../../typings/common';
import styles from './styles.module.scss';

const sizeMap = {
    Small: 'S',
    Medium: 'M',
    Large: 'L',
}

interface SizePickerProps {
    sizes: Array<Size>,
    currentSize?: Array<Size>[number],
    onSizeChange: (size: Array<Size>[number]) => void,
}

const SizePicker = ({ sizes, currentSize, onSizeChange }: SizePickerProps) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.sizes}>
                {sizes.map((size, i) => (
                    (<button key={`${size}__${i}`}
                        onClick={() => onSizeChange(size)}
                        className={clsx(styles.sizesItem, size === currentSize && styles.sizesItemSelected)}
                    >
                        {sizeMap[size]}
                    </button>)
                ))}
            </div>
        </div>);
}

export default SizePicker;