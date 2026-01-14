import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { deleteProductsWorkflow } from '@medusajs/medusa/core-flows';
import products from './products-to-delete.json';

export default async function deleteProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info('Deleting products...');

  const { result } = await deleteProductsWorkflow(container).run({
    input: {
      ids: products
    }
  });

  logger.info(result);

  logger.info('Finished deleting products.');
}
