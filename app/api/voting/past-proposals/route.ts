// src/app/api/past-proposals/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { votingRepository } from '@/lib/repositories/voting-repository';
import { getSession } from '@/lib/auth'; // your auth/session util

/**
 * Define & parse query params:
 *    - page (>=1), limit (1–100, default 50)
 */
const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

/**
 * Define your expected data‐shape for a proposal
 *    and an array thereof.
 */
const ProposalSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.string().refine((s) => !isNaN(Date.parse(s))),
  // …add any other fields you expect
});
const ProposalsArraySchema = z.array(ProposalSchema);

/**
 * Handles GET requests to retrieve a paginated list of past proposals for authenticated users.
 *
 * Validates query parameters for pagination, checks user authentication, fetches proposals from the repository, and ensures the response data matches the expected schema. Returns appropriate error responses for invalid input, authentication failure, data validation errors, or unexpected server errors.
 *
 * @param request - The incoming HTTP request containing query parameters for pagination.
 * @returns A JSON response with the current page, limit, and an array of past proposals, or an error message with the corresponding HTTP status code.
 */
export async function GET(request: NextRequest) {
  // Parse and validate query params
  const url = new URL(request.url);
  let page: number, limit: number;
  try {
    ({ page, limit } = querySchema.parse(Object.fromEntries(url.searchParams)));
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid query parameters', details: err instanceof Error ? err.message : undefined },
      { status: 400 }
    );
  }

  // Authentication check
  const session = await getSession(request);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch only the needed slice; adjust your repository method accordingly
    const pastProposals = await votingRepository.getPastProposals({ page, limit });

    // Validate the shape of the data coming back
    const parsed = ProposalsArraySchema.safeParse(pastProposals);
    if (!parsed.success) {
      console.error('🚨 Data validation failed for past proposals:', parsed.error);
      return NextResponse.json(
        { error: 'Data validation error' },
        { status: 502 }
      );
    }

    // Return the validated data
    return NextResponse.json({
      page,
      limit,
      proposals: parsed.data,
    });
  } catch (error: unknown) {
    // Detailed server‐side logging
    console.error('API Error [GET /api/past-proposals]:', error);

    // In prod, hide error details; in dev, include message
    const isDev = process.env.NODE_ENV !== 'production';
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch past proposals',
        ...(isDev ? { details: message } : {}),
      },
      { status: 500 }
    );
  }
}
