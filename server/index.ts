import './setup';

import * as Koa from 'koa';
import * as session from 'koa-session';

import graphQLProxy from '@shopify/koa-shopify-graphql-proxy';
import {middleware as sewingKitMiddleware} from '@shopify/sewing-kit-server';

import {ip, port, cdnUrl} from '../config/server';
import renderApp from './render-app';

const app = new Koa();

app.use(session(app));

app.use(
  graphQLProxy({
    shop: process.env.SHOP_HOST!,
    password: process.env.SHOPIFY_PASSWORD!,
  }),
);

app.use(sewingKitMiddleware({cdn: cdnUrl}));

app.use(renderApp);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[init] listening on ${ip}:${port}`);
});

export default app;
