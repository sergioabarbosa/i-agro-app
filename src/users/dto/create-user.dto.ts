export class CreateUserDto {
  id: number;
  name: string;
  username: string;
  usertype: string;
  email: string;
  password: string;
  products: number[]; // Array de IDs de produtos associados ao usuário
}
