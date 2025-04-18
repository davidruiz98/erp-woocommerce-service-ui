export interface Dimensions {
    length: string;
    width: string;
    height: string;
  }
  
  export interface Image {
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    name: string;
    alt: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface MetaData {
    id: number;
    key: string;
    value: string;
  }
  
  export interface Links {
    self: Array<{
      href: string;
      targetHints?: {
        allow: string[];
      };
    }>;
    collection: Array<{
      href: string;
    }>;
  }
  
  export interface Product {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    dimensions: Dimensions;
    shipping_required: boolean;
    shipping_taxable: boolean;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    categories: Category[];
    images: Image[];
    meta_data: MetaData[];
    stock_status: string;
    _links: Links;
  }