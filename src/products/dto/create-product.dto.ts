export class CreateProductDto {
  name: string;
  description: string;
  price: string;
  quantity: number;
  image: string;
  category: string;
  brand: string;
  available: boolean;
  userId: number;
  user: {
    id: number;
    username: string;
    email: string;
    usertype: string;
  };
}
