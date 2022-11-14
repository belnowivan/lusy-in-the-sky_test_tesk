import flatten from 'lodash/flatten';
import { decode } from 'html-entities';
import { productServicesInstance } from "../../services/ProductServices";
import { Product } from "../../typings/common";
import ProductView from "../../components/ProductView/ProductView";
import styles from './product.module.scss';

type Params = { id: string };

interface StaticProps {
    paths: Array<{ params: Params }>,
    fallback: false,
}

export const getStaticPaths = async (): Promise<StaticProps> => {
    const { data: { pageCount } } = await productServicesInstance.get({ page: 0 });
    const arrayOfQueryAllPages = Array(pageCount).fill(null).map((_, index: number) =>
        productServicesInstance.get({ page: index + 1 }).then(({ data: { data } }) => data.map(({ id }) => id)));

    const productsPages = await Promise.all(arrayOfQueryAllPages);
    const allProductId: Array<number> = flatten(productsPages);
    return {
        paths: allProductId.map((id) => ({ params: { id: String(id) } })),
        fallback: false,
    }
};

export const getStaticProps = async ({ params }: { params: Params }) => {
    const { data } = await productServicesInstance.getById(Number(params.id));
    return {
        props: data,
    }
}

const Products = (product: Product) => {
    const descriptionHtml = decode(product.description);
    const productProps = { ...product, description: descriptionHtml };
    return (
        <div className={styles.productWrapper}>
            <ProductView {...productProps} />
        </div>
    )
};

export default Products;