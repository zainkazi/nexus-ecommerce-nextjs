type Params = {
  id: string;
};

export type SearchParams = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  quantity: number | 1;
  description: string | null;
  features: string;
};

type SearchParamTypes = {
  params: Params;
  searchParams: SearchParams;
};

export default SearchParamTypes;
