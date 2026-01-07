import { describe, it, expect } from "vitest";
import { fizzBuzz, max } from "../intro";



describe('max', () => {
    it('should return the first argument if it is greater', () => {
        expect(max(3, 2)).toBe(3);
    })
    it('should return the second argument if it is greater', () => {
        expect(max(1, 2)).toBe(2);
    })
     it("should return the first argument if it is equal", () => {
       expect(max(5, 5)).toBe(5);
     });
})



describe("fizzBuzz", () => {
    it('should return FizzBuzz if the arguments divisible by 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz')
    })
    it("should return Fizz if the arguments divisible by 3", () => {
      expect(fizzBuzz(21)).toBe("Fizz");
    });
    it("should return Buzz if the arguments divisible by 5", () => {
      expect(fizzBuzz(35)).toBe("Buzz");
    });
    it("should return argument as a string  if it is not divisible by 3 or 5", () => {
      expect(fizzBuzz(1)).toBe("1");
    });
});