import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { updateProductsWorkflow } from '@medusajs/medusa/core-flows';
import products from './products-to-add.json';

export default async function updateProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info('Updating products data...');

  for (const product of products) {
    const { result } = await updateProductsWorkflow(
      container
    ).run({
      input: {
        selector: {
          title: product.title,
        },
        update: {
          metadata: product.metadata,
        }
      }
    });

    logger.info(result.map((s) => `Updated product: ${s.title}`).join("\n"));
  }

  logger.info('Finished updating products data.');
}
