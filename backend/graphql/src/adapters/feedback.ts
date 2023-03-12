import {
  arg,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { Context } from '../context';
import { Adapter } from '../adapter';
import { rules } from '../rules';
import { fetchWithApi } from '../utils/';

export default Adapter<'contact'>({
  schema: [
    objectType({
      name: 'FeedbackResponse',
      definition(t) {
        t.nonNull.boolean('ok');
        t.nonNull.boolean('redirected');
        t.nonNull.int('status');
        t.nonNull.string('statusText');
        t.string('type');
        t.nonNull.string('url');
      },
    }),
    inputObjectType({
      name: 'FeedbackUploadInput',
      definition(t) {
        t.nonNull.string('name');
        t.nonNull.string('email');
        t.nonNull.string('message');
      },
    }),
  ],
  resolver: {
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    Query: (_t) => {},
    Mutation: (t) => {
      t.field('uploadFeedback', {
        type: 'FeedbackResponse',
        args: {
          data: nonNull(
            arg({
              type: 'FeedbackUploadInput',
            })
          ),
        },
        resolve: async (_, { data }, _context: Context) => {
          const { ok, redirected, status, statusText, type, url } =
            await fetchWithApi('email-api', {
              method: 'post',
              body: JSON.stringify(data),
              headers: { 'Content-Type': 'application/json' },
            });
          return {
            ok,
            redirected,
            status,
            statusText,
            type,
            url,
          };
        },
      });
    },
  },
  permissions: {
    Query: {},
    Mutation: {
      uploadFeedback: rules.allow,
    },
  },
});
