import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { BlogDto } from 'src/common/dto/blog.dto';

@Injectable()
export class BlogService {
    private readonly prisma = new PrismaClient();

    async createBlog(userId: string, BlogDetails: BlogDto): Promise<BlogDto> {
        const newBlog = plainToClass(BlogDto, BlogDetails)
        try {
            return await this.prisma.blog.create({
                data: {
                    user_id: userId,
                    ...newBlog
                }
            })
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Server Problem,Try Again',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async allBlogs(userId: string): Promise<BlogDto[]> {
        try {
            return await this.prisma.blog.findMany({
                where: {
                    user_id: userId
                }
            })
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Server Problem,Try Again',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async blogsList(): Promise<BlogDto[]> {
        try {
            return await this.prisma.blog.findMany()
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Server Problem,Try Again',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async singleBlog(id: string): Promise<BlogDto> {
        try {
            return await this.prisma.blog.findFirst({
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Server Problem,Try Again',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async deleteBlog(id: string): Promise<any> {
        try {
            return await this.prisma.blog.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Server Problem,Try Again',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async updateBlog(id: string, BlogDetails: BlogDto): Promise<BlogDto> {
        const updateBlog = plainToClass(BlogDto, BlogDetails)
        try {
            return await this.prisma.blog.update({
                where: {
                    id: id
                },
                data: {
                    ...updateBlog
                }
            })
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Server Problem,Try Again',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
