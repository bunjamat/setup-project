import { Elysia, t } from "elysia";
import { db } from "../config/pgp.config";
import { ResponseHelper } from "../utils/response.utils";
import { subjectSchemas } from "../utils/validation.utils";

export const subjectController = new Elysia({
  prefix: "/subjects",
  tags: ["subjects"],
})
  .get(
    "/",
    async ({ query }) => {
      try {
        const {
          page = 1,
          limit = 10,
          majorId,
          subjectType,
          accessLevel,
          isFree,
          difficulty,
          level,
          isActive,
          status,
          search
        } = query;

        // Build dynamic query
        let whereConditions = [];
        let queryParams = [];
        let paramIndex = 1;

        // Add filters
        if (majorId) {
          whereConditions.push(`s.major_id = $${paramIndex++}`);
          queryParams.push(majorId);
        }

        if (subjectType) {
          whereConditions.push(`s.subject_type = $${paramIndex++}`);
          queryParams.push(subjectType);
        }

        if (accessLevel) {
          whereConditions.push(`s.access_level = $${paramIndex++}`);
          queryParams.push(accessLevel);
        }

        if (isFree !== undefined) {
          whereConditions.push(`s.is_free = $${paramIndex++}`);
          queryParams.push(isFree);
        }

        if (difficulty) {
          whereConditions.push(`s.difficulty = $${paramIndex++}`);
          queryParams.push(difficulty);
        }

        if (level) {
          whereConditions.push(`s.level = $${paramIndex++}`);
          queryParams.push(level);
        }

        if (isActive !== undefined) {
          whereConditions.push(`s.is_active = $${paramIndex++}`);
          queryParams.push(isActive);
        }

        if (status) {
          whereConditions.push(`s.status = $${paramIndex++}`);
          queryParams.push(status);
        }

        if (search) {
          whereConditions.push(`(s.title ILIKE $${paramIndex} OR s.code ILIKE $${paramIndex} OR s.description ILIKE $${paramIndex++})`);
          queryParams.push(`%${search}%`);
        }

        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

        // Get total count
        const countQuery = `
          SELECT COUNT(*) as total 
          FROM public.subjects s 
          ${whereClause}
        `;
        const countResult = await db.one(countQuery, queryParams);
        const total = parseInt(countResult.total);

        // Get paginated data
        const offset = (page - 1) * limit;
        const dataQuery = `
          SELECT 
            s.*,
            m.name as major_name
          FROM public.subjects s
          LEFT JOIN public.majors m ON s.major_id = m.id
          ${whereClause}
          ORDER BY s.created_at DESC
          LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
        `;
        
        queryParams.push(limit, offset);
        const subjects = await db.manyOrNone(dataQuery, queryParams);

        return ResponseHelper.success({
          data: subjects || [],
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / limit)
          }
        });
      } catch (error) {
        console.error('Get subjects error:', error);
        return ResponseHelper.error(error instanceof Error ? error.message : String(error));
      }
    },
    {
      query: subjectSchemas.subjectQuery,
    }
  )
  
  .get(
    "/:id",
    async ({ params: { id } }) => {
      try {
        const subject = await db.oneOrNone(`
          SELECT 
            s.*,
            m.name as major_name
          FROM public.subjects s
          LEFT JOIN public.majors m ON s.major_id = m.id
          WHERE s.id = $1
        `, [id]);

        if (!subject) {
          return ResponseHelper.error("Subject not found", 404);
        }

        return ResponseHelper.success(subject);
      } catch (error) {
        console.error('Get subject error:', error);
        return ResponseHelper.error(error instanceof Error ? error.message : String(error));
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  
  .post(
    "/",
    async ({ body }) => {
      try {
        const newSubject = await db.one(`
          INSERT INTO public.subjects (
            major_id, code, title, title_en, description, credits,
            subject_type, access_level, is_free, price, theory_hours,
            practice_hours, self_study_hours, level, difficulty,
            cover_image, cover_image_file_id, intro_video, video_url,
            learning_objectives, skills_acquired, prerequisites,
            target_audience, allow_all_lessons, pre_test_id, post_test_id,
            is_active, status
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
            $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28
          ) RETURNING *
        `, [
          body.majorId, body.code, body.title, body.titleEn, body.description,
          body.credits, body.subjectType, body.accessLevel, body.isFree,
          body.price, body.theoryHours, body.practiceHours, body.selfStudyHours,
          body.level, body.difficulty, body.coverImage, body.coverImageFileId,
          body.introVideo, body.videoUrl, JSON.stringify(body.learningObjectives),
          JSON.stringify(body.skillsAcquired), body.prerequisites, body.targetAudience,
          body.allowAllLessons, body.preTestId, body.postTestId, body.isActive ?? true,
          body.status ?? 'ACTIVE'
        ]);

        return ResponseHelper.success(newSubject, "Subject created successfully");
      } catch (error) {
        console.error('Create subject error:', error);
        return ResponseHelper.error(error instanceof Error ? error.message : String(error));
      }
    },
    {
      body: subjectSchemas.createSubject,
    }
  )
  
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      try {
        const updatedSubject = await db.oneOrNone(`
          UPDATE public.subjects SET
            major_id = COALESCE($2, major_id),
            code = COALESCE($3, code),
            title = COALESCE($4, title),
            title_en = COALESCE($5, title_en),
            description = COALESCE($6, description),
            credits = COALESCE($7, credits),
            subject_type = COALESCE($8, subject_type),
            access_level = COALESCE($9, access_level),
            is_free = COALESCE($10, is_free),
            price = COALESCE($11, price),
            theory_hours = COALESCE($12, theory_hours),
            practice_hours = COALESCE($13, practice_hours),
            self_study_hours = COALESCE($14, self_study_hours),
            level = COALESCE($15, level),
            difficulty = COALESCE($16, difficulty),
            cover_image = COALESCE($17, cover_image),
            cover_image_file_id = COALESCE($18, cover_image_file_id),
            intro_video = COALESCE($19, intro_video),
            video_url = COALESCE($20, video_url),
            learning_objectives = COALESCE($21, learning_objectives),
            skills_acquired = COALESCE($22, skills_acquired),
            prerequisites = COALESCE($23, prerequisites),
            target_audience = COALESCE($24, target_audience),
            allow_all_lessons = COALESCE($25, allow_all_lessons),
            pre_test_id = COALESCE($26, pre_test_id),
            post_test_id = COALESCE($27, post_test_id),
            is_active = COALESCE($28, is_active),
            status = COALESCE($29, status),
            updated_at = NOW()
          WHERE id = $1
          RETURNING *
        `, [
          id, body.majorId, body.code, body.title, body.titleEn, body.description,
          body.credits, body.subjectType, body.accessLevel, body.isFree,
          body.price, body.theoryHours, body.practiceHours, body.selfStudyHours,
          body.level, body.difficulty, body.coverImage, body.coverImageFileId,
          body.introVideo, body.videoUrl,
          body.learningObjectives ? JSON.stringify(body.learningObjectives) : undefined,
          body.skillsAcquired ? JSON.stringify(body.skillsAcquired) : undefined,
          body.prerequisites, body.targetAudience, body.allowAllLessons,
          body.preTestId, body.postTestId, body.isActive, body.status
        ]);

        if (!updatedSubject) {
          return ResponseHelper.error("Subject not found", 404);
        }

        return ResponseHelper.success(updatedSubject, "Subject updated successfully");
      } catch (error) {
        console.error('Update subject error:', error);
        return ResponseHelper.error(error instanceof Error ? error.message : String(error));
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Partial(subjectSchemas.createSubject),
    }
  )
  
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      try {
        const result = await db.result('DELETE FROM public.subjects WHERE id = $1', [id]);

        if (result.rowCount === 0) {
          return ResponseHelper.error("Subject not found", 404);
        }

        return ResponseHelper.success({
          message: "Subject deleted successfully",
          deletedCount: result.rowCount
        });
      } catch (error) {
        console.error('Delete subject error:', error);
        return ResponseHelper.error(error instanceof Error ? error.message : String(error));
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  
  // Activate/Deactivate subject
  .patch(
    "/:id/activate",
    async ({ params: { id } }) => {
      try {
        const updatedSubject = await db.oneOrNone(`
          UPDATE public.subjects 
          SET is_active = true, status = 'ACTIVE', updated_at = NOW()
          WHERE id = $1
          RETURNING *
        `, [id]);

        if (!updatedSubject) {
          return ResponseHelper.error("Subject not found", 404);
        }

        return ResponseHelper.success(updatedSubject, "Subject activated successfully");
      } catch (error) {
        console.error('Activate subject error:', error);
        return ResponseHelper.error(error instanceof Error ? error.message : String(error));
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  
  .patch(
    "/:id/deactivate",
    async ({ params: { id } }) => {
      try {
        const updatedSubject = await db.oneOrNone(`
          UPDATE public.subjects 
          SET is_active = false, status = 'INACTIVE', updated_at = NOW()
          WHERE id = $1
          RETURNING *
        `, [id]);

        if (!updatedSubject) {
          return ResponseHelper.error("Subject not found", 404);
        }

        return ResponseHelper.success(updatedSubject, "Subject deactivated successfully");
      } catch (error) {
        console.error('Deactivate subject error:', error);
        return ResponseHelper.error(error instanceof Error ? error.message : String(error));
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
