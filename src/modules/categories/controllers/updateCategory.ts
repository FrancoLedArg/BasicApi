import { Request, Response } from "express";

// Services
import { findById, update } from "@/modules/categories/services";
import { findManyById } from "@/modules/products/services";
import { findManyById as findProductCategory } from "@/modules/productCategories/services";

// DTOs
import { UpdateCategoryDTO } from "@/lib/validation/categories";

export const updateCategory = async (
  req: Request<UpdateCategoryDTO["params"], unknown, UpdateCategoryDTO["body"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { productsToAdd, productsToRemove, ...changes } = req.body;

    const category = await findById(id);
    if (!category) {
      throw new Error("Category not found.");
    }

    if (productsToAdd && productsToAdd.length > 0) {
      const validProducts = await findManyById(productsToAdd);
      if (validProducts.length !== productsToAdd.length) {
        throw new Error("One or more products do not exist");
      }

      const productsArray = validProducts.map((product) => {
        return {
          product_id: product.id,
          category_id: category.id,
        };
      });

      const productCategories = await findProductCategory(productsArray);
      if (productCategories && productCategories.length > 0) {
        throw new Error(
          "One or more products are already added to the category",
        );
      }
    }

    if (productsToRemove && productsToRemove.length > 0) {
      const validProducts = await findManyById(productsToRemove);
      if (validProducts.length !== productsToRemove.length) {
        throw new Error("One or more products do not exist");
      }

      const productsArray = validProducts.map((product) => {
        return {
          product_id: product.id,
          category_id: category.id,
        };
      });

      const productCategories = await findProductCategory(productsArray);
      if (productCategories.length !== productsToRemove.length) {
        throw new Error("One or more products were not added to this category");
      }
    }

    const updatedCategory = await update(id, changes);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
