export interface CollectionRequest {
  name: string;
  data: {
    year: number;
    price: number;
    cpuModel: string;
    hardDiskSize: string;
    color?: string;
  };
}

export interface CollectionResponse {
  id: string;
  name: string;
  data: {
    year: number;
    price: number;
    cpuModel: string;
    hardDiskSize: string;
    color?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
