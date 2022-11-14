import { useEffect, useState } from "react";
import { clsx } from 'clsx';
import styles from './styles.module.scss';
import Link from "next/link";
import { GoPrev, GoNext } from '../Icon'
import { navigation } from "../../constants";

interface PaginationInterface {
    currentPage: number,
    totalPage: number,
}

type Pages = Array<{ index: number, current: boolean, visible?: boolean }>

const parseToVisiblePages = (pages: Pages, currentPage: number): Pages => {
    if (pages.length <= 7) {
        return pages;
    }

    if (currentPage <= 3) {
        return [
            ...pages.slice(0, 4),
            { ...pages[4], visible: false },
            pages[pages.length - 1]
        ];
    }

    if (pages.length - currentPage <= 2) {
        return [
            pages[0],
            { ...pages[pages.length - 5], visible: false },
            ...pages.slice(pages.length - 4, pages.length)
        ];
    }
    return [
        pages[0],
        { ...pages[currentPage - 2], visible: false },
        ...pages.slice(currentPage - 1, currentPage + 1),
        { ...pages[currentPage + 1], visible: false },
        pages[pages.length - 1]
    ];
}

const getPagesArray = (currentPage: number, totalPage: number) => {
    const pagesArray = Array(totalPage).fill(null)
        .map((_, index) => (
            {
                index: index + 1,
                current: index + 1 === currentPage,
                visible: true,
            })
        );
    return parseToVisiblePages(pagesArray, currentPage);
}

const Pagination = ({ currentPage, totalPage }: PaginationInterface) => {
    const initPages = getPagesArray(currentPage, totalPage);
    const [pages, setPages] = useState<Pages>(initPages);

    useEffect(() => {
        const pages = getPagesArray(currentPage, totalPage);
        setPages(pages);
    }, [currentPage, totalPage]);

    return (
        <div>
            <div className={styles.wrapper}>
                <Link href={navigation.getPage(1)} className={clsx(currentPage < 2 && styles.pageDisable)}>
                    <div className={clsx(styles.pageItem, styles.pageItemFirstItem)}>
                        <GoPrev />
                        <GoPrev />
                    </div>
                </Link>
                <Link href={navigation.getPage(currentPage - 1)} className={clsx(currentPage < 2 && styles.pageDisable)}>
                    <div className={clsx(styles.pageItem)}>
                        <GoPrev />
                    </div>
                </Link>
                {pages.map((page: Pages[number]) => (
                    (<Link key={page.index} href={navigation.getPage(page.index)}
                        className={clsx((!page.visible || currentPage === page.index) && styles.pageDisable)}
                    >
                        <div className={clsx(styles.pageItem, page.current && styles.pageItemActive)}>
                            {page.visible ? page.index : '...'}
                        </div >
                    </Link>)
                ))}
                <Link href={navigation.getPage(currentPage + 1)} className={clsx(currentPage === totalPage && styles.pageDisable)}>
                    <div className={clsx(styles.pageItem)}>
                        <GoNext />
                    </div>
                </Link>
                <Link href={navigation.getPage(totalPage)} className={clsx(currentPage === totalPage && styles.pageDisable)}>
                    <div className={clsx(styles.pageItem, styles.pageItemLastItem)}>
                        <GoNext />
                        <GoNext />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Pagination;