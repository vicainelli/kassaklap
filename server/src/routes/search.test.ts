import { describe, it, expect } from "vitest";
import { getPricePerUnitAndUnitType } from "./search";

describe("getPricePerUnitAndUnitType", () => {
  it("calculates price per unit correctly for liters", () => {
    const result1 = getPricePerUnitAndUnitType(6.99, "6 x 0,33 l");
    expect(result1).toEqual({ price_per_unit: 3.53, unit_type: "liter" });

    const result2 = getPricePerUnitAndUnitType(19.32, "24 x 0,3 l");
    expect(result2).toEqual({ price_per_unit: 2.68, unit_type: "liter" });
  });

  it("calculates price per unit correctly for grams", () => {
    const result = getPricePerUnitAndUnitType(10, "500 g");
    expect(result).toEqual({ price_per_unit: 20, unit_type: "kg" });
  });

  it("calculates price per unit correctly for grams (multi-pack)", () => {
    const result = getPricePerUnitAndUnitType(3.39, "2 x 90 gram");
    expect(result).toEqual({ price_per_unit: 18.83, unit_type: "kg" });
  });

  it("handles invalid input gracefully", () => {
    const result = getPricePerUnitAndUnitType(0, "invalid input");
    expect(result).toEqual({ price_per_unit: null, unit_type: null });
  });
});
