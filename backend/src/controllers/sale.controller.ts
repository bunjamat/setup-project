// sale controller

import { Elysia, t } from "elysia";
import { db, pgp } from "../config/pgp.config";
import { ResponseHelper } from "../utils/response.utils";

export const saleController = new Elysia({
  prefix: "/sale",
  tags: ["sale"],
})
  .get(
    "/list",
    async ({ query }) => {
      const { branch_code } = query;

      // if (!branch_code) {
      //   return ResponseHelper.error("Branch code is required");
      // }
      // sale list
      const result = await db.manyOrNone(
        "SELECT s.* FROM public.sales AS s where s.branch_code = $1 order by s.saleid desc limit 10",
        [branch_code]
      );

      if (result.length === 0) {
        return ResponseHelper.error("No data found");
      }

      const data = result.map((item) => ({
        ...item,
        sale_amount: parseFloat(item.sale_amount) || 0,
      }));

      // customer list
      //     const customerResult = await db.manyOrNone(
      //     "SELECT c.* FROM public.customers AS c order by c.customerid desc limit 100"
      //   );

      // product list

      //   console.log(result);

      return ResponseHelper.success(data);
    },
    {
      query: t.Object({
        branch_code: t.String(),
      }),
    }
  )
  .post(
    "/update",
    async ({ body }) => {
      console.log("🚀 ~ body:", body);

      const {
        saleid,
        branch_code,
        customer_code,
        product_code,
        start_date,
        end_date,
      } = body;

      const data = {
        saleid,
        branch_code,
        customer_code,
        product_code,
        start_date,
        end_date,
      };

      try {
        await db.tx(async (t) => {
          // Define the schema and table name
          const schema = "public";
          const table = "form_in_person_work";

          const csUpdate = new pgp.helpers.ColumnSet(
            [
              "saleid",
              "branch_code",
              "customer_code",
              "product_code",
              "start_date",
              "end_date",
              { name: "change_date", cast: "date" },
            ],
            {
              table: { table, schema },
            }
          );

          const insert = `${pgp.helpers.insert(
            [data],
            csUpdate
          )} WHERE v.saleid::text = t.saleid::text RETURNING *`;

          const { saleid } = await db.one(insert);

          return saleid;
        });
      } catch (error: any) {
        return ResponseHelper.error(error.message);
      }

      return ResponseHelper.success("Sale updated successfully");
    },
    {
      body: t.Object({
        saleid: t.String(),
        branch_code: t.String(),
        customer_code: t.String(),
        product_code: t.String(),
        start_date: t.String(),
        end_date: t.String(),
      }),
    }
  )
  .post(
    "/delete",
    async ({ body }) => {
      console.log("🚀 ~ delete sales:", body);

      const { saleids, branch_code } = body;

      if (!Array.isArray(saleids) || saleids.length === 0) {
        return ResponseHelper.error("Sale IDs are required");
      }

      try {
        await db.tx(async (t) => {
          // Delete sales by IDs
          const placeholders = saleids.map((_, index) => `$${index + 1}`).join(',');
          const deleteQuery = `DELETE FROM public.sales WHERE saleid IN (${placeholders})`;
          
          const result = await t.result(deleteQuery, saleids);
          
          if (result.rowCount === 0) {
            throw new Error("No sales found to delete");
          }
          
          return result.rowCount;
        });

        return ResponseHelper.success({
          message: `Successfully deleted ${saleids.length} sale(s)`,
          deletedCount: saleids.length
        });
      } catch (error: any) {
        console.error("Delete sales error:", error);
        return ResponseHelper.error(error.message || "Failed to delete sales");
      }
    },
    {
      body: t.Object({
        saleids: t.Array(t.String()),
        branch_code: t.String(),
      }),
    }
  );
