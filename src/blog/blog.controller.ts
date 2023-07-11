import { Body, Controller,Get,Param,Post, UseGuards,Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from 'src/common/dto/blog.dto';
import { JwtAuthGuard } from 'src/common/jwt-roles/jwt-auth.guard';

@Controller('blog')
export class BlogController {
    constructor(private blogService:BlogService){}

    @UseGuards(JwtAuthGuard)
    @Post('create/:userId')
    async createBlog(@Param('userId') userId:string,@Body() BlogDetails:BlogDto):Promise<BlogDto>{
        return this.blogService.createBlog(userId,BlogDetails)
    }
    @UseGuards(JwtAuthGuard)
    @Get('/:userId')
    async allBlogs(@Param('userId') userId:string):Promise<BlogDto[]>{
        return this.blogService.allBlogs(userId)
    }

    @Get()
    async blogsList():Promise<BlogDto[]>{
        return this.blogService.blogsList()
    }

    @Get('singleblog/:id')
    async singleBlog(@Param('id') id:string):Promise<BlogDto>{
        return this.blogService.singleBlog(id)
    }

    @Delete('/:id')
    async deleteBlog(@Param('id') id:string):Promise<any>{
        return this.blogService.deleteBlog(id)
    }
}
