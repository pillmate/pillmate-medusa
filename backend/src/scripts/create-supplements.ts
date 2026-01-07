import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { createProductCategoriesWorkflow } from '@medusajs/medusa/core-flows';
import supplements from './supplements.json';

const SUPPLEMENTS_CATEGORY_ID = 'pcat_01KEBFZ9KA6FSCEN9SZNVH0CCC';

export default async function createSupplements({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info('Creating supplements data...');

  const { result } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: supplements.map((supplement) => ({
        ...supplement,
        is_active: true,
        parent_category_id: SUPPLEMENTS_CATEGORY_ID,
      })),
    }
  });

  logger.info(result.map((s) => `Created supplement: ${s.id}`).join("\n"));

  logger.info('Finished creating supplements data.');
}
