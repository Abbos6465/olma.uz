export interface ProductDataType {
    category_id: number,
    brand_id: number,
    title: string,
    price: number,
    content: string,
    photo: File
}

interface BrandType {
    id: number,
    category_id: number,
    name: string
}

interface CategoryType {
    id: number,
    name: string
}

export interface ProductType {
    id: number,
    photo?: string,
    brand: BrandType,
    content: string,
    category: CategoryType,
    price: number,
    title: string,
    user_id: number,
    can_change: boolean
}

interface MetaType {
    current_page: number,
    last_page: number
}

export interface ProductsType {
    data: ProductType[],
    meta: MetaType
}

export interface ProductsParams{
    page?: number,
    category_id?: number,
    brand_id?: number
}

export interface CategoryWidthBrandType extends CategoryType{
    brands: BrandType[]
}

