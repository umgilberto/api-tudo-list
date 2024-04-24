import { ClassConstructor, plainToInstance } from 'class-transformer';

export interface AutoMapperOptions {
  groups?: string[];
  exclude?: boolean;
}

export const autoMapper = <T, V>(
  cls: ClassConstructor<T>,
  plain: V,
  options?: AutoMapperOptions,
): T =>
  plainToInstance(cls, plain, {
    excludeExtraneousValues: options?.exclude ?? true,
    groups: options?.groups,
  });
