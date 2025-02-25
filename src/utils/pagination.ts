import { useEffect, useMemo, useState } from 'react';

export const defaultPaginationOptions = [10, 25, 50, 80, 120];

export const useApplyPagination = <RecordType>(records: RecordType[]) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPaginationOptions[0]);

    const dataInPage: RecordType[] = useMemo(() => {
        return records.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [currentPage, pageSize, records]);

    /**
     * Goes back to page one if the list is shrinked (e.g. when some filtering is applied)
     * and the dataInPage suddenly become empty.
     */
    useEffect(() => {
        if (dataInPage.length === 0 && records.length > 0) {
            setCurrentPage(1);
        }
    }, [records, dataInPage]);

    return {
        dataInPage,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
    };
};

const MAX_SHOWED_PAGE = 5;

interface UseSlicedPagesParams {
    totalPage: number;
    currentPage: number;
    maxShowedPage?: number;
}

export const useSlicedPages = (params: UseSlicedPagesParams) => {
    const { currentPage, totalPage, maxShowedPage = MAX_SHOWED_PAGE } = params;

    const showNavigation: boolean = totalPage > maxShowedPage;
    const showPrev: boolean = currentPage > 1;
    const showNext: boolean = currentPage < totalPage;

    const [startIndex, setStartIndex] = useState(1);
    useEffect(() => {
        if (currentPage < startIndex) setStartIndex(currentPage);
        else if (currentPage >= startIndex + maxShowedPage) setStartIndex(currentPage - maxShowedPage + 1);
    }, [currentPage, startIndex, maxShowedPage]);

    const slicedPages = useMemo(() => {
        return Array.from({ length: Math.min(maxShowedPage, totalPage) }, (_, index) => index + startIndex);
    }, [maxShowedPage, totalPage, startIndex]);

    return { slicedPages, showNavigation, showNext, showPrev };
};
