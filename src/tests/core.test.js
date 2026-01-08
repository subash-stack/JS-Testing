import { beforeEach, describe, expect, it } from "vitest";
import {
  calculateDiscount,
  canDrive,
  createProduct,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  Stack,
  validateUserInput,
} from "../core";

describe("getCoupons", () => {
  it("return a static coupen value", () => {
    expect(getCoupons()).toEqual([
      { code: "SAVE20NOW", discount: 0.2 },
      { code: "DISCOUNT50OFF", discount: 0.5 },
    ]);
  });
});

describe("calculateDiscount", () => {
  describe("negative cases", () => {
    it("returns an error when price is not a number", () => {
      expect(calculateDiscount("5", "SAVE10")).toBe("Invalid price");
    });

    it("returns an error when price is less than or equal to zero", () => {
      expect(calculateDiscount(-5, "SAVE10")).toBe("Invalid price");
    });

    it("returns an error when discount code is not a string", () => {
      expect(calculateDiscount(5, 2)).toBe("Invalid discount code");
    });
  });
  describe("positive cases", () => {
    it("applies discount when a valid discount code is provided", () => {
      expect(calculateDiscount(10, "SAVE10")).toBe(9);
    });

    it("returns original price when no discount code matches", () => {
      expect(calculateDiscount(10, "SAVE30")).toBe(10);
    });
  });
});

describe("validateUserInput", () => {
  describe("negative cases", () => {
    it("returns error when username is not a string", () => {
      expect(validateUserInput(3, 18)).toBe("Invalid username");
    });
    it("returns error when the username length is lesser than 3", () => {
      expect(validateUserInput("ht", 18)).toBe("Invalid username");
    });
    it("returns error when the age is not a number", () => {
      expect(validateUserInput("Subash", "20")).toBe("Invalid age");
    });
    it("returns error when the age  is lesser than 18", () => {
      expect(validateUserInput("Subash", 12)).toBe("Invalid age");
    });
    it("returns error when username and age are invalid", () => {
      expect(validateUserInput("ht", "12")).toBe(
        "Invalid username, Invalid age"
      );
    });
  });
  describe("positive cases", () => {
    it("returns success response when username and age are valid", () => {
      expect(validateUserInput("ssh", 18)).toBe("Validation successful");
    });
  });
});

describe("isPriceInRange", () => {
  describe("negative case", () => {
    it("returns false when price is lower boundary ", () => {
      expect(isPriceInRange(4, 6, 8)).toBe(false);
    });
    it("returns false when price is upper boundary", () => {
      expect(isPriceInRange(9, 6, 8)).toBe(false);
    });
  });
  describe("positive case", () => {
    it("returns true when price is inside the range ", () => {
      expect(isPriceInRange(20, 10, 30)).toBe(true);
    });
    it("returns true when price is equal to min ", () => {
      expect(isPriceInRange(20, 20, 30)).toBe(true);
    });
    it("returns true when price is equal to max ", () => {
      expect(isPriceInRange(30, 20, 30)).toBe(true);
    });
  });
});

describe("isValidUsername", () => {
  describe("negative case", () => {
    it("returns false when the length of username is lesser than minLength ", () => {
      expect(isValidUsername("Suba")).toBe(false);
    });
    it("returns false when the length of username is greater than maxLenght ", () => {
      expect(isValidUsername("Subash Balasubramanian")).toBe(false);
    });
  });
  describe("positive case", () => {
    it("returns true when the length of username is inside the range ", () => {
      expect(isValidUsername("Subash")).toBe(true);
    });
    it("returns true  when the length of username is equal to the minLength", () => {
      expect(isValidUsername("Apple")).toBe(true);
    });
    it("returns true  when the length of username is equal to the maxLength", () => {
      expect(isValidUsername("Balasubramanian")).toBe(true);
    });
  });
});

describe("canDrive", () => {
  describe("negative cases", () => {
    it("returns error when country code is invalid", () => {
      expect(canDrive(20, "IN")).toBe("Invalid country code");
    });

    it("returns false when age is below legal driving age for US", () => {
      expect(canDrive(15, "US")).toBe(false);
    });

    it("returns false when age is below legal driving age for UK", () => {
      expect(canDrive(16, "UK")).toBe(false);
    });
  });

  describe("positive cases", () => {
    it("returns true when age is equal to legal driving age for US", () => {
      expect(canDrive(16, "US")).toBe(true);
    });

    it("returns true when age is greater than legal driving age for US", () => {
      expect(canDrive(18, "US")).toBe(true);
    });

    it("returns true when age is equal to legal driving age for UK", () => {
      expect(canDrive(17, "UK")).toBe(true);
    });

    it("returns true when age is greater than legal driving age for UK", () => {
      expect(canDrive(20, "UK")).toBe(true);
    });
  });
});

describe("fetchData", () => {
  it("returns an array of numbers", async () => {
    const data = await fetchData();
    expect(data).toEqual([1, 2, 3]);
  });
});

describe("Stack", () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  });
  describe("initial state", () => {
    it("should be empty when created", () => {
      expect(stack.isEmpty()).toBe(true);
    });
    it("should have size 0  when created", () => {
      expect(stack.size()).toBe(0);
    });
  });
  describe("push", () => {
    it("should have size 1 when one item is pushed", () => {
      stack.push("Apple");
      expect(stack.size()).toBe(1);
      expect(stack.isEmpty()).toBe(false);
    });

    it("should have size 2 when two items are pushed ", () => {
      stack.push("Apple");
      stack.push("Orange");
      expect(stack.size()).toBe(2);
    });
  });

  describe("pop", () => {
    describe("when stack is empty", () => {
      it("returns error when it is empty", () => {
        expect(() => stack.pop()).toThrow("Stack is empty");
      });
    });

    describe("when stack is not empty", () => {
      it("returns the last pushed value", () => {
        stack.push("Apple");
        expect(stack.pop()).toBe("Apple");
      });
    });
  });

  describe("peek", () => {
    describe("When stack is empty", () => {
      it("returns error when it is empty", () => {
        expect(() => stack.peek()).toThrow("Stack is empty");
      });
    });
    describe("When stack is not empty", () => {
      it("returns last element of an array", () => {
        stack.push("Apple");
        stack.push("Orange");
        expect(stack.peek()).toBe("Orange");
      });
    });
  });
  describe("clear", () => {
    it("removes all items from the stack", () => {
      stack.push("Apple");
      stack.push("Orange");
      stack.clear();
      expect(stack.size()).toBe(0);
      expect(stack.isEmpty()).toBe(true);
    });
  });
});

describe("createProduct", () => {
  describe("negative case", () => {
    it("returns error when the product name is not present", () => {
      expect(createProduct({ name: null, price: 2 })).toEqual({
        success: false,
        error: {
          code: "invalid_name",
          message: "Name is missing",
        },
      });
    });
    it("returns error when the product price is less than 0", () => {
      expect(createProduct({ name: "Apple", price: -2 })).toEqual({
        success: false,
        error: {
          code: "invalid_price",
          message: "Price is missing",
        },
      });
    });
  });
  describe("positive case", () => {
    it("returns success response when the product name and price is valid", () => {
      expect(createProduct({ name: "Apple", price: 200 })).toEqual({
        success: true,
        message: "Product was successfully published",
      });
    });
  });
});
