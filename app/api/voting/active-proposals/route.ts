// src/app/api/active-proposals/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { votingRepository } from '@/lib/repositories/voting-repository';
import { getSession } from '@/lib/auth'; // adjust to your auth util

// 1️⃣ Define and validate query parameters for pagination
const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

type PaginationParams = z.infer<typeof PaginationSchema>;

// 2️⃣ Define a schema for an individual proposal
const ProposalSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  startDate: z.string().refine(s => !isNaN(Date.parse(s)), { message: 'Invalid date' }),
  endDate: z.string().refine(s => !isNaN(Date.parse(s)), { message: 'Invalid date' }),
});
const ProposalsArraySchema = z.array(ProposalSchema);

/**
 * Handles GET requests to fetch paginated active proposals for authenticated users.
 *
 * Parses and validates pagination parameters from the query string, checks user authentication, retrieves active proposals, and validates the response data. Returns appropriate HTTP error responses for invalid input, authentication failure, data validation errors, or unexpected server errors.
 *
 * @returns A JSON response containing the current page, limit, and an array of active proposals, or an error message with the corresponding HTTP status code.
 */
export async function GET(request: NextRequest) {
  // Parse and validate pagination query
  const url = new URL(request.url);
  let page: number, limit: number;
  try {
    ({ page, limit } = PaginationSchema.parse(Object.fromEntries(url.searchParams)));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid pagination parameters';
    return NextResponse.json({ error: 'Bad Request', details: message }, { status: 400 });
  }

  // Authentication check
  const session = await getSession(request);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch paginated active proposals
    const rawProposals = await votingRepository.getActiveProposals({ page, limit });

    // Validate shape
    const result = ProposalsArraySchema.safeParse(rawProposals);
    if (!result.success) {
      console.error('Validation error for active proposals:', result.error);
      return NextResponse.json(
        { error: 'Data validation failed' },
        { status: 502 }
      );
    }

    // Successful response
    return NextResponse.json({
      page,
      limit,
      proposals: result.data,
    });
  } catch (err) {
    console.error('API Error [GET /api/active-proposals]:', err);
    const isDev = process.env.NODE_ENV !== 'production';
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to fetch active proposals',
        ...(isDev ? { details: message } : {}),
      },
      { status: 500 }
    );
  }
}
