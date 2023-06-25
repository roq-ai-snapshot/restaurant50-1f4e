import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { waitStaffAssignmentValidationSchema } from 'validationSchema/wait-staff-assignments';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.wait_staff_assignment
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getWaitStaffAssignmentById();
    case 'PUT':
      return updateWaitStaffAssignmentById();
    case 'DELETE':
      return deleteWaitStaffAssignmentById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWaitStaffAssignmentById() {
    const data = await prisma.wait_staff_assignment.findFirst(
      convertQueryToPrismaUtil(req.query, 'wait_staff_assignment'),
    );
    return res.status(200).json(data);
  }

  async function updateWaitStaffAssignmentById() {
    await waitStaffAssignmentValidationSchema.validate(req.body);
    const data = await prisma.wait_staff_assignment.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteWaitStaffAssignmentById() {
    const data = await prisma.wait_staff_assignment.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
