export interface Jersey {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  price: number | null;
  created_at: string;
  updated_at: string | null;
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
  page: number;
  limit: number;
}

export interface PaginatedJerseys {
  data: Jersey[];
  page: number;
  limit: number;
  total: number;
}