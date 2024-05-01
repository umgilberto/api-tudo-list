import { Repository } from 'typeorm';

export abstract class Seeder {
  abstract run(): Promise<number>;

  static async seed(
    seeds: Array<any>,
    repository: Repository<any>,
  ): Promise<number> {
    return (
      await Promise.all(
        seeds.map(async (seed) => {
          const exists = await repository.findOne({
            where: { id: seed.id },
          });

          if (!exists) return repository.save(seed);
        }),
      )
    ).filter((seed) => seed).length;
  }
}
