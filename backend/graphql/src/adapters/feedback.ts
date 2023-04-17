import { arg, inputObjectType, nonNull, objectType } from 'nexus';
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
        t.nonNull.int('status');
        t.nonNull.string('statusText');
        t.nullable.string('serverResponse');
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
          const response = await fetchWithApi('email-api', {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          });
          const { ok, redirected, status, statusText } = response;
          const json = await response.json();
          return {
            ok,
            redirected,
            status,
            statusText,
            serverResponse: json.response ?? null,
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
