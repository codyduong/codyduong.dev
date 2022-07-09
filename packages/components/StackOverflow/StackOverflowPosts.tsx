import { useEffect, useState } from 'react';

const USER_ID = '17954209' as const;

const BASE_QUERY =
  //https://api.stackexchange.com/2.3/users/17954209/timeline?page=2&pagesize=100&site=stackoverflow
  `https://api.stackexchange.com/2.3/users/${USER_ID}/timeline` as const;

const ConstructQuery = (page: number, pageSize = 10): string => {
  return `${BASE_QUERY}?page=${page}&pageSize=${pageSize}&site=stackoverflow`;
};

type TimelineItem = {
  post_id: number;
  user_id: number;
  timeline_type: 'answered' | 'revision' | 'badge' | string;
  post_type: 'answer' | 'question' | 'comment' | string;
  creation_date: number;
  detail: string | undefined;
  title: string;
};

export default function StackOverflow(): JSX.Element {
  const [pollingId, setPollingId] = useState(0);
  const [data, setData] = useState<TimelineItem[]>([]);

  useEffect(() => {
    (async () => {
      setPollingId(window.setInterval(() => {}, 30000) as number);
    })();
    return () => {
      clearInterval(pollingId);
    };
  });

  return (
    <>
      {data.map(() => {
        data.title;
      })}
    </>
  );
}
