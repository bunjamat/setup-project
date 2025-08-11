// sale controller

import { Elysia, t } from "elysia";
import { db } from "../config/pgp.config";
import { ResponseHelper } from "../utils/response.utils";

export const saleController = new Elysia({
  prefix: "/sale",
  tags: ["sale"],
})
  .get(
    "/list",
    async ({ query }) => {
      const { branch_code } = query;

      if (!branch_code) {
        return ResponseHelper.error("Branch code is required");
      }

      // sale list
      const result = await db.manyOrNone(
        "SELECT s.* FROM public.sales AS s where s.branch_code = $1 order by s.saleid desc limit 100",
        [branch_code]
      );

      if (result.length === 0) {
        return ResponseHelper.error("No data found");
      }

      // customer list
      //     const customerResult = await db.manyOrNone(
      //     "SELECT c.* FROM public.customers AS c order by c.customerid desc limit 100"
      //   );

      // product list

      //   console.log(result);

      return ResponseHelper.success(result);
    },
    {
      query: t.Object({
        branch_code: t.String(),
      }),
    }
  )
  .post(
    "/list",
    async ({ body }) => {
        
      const { branch_code, customer_code, product_code, start_date, end_date } =
        body;

      const query = `
    SELECT s.* FROM public.sales AS s 
    WHERE s.branch_code = $1 
    AND s.customer_code = $2 
    AND s.product_code = $3 
    AND s.sale_date BETWEEN $4 AND $5
    order by s.saleid desc limit 100
    `;

      const result = await db.manyOrNone(query, [
        branch_code,
        customer_code,
        product_code,
        start_date,
        end_date,
      ]);

      if (result.length === 0) {
        return ResponseHelper.error("No data found");
      }

      return ResponseHelper.success(result);
    },
    {
      body: t.Object({
        branch_code: t.String(),
        customer_code: t.String(),
        product_code: t.String(),
        start_date: t.String(),
        end_date: t.String(),
      }),
    }
  );
