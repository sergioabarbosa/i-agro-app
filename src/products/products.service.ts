import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(createProductDto: CreateProductDto) {
    const {
      name,
      description,
      price,
      quantity,
      image,
      category,
      brand,
      available,
      userId,
    } = createProductDto;

    try {
      // Certifique-se de que o valor de 'price' seja um número
      const numericPrice = parseFloat(price);

      // Verifique se o valor é um número válido
      if (isNaN(numericPrice)) {
        throw new Error('O valor de "price" deve ser um número válido.');
      }

      // Crie o produto no banco de dados usando o novo objeto de dados
      const product = await this.prisma.product.create({
        data: {
          name,
          description,
          price: numericPrice,
          quantity: quantity as any,
          image,
          category,
          brand,
          available,
          userId,
        },
      });

      return { success: true, data: product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {
      name,
      description,
      price,
      quantity,
      image,
      category,
      brand,
      available,
      userId,
    } = updateProductDto;

    try {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice)) {
        throw new Error('O valor de "price" deve ser um número válido.');
      }

      const productData = {
        name,
        description,
        price: numericPrice,
        quantity,
        image,
        category,
        brand,
        available,
        userId: userId as any, // Certifique-se de que o tipo de userId seja compatível
      };

      const product = await this.prisma.product.update({
        where: { id },
        data: productData,
      });

      return { success: true, data: product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      orderBy: {
        id: 'asc', // Ordena os produtos pelo ID de forma crescente (ascendente)
      },
    });
    return products;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id, // Correto: Passar a variável `id` como argumento
      },
    });

    if (!product) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return product;
  }

  async remove(id: number) {
    try {
      await this.prisma.product.delete({
        where: { id },
      });

      return { success: true, message: 'Produto removido com sucesso!' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
