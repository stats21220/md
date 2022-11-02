import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class FindLvlProductDto {

	@IsNumber({}, {each: true})
	categories: number[]

	@IsNumber()
	limit: number
}