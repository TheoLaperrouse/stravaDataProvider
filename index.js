import Bree from 'bree';
import Graceful from '@ladjs/graceful';

console.log('Launch strava-data-provider...');

export const bree = new Bree({
    jobs: [
        {
            name: 'strava-activities',
            interval: 'every 1 min',
        },
    ],
    shared: {
        stravaRefreshToken: process.env.STRAVA_REFRESH_TOKEN,
    },
});

const graceful = new Graceful({ brees: [bree] });
graceful.listen();

(async () => {
    await bree.start();
})();
