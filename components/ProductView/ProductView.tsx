import Image from 'next/image';
import { Product } from '../../typings/common';
import SizePicker from '../SizePicker/SizePicker';
import { useStore } from '../../store/StoreProvider';
import styles from './styles.module.scss';
import { useState } from 'react';
import Price from '../Price/Price';


const ProductView = ({ description, name, image, special, price, sizes, id, model }: Product) => {

    const store = useStore();
    const [size, setSize] = useState<Product['sizes'][number]>();
    const [error, setError] = useState<boolean>();

    const handleAddProduct = () => {
        if (!size) {
            setError(true);
            return;
        }
        store.addProduct({ description, name, image, special, price, sizes, id, model, size });
    }

    const handleSetSize = (value: Product['sizes'][number]) => {
        setSize(value);
        setError(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.product}>
                <div className={styles.imageWrapper}>
                    <Image src={image} fill alt={name} />
                </div>
                <div className={styles.content}>
                    <div className={styles.contentName}>{name}</div>
                    <div className={styles.contentPrice}>
                        <Price price={price} special={special} size={'L'} />
                    </div>
                    <div className={styles.contentSizes}>
                        Size
                        <SizePicker sizes={sizes} currentSize={size} onSizeChange={handleSetSize} />
                    </div>
                    {error && <p className={styles.error}>Please select your size</p>}
                    <button className={styles.addProductButton} onClick={handleAddProduct}>Add More</button>
                    <div className={styles.contentDescription} dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </div>
        </div>);
}

export default ProductView;