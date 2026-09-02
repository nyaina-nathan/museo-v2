export interface Jersey {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  price: number | null;
  created_at: string;
  updated_at: string | null;
  primary_image_url: string | null;
}

export interface JerseyWithImages extends Jersey {
  images: JerseyImage[];
}

export interface JerseyInput {
  name: string;
  description?: string | null;
  is_public?: boolean;
  price?: number | null;
}

export interface JerseyPatchInput {
  name?: string;
  description?: string | null;
  is_public?: boolean;
  price?: number | null;
}

export interface ListJerseysQuery {
  name?: string;
  priceMin?: number;
  priceMax?: number;
  isPublic?: boolean;
  orderBy?: "createdAt" | "name" | "price";
  order?: "asc" | "desc";
  page: number;
  limit: number;
}

export interface PaginatedJerseys {
  data: Jersey[];
  page: number;
  limit: number;
  total: number;
}

export interface JerseyImage {
  id: string;
  id_jersey: string;
  title: string;
  url: string;
  file_id: string | null;
  is_primary: boolean;
}

export interface JerseyImageInput {
  title?: string;
  url: string;
  file_id?: string | null;
  is_primary?: boolean;
}