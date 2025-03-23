import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { payments } from "@/lib/db/schema";

export const findAll = async (limit: number, offset: number) => {
  const payments = await db.query.payments.findMany({
    limit,
    offset,
  });

  if (!payments) {
    throw new Error("Database Error");
  }

  return payments;
};

export const findById = async (id: string) => {
  const payment = await db.query.payments.findFirst({
    where: eq(payments.id, id),
  });

  if (!payment) {
    throw new Error("Database Error");
  }

  return payment;
};

export const insert = async (data: any) => {
  const { user_id, order_id, payment_method, payment_status } = data;

  const [newPayment] = await db
    .insert(payments)
    .values({
      user_id,
      order_id,
      payment_method,
      payment_status,
    })
    .returning();

  if (!newPayment) {
    throw new Error("Database Error");
  }
};

export const update = async (id: string, data: any) => {
  const [updatedPayment] = await db
    .update(payments)
    .set(data)
    .where(eq(payments.id, id))
    .returning();

  if (!updatedPayment) {
    throw new Error("Database Error");
  }

  return updatedPayment;
};

export const remove = async (id: string) => {
  const deletedPayment = await db
    .delete(payments)
    .where(eq(payments.id, id))
    .returning();

  if (!deletedPayment) {
    throw new Error("Database Error");
  }

  return deletedPayment;
};
