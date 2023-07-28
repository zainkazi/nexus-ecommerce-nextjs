type ProductTypes = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  quantity?: number | 1;
  description: string | null;
  metadata: MetadataType;
};

type MetadataType = {
  features: string;
};

export default ProductTypes;
