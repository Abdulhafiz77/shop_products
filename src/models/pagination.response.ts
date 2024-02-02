export interface PaginationResponse<T> {

    last: boolean;

    total_count: number;

    pages_count: number;

    items: T;
}