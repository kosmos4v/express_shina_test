export type TCategory = {
    id: number,
    index: boolean,
    name: string,
    slug: string,
    children: TCategory[] | null,
}

// export type TCategories = (TCategory & { children: TCategory[] | null });
