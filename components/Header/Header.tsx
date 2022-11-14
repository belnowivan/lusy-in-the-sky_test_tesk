import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { Basket, Logo } from '../Icon';
import { useStore } from '../../store/StoreProvider';
import { navigation } from '../../constants';
import styles from './styles.module.scss';

const Header = () => {
    const store = useStore();
    return (
        <div className={styles.wrapper}>
            <Link href={navigation.getPage(1)}>
                <Logo />
            </Link>
            <Link href={navigation.getCart()}>
                <div className={styles.counterWrapper}>
                    <Basket />
                    {store?.count > 0 && <div className={styles.counter}>
                        {store?.count}
                    </div>}
                </div>
            </Link>
        </div >);
};

export default observer(Header);