import Image from 'next/image';
import { clsx } from 'clsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreProvider';
import styles from './cart.module.scss';
import Price from '../../components/Price/Price';
import { LoadingStatus } from '../../typings/common';

const Cart = () => {
    const store = useStore();
    return (
        <div className={styles.wrapper}>
            <div className={styles.cart}>
                <div className={styles.head}>My Order</div>
                {store.count > 0 &&
                    <div className={styles.content}>
                        <div className={styles.productList}>
                            {store.products.map((product) =>
                                <div key={product.uuid} className={styles.cartItem}>
                                    <Image src={product.image} alt='img' width={115} height={190} />
                                    <div className={styles.description}>
                                        <p>{product.name}</p>
                                        <p>{product.size}</p>
                                        <Price price={product.price} special={product.special} size={'M'} />
                                        <button className={styles.button} onClick={() => store.removeProduct(product.uuid)}>
                                            remove
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.buyCartWrapper}>
                            <div className={styles.buyCart}>
                                <p>Total</p>
                                <p>${store.price}</p>
                            </div>
                            <button
                                className={clsx(styles.button, styles.checkoutButton)}
                                onClick={() => store.checkout()}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>}
                {store.checkoutStatus === LoadingStatus.Success && store.lastOrderId &&
                    <p>Your order id is {store.lastOrderId}</p>
                }
            </div>
        </div>
    )
};

export default observer(Cart);