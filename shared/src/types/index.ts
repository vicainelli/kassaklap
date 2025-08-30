import { z } from "zod";

export const ApiResponseSchema = z.object({
	message: z.string(),
	success: z.literal(true),
});
export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export const RawProductSchema = z.object({
	n: z.string(), // Name
	p: z.number(), // Price
	s: z.string(), // Size/Serving
	l: z.string(), // Location/Link
});
export type RawProduct = z.infer<typeof RawProductSchema>;

export const RawProductsDataSchema = z.object({
	n: z.string(), // establishment name
	d: z.array(RawProductSchema),
});
export type RawProductsData = z.infer<typeof RawProductsDataSchema>;

export const ResultItemSchema = z.object({
	e: z.string(), // establishment name
	n: z.string(), // product name
	p: z.number(), // price
	s: z.string(), // size/serving
	l: z.string(), // location/link
	price_per_unit: z.number().nullable().optional(), // price per normalized unit
	unit_type: z.string().nullable().optional(), // normalized unit type (kg, liter, unit)
});
export type ResultItem = z.infer<typeof ResultItemSchema>;
