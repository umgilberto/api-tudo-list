import { BasePaginatedOutput } from '../dtos/base-output.dto';

/**
 * Function for pagination.
 * under development
 * @param query Query from the endpoint
 * @param entities An array of objects
 * @param total Itens amount
 * @returns A base pagination.
 */
export function paginate(total: number): BasePaginatedOutput {
  return {
    total,
  };
}
