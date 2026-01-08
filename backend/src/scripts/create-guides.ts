import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { createProductCategoriesWorkflow } from '@medusajs/medusa/core-flows';
import guides from './guides.json';

const GUIDES_CATEGORY_ID = 'pcat_01KEE3NG8GM3GBNFW3E5WGHMGS';

export default async function createGuides({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info('Creating guides data...');

  const { result } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: guides.map((guide) => ({
        ...guide,
        is_active: true,
        parent_category_id: GUIDES_CATEGORY_ID,
      })),
    }
  });

  logger.info(result.map((g) => `Created guide: ${g.id}`).join("\n"));

  logger.info('Finished creating guides data.');
}
