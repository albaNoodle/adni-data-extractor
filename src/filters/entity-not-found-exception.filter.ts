import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';
import { Logger } from '@nestjs/common';

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  private logger = new Logger('EntityNotFoundExceptionFilter');

  public catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    this.logger.error(`Exception: ${JSON.stringify(exception)}`, exception.stack);
    const responseObject = this.buildResponseObject(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(responseObject.statusCode).json(responseObject);
  }

  private buildResponseObject = (exception: Error): { statusCode: number; error?: string; message: string[] } => {
    return { statusCode: 404, error: 'Not Found', message: this.formatMessage(exception.message) };
  };

  private formatMessage = (originalMessage: string): string[] => {
    const match = /"([^"]+)" matching:/.exec(originalMessage);
    if (match) {
      // * avoid leaking any internal conditions, ids inthe conditions
      // translate 'Could not find any entity of type "Task" matching: 100' -> 'Could not find a matching Task'
      // translate "Could not find any entity of type \"BaseLog\" matching: {\n\"where\": {\"id\": 1436,\"userId\": 1456}}" -> 'Could not find a matching BaseLog'
      return [`Could not find a matching ${match[1]}`];
    }

    return [originalMessage];
  };
}
