export type Series = {
  id: number;
  name: string;
  platformId: number;
  genreId: number;
  review?: string;
  status: string;
  rate?: number;
};

export type NewSeries = {
  name: string;
  platformId: number;
  genreId: number;
};

export type UpdateSeries = Omit<Series, "id" | "platformId" | "genreId">;

export type UpdateData = {
  review?: string;
  status: string;
  rate?: number;
};
