import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>){}

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    const product = this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data) // Crea la instancia pero no lo guarda
    return this.productRepository.save(newProduct); // Por eso usamos el save
  }

  async update(id: number, changes: UpdateProductDto) {
     const product = await this.productRepository.findOne(id)
     this.productRepository.merge(product, changes)
     return this.productRepository.save(product)
  }

  remove(id: number) {
   return this.productRepository.delete(id)
  }
}
