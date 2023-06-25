import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { waitStaffAssignmentValidationSchema } from 'validationSchema/wait-staff-assignments';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getWaitStaffAssignments();
    case 'POST':
      return createWaitStaffAssignment();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWaitStaffAssignments() {
    const data = await prisma.wait_staff_assignment
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'wait_staff_assignment'));
    return res.status(200).json(data);
  }

  async function createWaitStaffAssignment() {
    await waitStaffAssignmentValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.wait_staff_assignment.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
