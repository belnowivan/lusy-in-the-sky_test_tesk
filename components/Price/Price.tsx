import { clsx } from 'clsx';

import styles from './styles.module.scss';

interface PriceProps {
    price: string,
    special: string,
    size: 'S' | 'M' | 'L',
}

const Price = ({ price, special, size }: PriceProps) => {
    const styleSizeKey = `size${size || 'M'}`;
    return (
        <div className={clsx(styles.wrapper, styles[styleSizeKey])}>
            <div className={clsx(styles.price, special && styles.priceOld)}>
                {price}
            </div>
            {special && <div className={clsx(styles.special)}>
                {special}
            </div>
            }
        </div >
    );
};

export default Price;