import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(
  error: FastifyError,
  req: FastifyRequest,
  res: FastifyReply,
) {
  const { message, statusCode, name } = error;
  res.log.error(error);
  res.status(statusCode || 500).send({
    statusCode: statusCode || 500,
    error: name,
    message: message,
  });
}
