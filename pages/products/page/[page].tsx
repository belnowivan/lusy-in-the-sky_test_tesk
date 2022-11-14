import Image from "next/image";
import Link from "next/link";
import { productServicesInstance } from "../../../services/ProductServices";
import { Product } from "../../../typings/common";
import Pagination from "../../../components/Pagination/Pagination";
import styles from './page.module.scss';
import Price from "../../../components/Price/Price";
import { navigation } from "../../../constants";

export const getStaticPaths = async () => {
    const { data: { pageCount } } = await productServicesInstance.get();
    const paths = Array(pageCount).fill(null).map((_product, index) => ({ params: { page: String(index + 1) } }));
    return {
        paths,
        fallback: false,
    }
};

export const getStaticProps = async ({ params: { page } }: { params: { page: number } }) => {
    const { data: { data, pageCount } } = await productServicesInstance.get({ page });
    return {
        props: { products: data, page, pageCount }
    }
}
const Products = ({ products, page, pageCount }: { products: Array<Product>, page: number, pageCount: number }) => {
    return (
        <>
            <div className={styles.productsHeader}>
                New in
            </div>
            <div className={styles.productsWrapper}>
                {products.map(product => {
                    return (
                        <div className={styles.productsItem} key={product.id}>
                            <Link href={navigation.getProduct(product.id)}>
                                <div className={styles.imageWrapper}>
                                    <Image src={product.image} alt={product.name} fill />
                                </div>
                            </Link>
                            <div className={styles.productsItemName}>{product.name}</div>
                            {product.sizes.length && <div className={styles.productsItemSizes}>{product.sizes.join(', ')}</div>}
                            <div className={styles.productsItemPrice}>
                                <Price price={product.price} special={product.special} size="S" />
                            </div>
                        </div>)
                })}
            </div>
            <div className={styles.paginationWrapper}>
                <Pagination currentPage={Number(page)} totalPage={Number(pageCount)} />
            </div>
        </>
    );
};

export default Products;